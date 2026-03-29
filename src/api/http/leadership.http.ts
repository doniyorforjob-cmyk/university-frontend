import apiClient from '../client';
import { Leadership } from '../../types/leadership.types';
import { getImageUrl, toString, normalizeCertificates } from '../../utils/apiUtils';
import { slugify } from '../../utils/transliterate';


const formatPhone = (phone: any): string => {
    if (!phone) return '';
    return String(phone).split('.')[0];
};

const resolveImage = (img: any): string => {
    if (!img) return '';
    if (Array.isArray(img)) {
        const first = img[0];
        if (!first) return '';
        if (typeof first === 'string') return first;
        return first.thumbnail_url || first.url || '';
    }
    if (typeof img === 'string') return img;
    return img.thumbnail_url || img.url || '';
};

// SLUG MAPPING FOR LEADERSHIP - MULTI-LANGUAGE SUPPORT
const LEADERSHIP_SLUG_MAP: Record<string, string> = {
    // Uzbek
    'yoshlar masalalari': 'yoshlar-masalalari-prorektori',
    'ma’naviy-ma’rifiy': 'yoshlar-masalalari-prorektori',
    'birinchi prorektor': 'birinchi-prorektor',
    'o‘quv ishlari': 'oquv-ishlar-prorektori',
    'ilm-fan': 'ilmiy-ishlar-prorektori',
    'ilmiy ishlar': 'ilmiy-ishlar-prorektori',
    'moliya': 'moliya-iqtisod-prorektori',
    'iqtisod': 'moliya-iqtisod-prorektori',
    'xalqaro': 'xalqaro-hamkorlik-prorektori',
    'hamkorlik': 'xalqaro-hamkorlik-prorektori',

    // Russian
    'молодежи': 'yoshlar-masalalari-prorektori',
    'первый проректор': 'birinchi-prorektor',
    'учебной работе': 'oquv-ishlar-prorektori',
    'научной работе': 'ilmiy-ishlar-prorektori',
    'финансово': 'moliya-iqtisod-prorektori',
    'международному': 'xalqaro-hamkorlik-prorektori',

    // English
    'youth': 'yoshlar-masalalari-prorektori',
    'first vice': 'birinchi-prorektor',
    'academic affairs': 'oquv-ishlar-prorektori',
    'scientific': 'ilmiy-ishlar-prorektori',
    'finance': 'moliya-iqtisod-prorektori',
    'international': 'xalqaro-hamkorlik-prorektori',
};

const getStableSlug = (name: string, positionName: string, id: string): string => {
    const normalized = positionName.toLowerCase().trim();

    // 1. Check specific vice-rector positions for stable roles
    for (const [key, value] of Object.entries(LEADERSHIP_SLUG_MAP)) {
        if (normalized.includes(key)) return value;
    }

    // 2. Handle Rector
    if (normalized.includes('rektor') || normalized.includes('rector')) {
        if (!normalized.includes('prorektor') && !normalized.includes('vice')) {
            return 'rektor';
        }
    }

    // 3. Fallback to name-based slug (Cleanest for user)
    const nameSlug = slugify(name);
    if (nameSlug && nameSlug.length > 2) return nameSlug;

    // 4. Ultimate fallback to ID
    return id;
};

