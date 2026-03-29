import apiClient from '../client';
import { Faculty, Department } from '../../types/faculty.types';
import { getImageUrl, normalizeCertificates, toString } from '../../utils/apiUtils';
import { slugify as transliterateSlugify } from '../../utils/transliterate';

const resolveImage = (img: any): string | null => {
    if (!img) return null;
    if (Array.isArray(img) && img.length > 0) return resolveImage(img[0]); // Handle array of images
    if (typeof img === 'string') return img;
    return img.url || img.thumbnail_url || img.path || null;
};

const formatPhone = (phone: any): string => {
    if (!phone) return '';
    return String(phone).split('.')[0];
};

const ensureSlug = (name: string, slug?: string) => {
    if (slug) return slug;
    return transliterateSlugify(name);
};

export const getFaculties = async (locale?: string): Promise<Faculty[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/faculties`, {
            params: { locale, with: 'icon,image' }
        });
        const data = Array.isArray(response.data) ? response.data : response.data.data;
        return data.map((entry: any) => {
            const fields = entry.fields || {};
            const name = fields.name || fields.title || entry.name || entry.title || "Fakultet";
            return {
                id: entry.uuid || entry.id,
                name: name,
                description: fields.content || fields.description || entry.description,
                image: getImageUrl(resolveImage(fields.image || entry.image)),
                iconImage: getImageUrl(resolveImage(fields.icon || entry.icon)),
                color: fields.color || 'from-sky-500 to-indigo-500',
                slug: ensureSlug(name, entry.slug || fields.slug),
                uuid: entry.uuid || entry.id
            };
        }).sort((a: Faculty, b: Faculty) => a.name.localeCompare(b.name, locale));
    } catch (error) {
        console.error("Faculties fetch error:", error);
        return [];
    }
};

export const getFacultyById = async (id: string | number, locale?: string): Promise<Faculty | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(id));
        const filterKey = isUUID ? 'filter[id][eq]' : 'filter[slug][eq]';

        const response = await apiClient.get(`/projects/${projectId}/content/faculties`, {
            params: {
                [filterKey]: id,
                locale,
                with: 'icon,image,gallery,dean,dekani,head,dekan,mudiri,rahbar'
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;
        let entry = (data || []).find((item: any) => {
            const itemSlug = item.fields?.slug || item.slug;
            const itemId = item.uuid || item.id;
            return String(itemSlug) === String(id) || String(itemId) === String(id);
        });

        // If not found in initial fetch, try to find it across all locales
        if (!entry) {
            let found = null;
            let targetId: string | number | null = null;

            // First try current locale
            const currentLocaleFacs = await getFaculties(locale);
            found = currentLocaleFacs.find(f => f.slug === id || String(f.id) === String(id) || String(f.uuid) === String(id));

            // If not found, try other locales to find the faculty by slug
            if (!found) {
                const locales = ['uz', 'ru', 'en'].filter(l => l !== locale);
                for (const otherLocale of locales) {
                    const otherFacs = await getFaculties(otherLocale);
                    found = otherFacs.find(f => f.slug === id || String(f.id) === String(id) || String(f.uuid) === String(id));
                    if (found) break;
                }
            }

            if (!found) return null;

            targetId = found.uuid || found.id;

            // Fetch by ID in the requested locale
            const retryRes = await apiClient.get(`/projects/${projectId}/content/faculties`, {
                params: {
                    'filter[id][eq]': targetId,
                    locale,
                    with: 'icon,image,gallery,dean,dekani,head'
                }
            });
            const retryData = Array.isArray(retryRes.data) ? retryRes.data : retryRes.data.data;
            entry = (retryData || []).find((item: any) => (item.uuid || item.id) === targetId);
        }

        const toString = (val: any, locale: string = 'uz'): string => {
            if (!val) return '';
            if (typeof val === 'string') return val;
            if (typeof val === 'number') return String(val);
            if (Array.isArray(val)) {
                return val.map(item => toString(item, locale)).filter(Boolean).join(', ');
            }
            if (val && typeof val === 'object') {
                if (val[locale] || val['uz'] || val['ru'] || val['en']) {
                    return val[locale] || val['uz'] || val['ru'] || val['en'] || '';
                }
                const fields = val.fields || {};
                const nameVal = fields.name || fields.title || val.name || val.title;
                if (nameVal) return toString(nameVal, locale);
                return val.uuid || val.id || '';
            }
            return '';
        };

        const fields = entry.fields || {};
        const facultyId = entry.uuid || entry.id;
        const name = toString(fields.name || fields.title || entry.name || entry.title || "Fakultet", locale);

        let deanInfo = undefined;

        // 1. Try to get dean from the faculty entry itself (embedded or relation)
        // Try many field name variants used in different CMS setups
        const embeddedDeanRaw =
            fields.dean || fields.dekani || fields.head || fields.dekan ||
            fields.mudiri || fields.rahbar || fields.boss || fields.director ||
            fields['faculty-head'] || fields.faculty_head || fields.leader;
        const embeddedDean = Array.isArray(embeddedDeanRaw) ? embeddedDeanRaw[0] : embeddedDeanRaw;
        if (embeddedDean && typeof embeddedDean === 'object') {
            const df = embeddedDean.fields || {};
            const dName = toString(df.name || embeddedDean.name || '', locale).trim();
            if (dName) {
                deanInfo = {
                    id: embeddedDean.uuid || embeddedDean.id,
                    slug: transliterateSlugify(dName || String(embeddedDean.uuid || embeddedDean.id)),
                    name: dName,
                    position: toString(df.positions || df.position || df.postion, locale) || "Fakultet dekani",
                    phone: formatPhone(df.phone || embeddedDean.phone),
                    email: toString(df.email || embeddedDean.email, locale),
                    image: getImageUrl(resolveImage(df.image || embeddedDean.image)),
                    career: toString(df['work-experience'] || df.career || df.ish_tajribasi, locale),
                    description: toString(df.responsibilities || df.description || df.vazifalari, locale),
                    category: 'dean' as const,
                    fields: df
                } as any;
            }
        }

        // 1b. Flat-field fallback (some CMSes store dean_name, dean_image etc. directly on the faculty)
        if (!deanInfo) {
            const flatName = toString(fields.dean_name || fields.dekan_name || fields.head_name || fields.deanName, locale).trim();
            if (flatName) {
                deanInfo = {
                    id: facultyId + '_dean',
                    slug: transliterateSlugify(flatName),
                    name: flatName,
                    position: toString(fields.dean_position || fields.dekan_position || fields.deanPosition, locale) || "Fakultet dekani",
                    phone: formatPhone(fields.dean_phone || fields.dekan_phone),
                    email: toString(fields.dean_email || fields.dekan_email, locale),
                    image: getImageUrl(resolveImage(fields.dean_image || fields.dekan_image)),
                    category: 'dean' as const,
                } as any;
            }
        }

        try {
            // 2. Fetch from the correct 'deans-of-faculties' collection
            const deanRes = await apiClient.get(`/projects/${projectId}/content/deans-of-faculties`, {
                params: { locale, with: 'image,positions,faculty,academic-degree,certificates,methodological-publications,thesis-abstract,research-works' }
            });
            const deansData = Array.isArray(deanRes.data) ? deanRes.data : deanRes.data.data;

            console.log(`deans-of-faculties: Found ${deansData?.length || 0} entries. Matching facultyId: ${facultyId}, name: "${name}"`);
            if (deansData?.length > 0) {
                deansData.slice(0, 3).forEach((d: any, i: number) => {
                    console.log(`Dean[${i}] keys:`, Object.keys(d.fields || {}), '| faculty:', JSON.stringify((d.fields || {}).faculty), '| name:', JSON.stringify((d.fields || {}).name));
                });
            }

            const deanEntry = deansData?.find((d: any) => {
                const df = d.fields || {};
                // Support both object relation and string/array variants
                const facultyField = df.faculty || df.fakultet || df.department || df['academic-faculty'] || df['faculty-id'];
                const candidateItems = Array.isArray(facultyField) ? facultyField : (facultyField ? [facultyField] : []);

                return candidateItems.some((candidateRaw: any) => {
                    if (!candidateRaw) return false;
                    const fId = candidateRaw?.uuid || candidateRaw?.id || (typeof candidateRaw === 'string' ? candidateRaw : candidateRaw?.value);
                    const fName = toString(candidateRaw?.name || candidateRaw?.title || candidateRaw, locale);
                    const isMatch = String(fId) === String(facultyId) || (fName && name && fName.toLowerCase() === name.toLowerCase());
                    if (isMatch) console.log('✅ Dean matched:', df.name, '→ faculty field:', candidateRaw);
                    return isMatch;
                });
            });

            if (deanEntry) {
                const df = deanEntry.fields || {};
                const rawPos = df.positions || df.position || df.postion;
                const posName = toString(rawPos, locale) || "Fakultet dekani";

                const pName = toString(df.name || deanEntry.name || '', locale).trim();
                deanInfo = {
                    id: deanEntry.uuid || deanEntry.id,
                    slug: transliterateSlugify(pName || String(deanEntry.uuid || deanEntry.id)),
                    name: pName,
                    position: posName,
                    phone: formatPhone(df.phone || deanEntry.phone),
                    email: toString(df.email || deanEntry.email, locale),
                    image: getImageUrl(resolveImage(df.image || deanEntry.image)),
                    degree: toString(df.degree || df['academic-degree'] || df.academicDegree || df.ilmiy_daraja, locale),
                    career: toString(df['work-experience'] || df.work_experience || df.career || df.ish_tajribasi || df.milestones || df.experience, locale),
                    description: toString(df.responsibilities || df.description || df.vazifalari || df.bio || df.content, locale),
                    isMain: false,
                    category: 'dean' as const,
                    certificates: normalizeCertificates(df),
                    methodological_publications: toString(df['methodological-publications'], locale),
                    thesis_abstract: toString(df['thesis-abstract'], locale),
                    research_works: toString(df['research-works'], locale)
                };
            }
        } catch (deanErr) {
            console.warn("Error fetching dean from deans-of-faculties:", deanErr);
        }


        return {
            id: facultyId,
            name: name,
            description: fields.content || fields.description || entry.description,
            content: fields.content || '',
            image: getImageUrl(resolveImage(fields.image || entry.image)),
            iconImage: getImageUrl(resolveImage(fields.icon || entry.icon)),
            color: fields.color || 'from-sky-500 to-indigo-500',
            slug: ensureSlug(name, entry.slug || fields.slug), // Prioritize entry.slug (stable)
            gallery: Array.isArray(fields.gallery) ? fields.gallery.map((img: any) => getImageUrl(resolveImage(img))) : [],
            directionsAndSpecializations: fields.directions || fields.specializations || fields.yo_nalishlar || fields['directions-and-specializations'],
            internationalCooperation: fields['international-cooperation'] || fields.international_cooperation || fields.cooperation || fields.xalqaro_hamkorlik,
            uuid: facultyId,
            deanInfo
        };
    } catch (error) {
        console.error("Faculty fetch error:", error);
        return null;
    }
};

export const getDepartmentsByFacultyId = async (facultyId: string | number, locale?: string): Promise<Department[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/academic-departments`, {
            params: { locale, with: 'image,faculty' }
        });
        const data = Array.isArray(response.data) ? response.data : response.data.data;

        const headsRes = await apiClient.get(`/projects/${projectId}/content/heads-of-academic-departments`, {
            params: { locale, with: 'academic_department,academic-department' }
        }).catch(() => ({ data: [] }));
        const headsData = Array.isArray(headsRes.data) ? headsRes.data : headsRes.data.data || [];

        return data
            .filter((item: any) => {
                const fId = item.fields?.faculty?.uuid || item.fields?.faculty?.id || item.fields?.faculty;
                return String(fId) === String(facultyId);
            })
            .map((entry: any) => {
                const fields = entry.fields || {};
                const name = fields.name || fields.title || entry.name || entry.title || "Kafedra";
                const deptId = entry.uuid || entry.id;

                // Find head for this department
                const headEntry = headsData.find((h: any) => {
                    const hf = h.fields || {};
                    const dField = hf.academic_department || hf['academic-department'] || hf.department;
                    const dObj = Array.isArray(dField) ? dField[0] : dField;
                    const dId = dObj?.uuid || dObj?.id || dObj;
                    return String(dId) === String(deptId);
                });

                return {
                    id: deptId,
                    name: name,
                    slug: ensureSlug(name, entry.slug || fields.slug),
                    facultyId: facultyId,
                    image: getImageUrl(resolveImage(fields.image)),
                    phone: fields.phone ? String(fields.phone).split('.')[0] : (fields.phone_number ? String(fields.phone_number) : undefined),
                    email: fields.email ? String(fields.email).trim() : undefined,
                    headName: toString(headEntry?.fields?.name || headEntry?.name, locale) || fields.head_name || fields.manager || fields.dean || fields.leader,
                    headId: headEntry?.uuid || headEntry?.id
                };
            });
    } catch (error) {
        console.error("Error fetching departments by faculty:", error);
        return [];
    }
};