const transformMember = (entry: any, isMain: boolean, locale: string = 'uz'): Leadership => {
    const fields = entry.fields || {};

    // Localization logic for positions
    const rawPosition = fields.positions || fields.position || fields.postion ||
        (isMain ? { uz: "Universitet rektori", ru: "Ректор университета", en: "Rector of University" } : { uz: "Prorektor", ru: "Проректор", en: "Vice-Rector" });

    const position = toString(rawPosition, locale);

    // Extract languages and levels
    let languages: any[] = [];
    if (fields.languages && Array.isArray(fields.languages)) {
        languages = fields.languages.map((l: any) => ({
            name: toString(l.fields?.name || l.name || l.title || '', locale),
            level: parseInt(l.fields?.percentage || l.fields?.level || l.percentage || l.level || '0', 10)
        }));
    } else if (fields.ozbek_tili || fields.uzbek_language) {
        // Fallback for manual fields if exists
        languages.push({ name: 'Uzbek', level: parseInt(fields.ozbek_tili || '100', 10) });
        if (fields.rus_tili) languages.push({ name: 'Russian', level: parseInt(fields.rus_tili || '90', 10) });
        if (fields.ingliz_tili) languages.push({ name: 'English', level: parseInt(fields.ingliz_tili || '80', 10) });
    }

    const id = entry.uuid || entry.id;
    const name = toString(fields.name || entry.name, locale).trim();
    const stableSlug = isMain ? 'rektor' : getStableSlug(name, position, id);

    return {
        id: id,
        slug: stableSlug,
        name: toString(fields.name || entry.name, locale).trim(),
        position: position,
        degree: toString(fields['academic-degree'] || fields.academic_degree || fields.degree || fields.academicDegree || fields.ilmiy_daraja || fields['academic-degree']?.fields?.name, locale),
        birth_date: toString(fields['birth-date'] || fields.birth_date || fields.tugilgan_sana || fields['birth-date']?.fields?.name || entry['birth-date'], locale),
        phone: formatPhone(fields.phone || entry.phone),
        email: toString(fields.email || entry.email, locale),
        image: getImageUrl(resolveImage(fields.image || entry.image)),
        biography: toString(fields.biography || fields.biografiya, locale),
        career: toString(fields['work-experience'] || fields.work_experience || fields.career || fields.mehnat_faoliyati || fields.ish_tajribasi || fields.milestones || fields.experience, locale),
        description: toString(fields.responsibilities || fields.description || fields.vazifalari || fields.bio || fields.content, locale),
        reception_days: toString(fields['reception-days'] || fields.reception_days || fields['admission-day'] || fields.admission_day || fields.qabul_kunlari || fields.reception || fields.reception_hours || fields['reception-days']?.fields?.name || fields['admission-day']?.fields?.name, locale),
        scopus_id: toString(fields.scopus_id, locale),
        scopus_stats: {
            articles: parseInt(fields.scopus_articles || fields.articles_count || '0', 10),
            citations: parseInt(fields.scopus_citations || fields.citations_count || '0', 10)
        },
        google_scholar_id: toString(fields.google_scholar_id, locale),
        languages: languages,
        isMain: isMain,
        order: fields.order !== undefined ? parseInt(fields.order, 10) : undefined,
        category: 'leadership' as const,
        certificates: normalizeCertificates(fields),
        fields,
        collection: entry.collection
    };
};

export const getLeadershipApi = async (locale: string = 'uz'): Promise<Leadership[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        const [rectorRes, viceRectorsRes] = await Promise.all([
            apiClient.get(`/projects/${projectId}/content/rector-university`, {
                params: {
                    locale,
                    with: 'image,positions,languages,academic-degree,admission-day,reception-days,birth-date' // Ensure relations are fetched
                }
            }),
            apiClient.get(`/projects/${projectId}/content/vice-rectors`, {
                params: {
                    locale,
                    with: 'image,positions,languages,academic-degree,admission-day,reception-days,birth-date'
                }
            })
        ]);

        const normalizeData = (res: any) => {
            if (!res) return [];
            const data = res.data !== undefined ? res.data : res;
            if (Array.isArray(data)) return data;
            if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                if (data.fields || data.uuid || data.id) return [data];
            }
            return [];
        };

        const rectorRaw = normalizeData(rectorRes.data);
        const viceRectorsRaw = normalizeData(viceRectorsRes.data);

        const rector: Leadership[] = rectorRaw.map((entry: any) => transformMember(entry, true, locale));
        const activeRector = rector.filter(r => r.name !== '');

        const viceRectors: Leadership[] = viceRectorsRaw.map((entry: any) => transformMember(entry, false, locale));
        const activeViceRectors = viceRectors
            .filter(v => v.name !== '')
            .sort((a, b) => {
                const orderA = a.order !== undefined ? a.order : 999;
                const orderB = b.order !== undefined ? b.order : 999;
                return orderA - orderB;
            });

        return [...activeRector, ...activeViceRectors];
    } catch (error) {
        console.error('Error fetching leadership:', error);
        return [];
    }
};