export const getDepartments = async (locale?: string): Promise<Department[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/academic-departments`, {
            params: { locale, with: 'image,faculty' }
        });
        const data = Array.isArray(response.data) ? response.data : response.data.data;

        const headsRes = await apiClient.get(`/projects/${projectId}/content/heads-of-academic-departments`, {
            params: { locale, with: 'academic_department,academic-department' }
        }).catch(() => ({ data: [] }));
        const headsData = Array.isArray(headsRes.data) ? headsRes.data : headsRes.data.data || [];

        return data.map((entry: any) => {
            const fields = entry.fields || {};
            const name = fields.name || fields.title || entry.name || entry.title || "Kafedra";
            const deptId = entry.uuid || entry.id;

            // Find head for this department
            const headEntry = headsData.find((h: any) => {
                const hf = h.fields || {};
                const dField = hf.academic_department || hf['academic-department'] || hf.department;
                const dObj = Array.isArray(dField) ? dField[0] : dField;
                const dId = dObj?.uuid || dObj?.id || dObj;

                const dName = toString(dObj?.name || dObj?.title || dObj, locale);
                return String(dId) === String(deptId) || (dName && name && dName.toLowerCase() === name.toLowerCase());
            });

            return {
                id: deptId,
                name: name,
                slug: ensureSlug(name, entry.slug || fields.slug),
                facultyId: fields.faculty?.uuid || fields.faculty?.id || fields.faculty,
                image: getImageUrl(resolveImage(fields.image)),
                phone: fields.phone ? String(fields.phone).split('.')[0] : (fields.phone_number ? String(fields.phone_number) : undefined),
                email: fields.email ? String(fields.email).trim() : undefined,
                headName: toString(headEntry?.fields?.name || headEntry?.name, locale) || fields.head_name || fields.manager || fields.dean || fields.leader,
                headId: headEntry?.uuid || headEntry?.id
            };
        });
    } catch (error) {
        console.error("Error fetching departments:", error);
        return [];
    }
};

export const getDepartmentById = async (id: string | number, locale?: string): Promise<Department | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const isTrueUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(id));
        const filterKey = isTrueUUID ? 'filter[id][eq]' : 'filter[slug][eq]';

        const response = await apiClient.get(`/projects/${projectId}/content/academic-departments`, {
            params: {
                [filterKey]: id,
                locale,
                with: 'image,gallery,faculty'
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;
        let entry = (data || []).find((item: any) => {
            const itemSlug = item.fields?.slug || item.slug;
            const itemId = item.uuid || item.id;
            return String(itemSlug) === String(id) || String(itemId) === String(id);
        });

        // If not found in initial fetch, try to find it across all locales
        if (!entry) {
            let found = null;
            let targetId: string | number | null = null;

            // First try current locale
            const currentLocaleDepts = await getDepartments(locale);
            found = currentLocaleDepts.find(d => d.slug === id || String(d.id) === String(id));

            // If not found, try other locales to find the department by slug
            if (!found) {
                const locales = ['uz', 'ru', 'en'].filter(l => l !== locale);
                for (const otherLocale of locales) {
                    const otherDepts = await getDepartments(otherLocale);
                    found = otherDepts.find(d => d.slug === id || String(d.id) === String(id));
                    if (found) break;
                }
            }

            if (!found) return null;

            targetId = found.id;

            // Fetch by ID in the requested locale
            const retryRes = await apiClient.get(`/projects/${projectId}/content/academic-departments`, {
                params: {
                    'filter[id][eq]': targetId,
                    locale,
                    with: 'image,gallery,faculty'
                }
            });
            const retryData = Array.isArray(retryRes.data) ? retryRes.data : retryRes.data.data;
            entry = (retryData || []).find((item: any) => (item.uuid || item.id) === targetId);
        }

        const fields = entry.fields || {};
        const departmentId = entry.uuid || entry.id;
        const facultyId = fields.faculty?.uuid || fields.faculty?.id || fields.faculty;
        const name = fields.name || fields.title || entry.name || entry.title || "Kafedra";



        let headInfo = undefined;
        try {
            const headRes = await apiClient.get(`/projects/${projectId}/content/heads-of-academic-departments`, {
                params: { locale, with: 'image,positions,academic_department,academic-department,academic-degree,certificates,methodological-publications,thesis-abstract,research-works' }
            });
            const headsData = Array.isArray(headRes.data) ? headRes.data : headRes.data.data;

            const headEntry = headsData?.find((h: any) => {
                const deptField = h.fields?.academic_department || h.fields?.['academic-department'] || h.fields?.department;
                const deptObj = Array.isArray(deptField) ? deptField[0] : deptField;
                const dId = deptObj?.uuid || deptObj?.id || deptObj;
                return String(dId) === String(departmentId);
            });

            if (headEntry) {
                const hf = headEntry.fields || {};
                const rawPos = hf.positions || hf.position || hf.postion;
                const posName = toString(rawPos, locale) || "Kafedra mudiri";

                const pName = toString(hf.name || headEntry.name || '', locale).trim();
                headInfo = {
                    id: headEntry.uuid || headEntry.id,
                    slug: transliterateSlugify(pName || String(headEntry.uuid || headEntry.id)),
                    name: pName,
                    position: posName,
                    phone: formatPhone(hf.phone || headEntry.phone),
                    email: toString(hf.email || headEntry.email, locale),
                    image: getImageUrl(resolveImage(hf.image || headEntry.image)),
                    degree: toString(hf.degree || hf['academic-degree'] || hf.academicDegree || hf.ilmiy_daraja, locale),
                    career: toString(hf['work-experience'] || hf.work_experience || hf.career || hf.ish_tajribasi || hf.milestones || hf.experience, locale),
                    description: toString(hf.responsibilities || hf.description || hf.vazifalari || hf.bio || hf.content, locale),
                    isMain: false,
                    category: 'academic_head' as const,
                    certificates: normalizeCertificates(hf),
                    methodological_publications: toString(hf['methodological-publications'], locale),
                    thesis_abstract: toString(hf['thesis-abstract'], locale),
                    research_works: toString(hf['research-works'], locale)
                };
            }
        } catch (headErr) {
            console.warn("Error fetching head for department:", headErr);
        }

        let teachers = [];
        try {
            // Try fetching academic staff. We use 'with' to expand relations.
            // We handle potential typos 'deaprtment' and 'postion'.
            const staffRes = await apiClient.get(`/projects/${projectId}/content/academic-staff`, {
                params: {
                    locale,
                    with: 'image,department,deaprtment,position,postion,academic-degree',
                    // Many CMSs allow multiple filters or we can filter locally to be safe
                    pagination: { limit: 100 }
                }
            });

            const staffData = Array.isArray(staffRes.data) ? staffRes.data : staffRes.data.data;

            // Filter by department ID (checking both standard and user typo field)
            teachers = (staffData || []).filter((s: any) => {
                const sf = s.fields || {};
                const dId = sf.department?.uuid || sf.department?.id || sf.department ||
                    sf.deaprtment?.uuid || sf.deaprtment?.id || sf.deaprtment;
                return String(dId) === String(departmentId);
            }).map((s: any) => {
                const sf = s.fields || {};
                const posField = sf.positions || sf.position || sf.postion;
                const singlePos = Array.isArray(posField) ? posField[0] : posField;
                const posFields = singlePos?.fields || {};

                const posName = toString(posField, locale) || "O'qituvchi";
                const order = posFields.order !== undefined ? parseInt(posFields.order, 10) : (sf.order !== undefined ? parseInt(sf.order, 10) : 999);

                return {
                    id: s.uuid || s.id,
                    name: toString(sf.name || s.name || '', locale).trim(),
                    image: getImageUrl(resolveImage(sf.image || s.image)),
                    position: posName,
                    degree: toString(sf['academic-degree'] || sf.academicDegree || sf.degree, locale),
                    email: toString(sf.email || sf.email_address, locale),
                    phone: formatPhone(sf.phone || sf.phone_number),
                    slug: s.slug || sf.slug || transliterateSlugify(toString(sf.name || s.name, locale)),
                    order: order
                };
            }).sort((a: any, b: any) => (a.order || 999) - (b.order || 999));
        } catch (staffErr) {
            console.warn("Error fetching academic staff for department:", staffErr);
        }

        // Safe staff content (only if it's a string, to avoid rendering objects)
        const getSafeContent = (val: any): string | undefined => {
            return typeof val === 'string' ? val : undefined;
        };

        return {
            id: departmentId,
            name: name,
            phone: fields.phone || fields.phone_number,
            email: fields.email,
            headName: fields.head_name || fields.manager || fields.dean || fields.leader,
            slug: ensureSlug(name, entry.slug || fields.slug),
            facultyId: facultyId,
            image: getImageUrl(resolveImage(fields.image)),
            description: fields.description || fields.content,
            content: fields.content || '',
            gallery: Array.isArray(fields.gallery) ? fields.gallery.map((img: any) => getImageUrl(resolveImage(img))) : [],
            directions: fields.directions || fields.yo_nalishlar || fields['directions-and-specializations'] || fields.yonalishlar,
            history: fields.history || fields.tarix || fields.about || fields.history_uz || fields.history_ru || fields.history_en,
            staff: getSafeContent(fields.staff) || getSafeContent(fields.composition) || getSafeContent(fields.kafedra_tarkibi) || getSafeContent(fields.members),
            scientificActivity: fields['scientific-activity'] || fields.scientific_activity || fields.ilmiy_faoliyat || fields.science || fields.research,
            internationalCooperation: fields['international-cooperation'] || fields.international_cooperation || fields.xalqaro_hamkorlik || fields.cooperation,
            headInfo,
            teachers
        };
    } catch (error) {
        console.error("Department fetch error:", error);
        return null;
    }
};