export const getDeansApi = async (locale?: string): Promise<Leadership[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        // Fetch from deans-of-faculties primarily
        const response = await apiClient.get(`/projects/${projectId}/content/deans-of-faculties`, {
            params: {
                locale,
                with: 'image,positions,faculty,department,academic-degree,certificates,methodological-publications,thesis-abstract,research-works'
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data?.data || [];

        return data.map((entry: any) => {
            const fields = entry.fields || {};
            const name = toString(fields.name || entry.name, locale || 'uz').trim();
            const id = entry.uuid || entry.id;

            // For heads-of-departments, they might have a faculty or department relation
            const posField = fields.positions || fields.position || fields.postion;
            const posName = toString(posField, locale || 'uz') || "Fakultet dekani";

            const facultyRel = fields.faculty || fields.department; // Some might use department field for the faculty object
            const facultyName = toString(facultyRel, locale || 'uz');

            return {
                id: id,
                slug: slugify(name || id),
                name: name,
                position: facultyName ? `${posName} (${facultyName})` : posName,
                degree: toString(fields.degree || fields['academic-degree'] || fields.academicDegree || fields.ilmiy_daraja, locale || 'uz'),
                phone: formatPhone(fields.phone || entry.phone),
                email: toString(fields.email || entry.email, locale || 'uz'),
                image: getImageUrl(resolveImage(fields.image || entry.image)),
                biography: toString(fields.biography || fields.biografiya, locale || 'uz'),
                career: toString(fields['work-experience'] || fields.work_experience || fields.career || fields.mehnat_faoliyati, locale || 'uz'),
                description: toString(fields.responsibilities || fields.description || fields.vazifalari, locale || 'uz'),
                birth_date: toString(fields['birth-date'] || fields.birth_date || fields.tugilgan_sana || entry['birth-date'], locale || 'uz'),
                reception_days: toString(fields['reception-days'] || fields.reception_days || fields['admission-day'] || fields.admission_day || fields.qabul_kunlari || fields.reception, locale || 'uz'),
                isMain: false,
                category: 'dean' as const,
                certificates: normalizeCertificates(fields),
                methodological_publications: toString(fields['methodological-publications'], locale || 'uz'),
                thesis_abstract: toString(fields['thesis-abstract'], locale || 'uz'),
                research_works: toString(fields['research-works'], locale || 'uz'),
                fields,
                collection: entry.collection
            };
        });
    } catch (error) {
        console.error('Error fetching deans:', error);
        return [];
    }
};

export const getAcademicHeadsApi = async (locale?: string): Promise<Leadership[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/heads-of-academic-departments`, {
            params: {
                locale,
                with: 'image,positions,postion,academic_department,deaprtment,academic-department,department,academic-degree,methodological-publications,thesis-abstract,research-works'
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data?.data || [];

        return data.map((entry: any) => {
            const fields = entry.fields || {};
            const name = toString(fields.name || entry.name, locale || 'uz').trim();
            const id = entry.uuid || entry.id;
            const posName = toString(fields.positions || fields.position || fields.postion, locale || 'uz') || "Kafedra mudiri";
            const deptName = toString(fields.academic_department || fields.deaprtment || fields['academic-department'] || fields.department, locale || 'uz');

            return {
                id: id,
                slug: slugify(name || id),
                name: name,
                position: deptName ? `${posName} (${deptName})` : posName,
                degree: toString(fields.degree || fields['academic-degree'] || fields.academicDegree || fields.ilmiy_daraja, locale || 'uz'),
                department: deptName,
                phone: formatPhone(fields.phone || entry.phone),
                email: toString(fields.email || entry.email, locale || 'uz'),
                image: getImageUrl(resolveImage(fields.image || entry.image)),
                career: toString(fields['work-experience'] || fields.work_experience || fields.career || fields.mehnat_faoliyati || fields.ish_tajribasi || fields.milestones || fields.experience, locale || 'uz'),
                description: toString(fields.responsibilities || fields.description || fields.vazifalari || fields.bio || fields.content, locale || 'uz'),
                birth_date: toString(fields['birth-date'] || fields.birth_date || fields.tugilgan_sana || entry['birth-date'], locale || 'uz'),
                reception_days: toString(fields['reception-days'] || fields.reception_days || fields['admission-day'] || fields.admission_day || fields.qabul_kunlari || fields.reception, locale || 'uz'),
                isMain: false,
                category: 'academic_head' as const,
                certificates: normalizeCertificates(fields),
                methodological_publications: toString(fields['methodological-publications'], locale || 'uz'),
                thesis_abstract: toString(fields['thesis-abstract'], locale || 'uz'),
                research_works: toString(fields['research-works'], locale || 'uz'),
                fields,
                collection: entry.collection
            };
        });
    } catch (error) {
        console.error('Error fetching academic heads:', error);
        return [];
    }
};

export const getAcademicStaffSpecificApi = async (locale: string = 'uz'): Promise<Leadership[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/academic-staff`, {
            params: {
                locale,
                with: 'image,positions,position,postion,academic_department,deaprtment,academic-department,department,academic-degree,certificate,certificates,sertifikatlar',
                pagination: { limit: 100 }
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data?.data || [];

        return data.map((entry: any) => {
            const fields = entry.fields || {};
            const name = toString(fields.name || entry.name, locale).trim();
            const id = entry.uuid || entry.id;
            const posField = fields.positions || fields.position || fields.postion;
            const singlePos = Array.isArray(posField) ? posField[0] : posField;
            const posFields = singlePos?.fields || {};

            const posName = toString(posField, locale) || "O'qituvchi";
            const deptName = toString(fields.academic_department || fields.deaprtment || fields['academic-department'] || fields.department, locale);
            const order = posFields.order !== undefined ? parseInt(posFields.order, 10) : (fields.order !== undefined ? parseInt(fields.order, 10) : 999);

            return {
                id: id,
                slug: slugify(name || id),
                name: name,
                position: deptName ? `${posName} (${deptName})` : posName,
                degree: toString(fields.degree || fields['academic-degree'] || fields.academicDegree || fields.ilmiy_daraja, locale),
                phone: formatPhone(fields.phone || entry.phone),
                email: toString(fields.email || entry.email, locale),
                image: getImageUrl(resolveImage(fields.image || entry.image)),
                career: toString(fields['work-experience'] || fields.work_experience || fields.career || fields.mehnat_faoliyati || fields.ish_tajribasi || fields.milestones || fields.experience, locale),
                description: toString(fields.responsibilities || fields.description || fields.vazifalari || fields.bio || fields.content, locale),
                birth_date: toString(fields['birth-date'] || fields.birth_date || fields.tugilgan_sana || entry.collection?.['birth-date'] || entry['birth-date'], locale),
                isMain: false,
                order: order,
                category: 'academic_staff' as const,
                certificates: normalizeCertificates(fields),
                fields,
                collection: entry.collection
            };
        }).sort((a: any, b: any) => (a.order || 999) - (b.order || 999));
    } catch (error) {
        console.error('Error fetching academic staff:', error);
        return [];
    }
};

// Helper to fetch a single member by ID and locale from ANY leadership collection
export const getLocalizedMemberById = async (id: string, locale: string = 'uz'): Promise<Leadership | null> => {
    try {
        // STRATEGY 1: Use already-working list APIs for deans and academic heads
        // These are the most common cases for UUID-based navigation from faculty/department pages
        const [deans, academicHeads] = await Promise.all([
            getDeansApi(locale).catch(() => [] as Leadership[]),
            getAcademicHeadsApi(locale).catch(() => [] as Leadership[])
        ]);

        const fromLists = [...deans, ...academicHeads].find(m => String(m.id) === String(id));
        if (fromLists) {
            console.log(`getLocalizedMemberById: Found in list APIs: ${fromLists.name} (${fromLists.category})`);
            return fromLists;
        }

        // STRATEGY 2: Check leadership (rector/vice-rectors)
        const leadershipMembers = await getLeadershipApi(locale).catch(() => [] as Leadership[]);
        const fromLeadership = leadershipMembers.find(m => String(m.id) === String(id));
        if (fromLeadership) {
            console.log(`getLocalizedMemberById: Found in leadership: ${fromLeadership.name}`);
            return fromLeadership;
        }

        // STRATEGY 3: Try list-based filter for other collections
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const otherCollections = [
            'deans-of-faculties',
            'heads-of-academic-departments',
            'heads-of-departments',
            'heads-of-centers',
            'administrative-leadership',
            'deans-of-faculties',
            'academic-staff'
        ];

        for (const coll of otherCollections) {
            try {
                // Try filter by ID (list endpoint with filter param)
                const response = await (await import('../client')).default.get(`/projects/${projectId}/content/${coll}`, {
                    params: {
                        locale,
                        'filter[id][eq]': id,
                        with: 'image,department,center,position,positions,academic-degree,certificates,admission-day,reception-days,birth-date,methodological-publications,thesis-abstract,research-works'
                    }
                });

                const list = Array.isArray(response.data) ? response.data : (response.data?.data || []);
                const entry = list.find((m: any) => String(m.uuid || m.id) === String(id));

                if (entry && (entry.uuid || entry.id)) {
                    console.log(`getLocalizedMemberById: Found via list filter in ${coll}`);
                    const fields = entry.fields || {};

                    if (coll === 'heads-of-academic-departments') {
                        const hf = fields;
                        const posName = toString(hf.positions || hf.position || hf.postion, locale) || 'Kafedra mudiri';
                        const deptName = toString(hf.academic_department || hf.deaprtment || hf['academic-department'] || hf.department, locale);
                        const name = toString(hf.name || entry.name, locale).trim();
                        return {
                            id: entry.uuid || entry.id,
                            slug: slugify(name || String(entry.uuid || entry.id)),
                            name,
                            position: deptName ? `${posName} (${deptName})` : posName,
                            degree: toString(hf.degree || hf['academic-degree'] || hf.academicDegree || hf.ilmiy_daraja, locale),
                            department: deptName,
                            phone: String(hf.phone || entry.phone || '').split('.')[0],
                            email: toString(hf.email || entry.email, locale),
                            image: getImageUrl(resolveImage(hf.image || entry.image)),
                            career: toString(hf['work-experience'] || hf.work_experience || hf.career || hf.mehnat_faoliyati || hf.milestones, locale),
                            description: toString(hf.responsibilities || hf.description || hf.vazifalari, locale),
                            birth_date: toString(hf['birth-date'] || hf.birth_date || hf.tugilgan_sana, locale),
                            reception_days: toString(hf['reception-days'] || hf.reception_days || hf['admission-day'] || hf.qabul_kunlari, locale),
                            isMain: false,
                            category: 'academic_head' as const,
                            certificates: normalizeCertificates(fields),
                            methodological_publications: toString(fields['methodological-publications'], locale),
                            thesis_abstract: toString(fields['thesis-abstract'], locale),
                            research_works: toString(fields['research-works'], locale),
                            fields,
                        };
                    }

                    if (coll === 'deans-of-faculties' || coll === 'heads-of-departments') {
                        const df = fields;
                        const posName = toString(df.positions || df.position || df.postion, locale) || 'Fakultet dekani';
                        const name = toString(df.name || entry.name, locale).trim();
                        return {
                            id: entry.uuid || entry.id,
                            slug: slugify(name || String(entry.uuid || entry.id)),
                            name,
                            position: posName,
                            degree: toString(df.degree || df['academic-degree'] || df.academicDegree || df.ilmiy_daraja, locale),
                            phone: String(df.phone || entry.phone || '').split('.')[0],
                            email: toString(df.email || entry.email, locale),
                            image: getImageUrl(resolveImage(df.image || entry.image)),
                            career: toString(df['work-experience'] || df.work_experience || df.career || df.mehnat_faoliyati, locale),
                            description: toString(df.responsibilities || df.description || df.vazifalari, locale),
                            birth_date: toString(df['birth-date'] || df.birth_date || df.tugilgan_sana, locale),
                            reception_days: toString(df['reception-days'] || df.reception_days || df['admission-day'] || df.qabul_kunlari, locale),
                            isMain: false,
                            category: 'dean' as const,
                            certificates: normalizeCertificates(fields),
                            methodological_publications: toString(fields['methodological-publications'], locale),
                            thesis_abstract: toString(fields['thesis-abstract'], locale),
                            research_works: toString(fields['research-works'], locale),
                            fields,
                        };
                    }

                    // Generic fallback mapping for other collections
                    const name = toString(fields.name || entry.name, locale).trim();
                    return {
                        id: entry.uuid || entry.id,
                        slug: slugify(name || String(entry.uuid || entry.id)),
                        name,
                        position: toString(fields.positions || fields.position || fields.postion, locale),
                        degree: toString(fields['academic-degree'] || fields.degree, locale),
                        phone: String(fields.phone || entry.phone || '').split('.')[0],
                        email: toString(fields.email || entry.email, locale),
                        image: getImageUrl(resolveImage(fields.image || entry.image)),
                        career: toString(fields['work-experience'] || fields.work_experience || fields.career, locale),
                        description: toString(fields.responsibilities || fields.description, locale),
                        birth_date: toString(fields['birth-date'] || fields.birth_date, locale),
                        reception_days: toString(fields['reception-days'] || fields['admission-day'], locale),
                        isMain: false,
                        category: (coll === 'heads-of-centers' ? 'center' : (coll === 'academic-staff' ? 'staff' : 'admin')) as any,
                        certificates: normalizeCertificates(fields),
                        fields,
                    };
                }
            } catch (err) {
                // Not in this collection, continue
            }
        }

        console.warn(`getLocalizedMemberById: Member ${id} not found in any collection`);
        return null;
    } catch (error) {
        console.error('Error in getLocalizedMemberById:', error);
        return null;
    }
};

export const getLeadershipBySlug = async (slug: string, locale?: string, category?: string, isFallback: boolean = false): Promise<Leadership | null> => {
    try {
        const targetLocale = locale || 'uz';
        const { getCentersHeadsApi } = await import('./centers.http');
        const { getAdministrativeHeadsApi } = await import('./department.http');

        const [leadershipMembers, centerHeads, adminHeads, deans, academicHeads, academicStaff] = await Promise.all([
            getLeadershipApi(targetLocale),
            getCentersHeadsApi(targetLocale),
            getAdministrativeHeadsApi(targetLocale),
            getDeansApi(targetLocale),
            getAcademicHeadsApi(targetLocale),
            getAcademicStaffSpecificApi(targetLocale)
        ]);

        const allMembers = [
            ...centerHeads,
            ...adminHeads,
            ...deans,
            ...academicHeads,
            ...leadershipMembers,
            ...academicStaff
        ];

        // If a specific category hint is provided, prioritize those members
        if (category) {
            console.log(`getLeadershipBySlug: Applying category preference: ${category}`);
            const prioritized = allMembers.filter(m => {
                if (category === 'center') return m.category === 'center';
                if (category === 'admin' || category === 'section') {
                    return m.category === 'admin' || m.category === 'academic_head' || m.category === 'dean';
                }
                if (category === 'dean') return m.category === 'dean';
                if (category === 'academic_head') return m.category === 'academic_head';
                if (category === 'leadership') {
                    return ['leadership', 'dean', 'academic_head'].includes(m.category || '');
                }
                return true;
            });

            // Only use prioritized if matches found, otherwise keep all (for safety)
            if (prioritized.length > 0) {
                // Prepend prioritized while keeping the rest for fallback
                const others = allMembers.filter(m => !prioritized.includes(m));
                allMembers.splice(0, allMembers.length, ...prioritized, ...others);
            }
        }

        // AGGRESSIVELY CLEAN SLUGS FOR COMPARISON
        // We only strip leading path segments and known navigation prefixes
        const cleanForCompare = (s: string) => {
            if (!s) return '';
            let cleaned = s;
            // Remove language and base path prefixes ONLY if they are at the start
            cleaned = cleaned.replace(/^(\/?(uz|ru|en))?\/?(leadership|centers|sections|faculties\/dean|departments\/head|faculties|departments|deans|centers)\//, '');
            // Remove any remaining leading slash
            cleaned = cleaned.replace(/^\//, '');
            // Standardize characters
            return cleaned.replace(/['"ʻ`]/g, '').toLowerCase().trim();
        };

        const cleanIncoming = cleanForCompare(slug);

        // UUID DETECTION: use last path segment of raw slug to avoid cleanForCompare corruption
        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const rawLastSegment = slug.replace(/^.*\//, '').trim();
        const isUUIDSlug = UUID_REGEX.test(rawLastSegment);

        // Robust prefix and base ID extraction from cleaned slug
        const PREFIX_REGEX = /^(section|center|vp|dean|head|staff|prorektor|vice-rector|rector|head)-/;
        const incomingPrefix = cleanIncoming.match(PREFIX_REGEX)?.[1]?.toLowerCase();
        const baseIncoming = cleanIncoming.replace(PREFIX_REGEX, '');

        console.log(`getLeadershipBySlug: slug="${slug}", isUUID=${isUUIDSlug}, prefix="${incomingPrefix}"`);

        if (cleanIncoming === 'rector' || cleanIncoming === 'rektor') {
            return leadershipMembers.find(m => m.isMain) || leadershipMembers[0] || null;
        }

        // UUID-FIRST STRATEGY - use raw last segment for ID lookup
        if (isUUIDSlug) {
            console.log(`getLeadershipBySlug: UUID lookup for ID: "${rawLastSegment}"`);
            const directMember = await getLocalizedMemberById(rawLastSegment, targetLocale);
            if (directMember) {
                console.log(`getLeadershipBySlug: UUID found: ${directMember.name} (${directMember.category})`);
                return directMember;
            }
        }

        // Helper to match a member against an incoming slug string
        const isMatch = (m: Leadership, incomingFull: string, base: string, inPrefix: string | undefined) => {
            const mSlug = cleanForCompare(m.slug || '');
            const mId = (String(m.id) || '').toLowerCase().trim();

            const isDirect = mSlug === incomingFull || mId === incomingFull;
            if (isDirect) {
                // If we have a category hint, and this member doesn't match it,
                // we should be CAREFUL. If there's ANOTHER member that DOES match the category
                // and has the same slug, we'd prefer them. 
                // However, find() already operates on prioritized array if category was provided.
                return true;
            }

            // If incoming has a prefix, check compatibility
            if (inPrefix) {
                const isPrefixMatch = (inPrefix === 'section' && m.category === 'admin') ||
                    (inPrefix === 'center' && m.category === 'center') ||
                    (inPrefix === 'dean' && m.category === 'dean') ||
                    (inPrefix === 'head' && m.category === 'academic_head') ||
                    (inPrefix === 'staff' && m.category === 'academic_staff') ||
                    (inPrefix === 'vp' && m.category === 'leadership');

                if (isPrefixMatch && (mSlug === base || mId === base)) return true;
            }

            return mSlug === base || mId === base;
        };

        // 1. Primary match: Search in currently loaded locale members
        let member = allMembers.find(m => isMatch(m, cleanIncoming, baseIncoming, incomingPrefix));

        // 2. Fuzzy fallback: Search by transliterated name or position (for human-readable slugs from Nav)
        if (!member) {
            console.log(`getLeadershipBySlug: No direct match, trying fuzzy fallout for: "${cleanIncoming}"`);
            const { slugify } = await import('../../utils/transliterate');

            member = allMembers.find(m => {
                const nameSlug = slugify(m.name || '');
                // Check if slug matches person name
                if (nameSlug === cleanIncoming || nameSlug === baseIncoming) return true;

                // Check if slug matches center/department name within the position
                const posSlug = slugify(m.position || '');
                const isIncomingEntity = cleanIncoming.includes('-markazi') || cleanIncoming.includes('-bolimi') || cleanIncoming.includes('-boshqarmasi') || cleanIncoming.includes('-kengashi');

                if (posSlug.includes(cleanIncoming) || posSlug.includes(baseIncoming)) {
                    // IF incoming slug is clearly an entity (contains -markazi etc),
                    // only match if the member's category matches that entity type 
                    // or if their position also contains the specific entity type.
                    if (isIncomingEntity) {
                        const mPosLower = (m.position || '').toLowerCase();
                        const isMemberEntity = mPosLower.includes('markaz') || mPosLower.includes('bo\'lim') || mPosLower.includes('bo‘lim') || mPosLower.includes('boshqarma') || mPosLower.includes('kengash');

                        if (!isMemberEntity && m.category === 'leadership') {
                            // Skip vice-rectors for entity-specific slugs
                            return false;
                        }
                    }

                    // Only match if category is compatible (prevents prorektor matching everything)
                    if (!incomingPrefix || m.category === incomingPrefix ||
                        (incomingPrefix === 'section' && m.category === 'admin') ||
                        (incomingPrefix === 'head' && m.category === 'academic_head')) {
                        return true;
                    }
                }
                return false;
            });

            if (member) {
                console.log(`getLeadershipBySlug: Found via fuzzy match: "${member.name}"`);
            }
        }

        if (member) {
            console.log(`getLeadershipBySlug: SUCCESS! Resolved member: "${member.name}" (ID: ${member.id})`);
        }

        // 2. Cross-locale fallback: find canonical ID in other locales
        if (!member && !isFallback) {
            console.log(`getLeadershipBySlug: Not found in locale "${targetLocale}", trying cross-locale fallback for: "${slug}"`);
            const otherLocales = ['uz', 'ru', 'en'].filter(l => l !== targetLocale);

            for (const otherLocale of otherLocales) {
                try {
                    // Recursive call to find the member's UUID in another language
                    const foundInOther = await getLeadershipBySlug(slug, otherLocale, category, true);
                    if (foundInOther) {
                        const stableId = foundInOther.id;
                        console.log(`getLeadershipBySlug: Found fallback member in "${otherLocale}" via UUID: ${stableId}`);

                        // 3. TRY TO RE-FETCH LOCALIZED VERSION VIA UUID
                        const localizedMember = await getLocalizedMemberById(stableId, targetLocale);

                        if (localizedMember) {
                            member = localizedMember;
                            console.log(`getLeadershipBySlug: SUCCESS! Found localized member via ID fetch.`);
                        } else {
                            // 4. IDENTITY MATCHING (Email/Phone)
                            const searchEmail = foundInOther.email;
                            const searchPhone = foundInOther.phone;
                            const searchCategory = foundInOther.category;

                            console.log(`getLeadershipBySlug: Identity searching for "${foundInOther.name}" (Email: ${searchEmail}, Phone: ${searchPhone}, Cat: ${searchCategory})`);

                            const identityMatch = allMembers.find(m => {
                                // 1. Priority: Exact Email match (strong globally)
                                if (searchEmail && m.email && m.email.trim().toLowerCase() === searchEmail.trim().toLowerCase()) {
                                    return true;
                                }
                                // 2. Secondary: Phone match ONLY if category is identical
                                if (searchPhone && m.phone && m.phone === searchPhone && m.category === searchCategory) {
                                    return true;
                                }
                                return false;
                            });

                            if (identityMatch) {
                                member = identityMatch;
                                console.log(`getLeadershipBySlug: SUCCESS! Linked identity to "${member.name}" via ${member.email === searchEmail ? 'Email' : 'Phone'}.`);
                            } else {
                                // Ultimate fallback: return the other locale's data to prevent 404
                                member = foundInOther;
                                console.warn(`getLeadershipBySlug: NO IDENTITY MATCH in "${targetLocale}". Using original data.`);
                            }
                        }
                        break;
                    }
                } catch (fbErr) {
                    console.warn(`Fallback lookup failed for locale "${otherLocale}":`, fbErr);
                }
            }
        }

        if (!member) {
            console.warn(`getLeadershipBySlug: Member not found in locale "${targetLocale}" and no fallback found. Incoming: "${slug}". Searched ${allMembers.length} members.`);
        }

        return member || null;
    } catch (error) {
        console.error('Error fetching leadership member by slug:', error);
        return null;
    }
};

