import apiClient from '../client';
import { Leadership } from '../../types/leadership.types';
import { getImageUrl, getLocalized } from '../../utils/apiUtils';

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

const getStableSlug = (positionName: string, id: string): string => {
    const normalized = positionName.toLowerCase().trim();

    // 1. Check specific vice-rector positions first
    for (const [key, value] of Object.entries(LEADERSHIP_SLUG_MAP)) {
        if (normalized.includes(key)) return value;
    }

    // 2. Handle Rector separately to avoid substring collision with 'prorektor'
    if (normalized.includes('rektor') || normalized.includes('rector')) {
        if (!normalized.includes('prorektor') && !normalized.includes('vice')) {
            return 'rektor';
        }
    }

    // 3. Fallback to generic prorektor if it contains 'prorektor' but no specific sub-type matched
    if (normalized.includes('prorektor') || normalized.includes('vice-rector')) {
        return `prorektor-${id.slice(0, 4)}`;
    }

    // 4. Ultimate fallback to ID
    return id;
};

const transformMember = (entry: any, isMain: boolean, locale: string = 'uz'): Leadership => {
    const fields = entry.fields || {};

    // Localization logic for positions
    const rawPosition = fields.positions?.fields?.name ||
        fields.positions?.name ||
        (Array.isArray(fields.positions) ? fields.positions[0]?.fields?.name : null) ||
        fields.position ||
        (isMain ? { uz: "Universitet rektori", ru: "Ректор университета", en: "Rector of University" } : { uz: "Prorektor", ru: "Проректор", en: "Vice-Rector" });

    const position = getLocalized(rawPosition, locale);

    // Extract languages and levels
    let languages: any[] = [];
    if (fields.languages && Array.isArray(fields.languages)) {
        languages = fields.languages.map((l: any) => ({
            name: l.name || l.title || '',
            level: parseInt(l.percentage || l.level || '0', 10)
        }));
    } else if (fields.ozbek_tili || fields.uzbek_language) {
        // Fallback for manual fields if exists
        languages.push({ name: 'Uzbek', level: parseInt(fields.ozbek_tili || '100', 10) });
        if (fields.rus_tili) languages.push({ name: 'Russian', level: parseInt(fields.rus_tili || '90', 10) });
        if (fields.ingliz_tili) languages.push({ name: 'English', level: parseInt(fields.ingliz_tili || '80', 10) });
    }

    const id = entry.uuid || entry.id;
    const stableSlug = isMain ? 'rektor' : getStableSlug(position, id);

    return {
        id: id,
        slug: stableSlug,
        name: (fields.name || entry.name || '').trim(),
        position: position,
        degree: fields.degree || fields.ilmiy_daraja || '',
        birth_date: fields.birth_date || fields.tugilgan_sana || '',
        phone: formatPhone(fields.phone || entry.phone),
        email: fields.email || entry.email,
        image: getImageUrl(resolveImage(fields.image || entry.image)),
        biography: fields.biography || fields.biografiya || '',
        career: fields['work-experience'] || fields.work_experience || fields.career || fields.mehnat_faoliyati,
        description: fields.responsibilities || fields.description || fields.vazifalari,
        scopus_id: fields.scopus_id || '',
        scopus_stats: {
            articles: parseInt(fields.scopus_articles || fields.articles_count || '0', 10),
            citations: parseInt(fields.scopus_citations || fields.citations_count || '0', 10)
        },
        google_scholar_id: fields.google_scholar_id || '',
        languages: languages,
        isMain: isMain
    };
};

export const getLeadershipApi = async (locale: string = 'uz'): Promise<Leadership[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        const [rectorRes, viceRectorsRes] = await Promise.all([
            apiClient.get(`/projects/${projectId}/content/rector-university`, {
                params: {
                    locale,
                    with: 'image,positions,languages' // Ensure relations are fetched
                }
            }),
            apiClient.get(`/projects/${projectId}/content/vice-rectors`, {
                params: {
                    locale,
                    with: 'image,positions,languages'
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
        const activeViceRectors = viceRectors.filter(v => v.name !== '');

        return [...activeRector, ...activeViceRectors];
    } catch (error) {
        console.error('Error fetching leadership:', error);
        return [];
    }
};

export const getLeadershipBySlug = async (slug: string, locale?: string): Promise<Leadership | null> => {
    try {
        const { getCentersHeadsApi } = await import('./centers.http');
        const { getAdministrativeHeadsApi } = await import('./department.http');
        const { getDepartments } = await import('./faculties.http');

        const [leadershipMembers, centerHeads, adminHeads, allDepts] = await Promise.all([
            getLeadershipApi(locale),
            getCentersHeadsApi(locale),
            getAdministrativeHeadsApi(locale),
            getDepartments(locale)
        ]);

        // Transform academic heads from departments data
        const academicHeads = allDepts
            .filter(d => d.headInfo)
            .map(d => ({
                ...d.headInfo!,
                slug: d.slug // Use department slug for linking if needed, or stick to profile slug
            }));

        const allMembers = [...leadershipMembers, ...centerHeads, ...adminHeads, ...academicHeads];

        // AGGRESSIVELY CLEAN THE INCOMING SLUG TOO
        const cleanIncomingSlug = slug
            .replace(/^\/?(uz|ru|en)\//, '')
            .replace(/^\/?leadership\//, '')
            .replace(/^\/?centers\//, '')
            .replace(/^\//, '')
            .toLowerCase()
            .trim();

        if (cleanIncomingSlug === 'rector' || cleanIncomingSlug === 'rektor') {
            return leadershipMembers.find(m => m.isMain) || leadershipMembers[0] || null;
        }

        const member = allMembers.find(m => {
            const memberSlug = (m.slug || '').toLowerCase().trim();
            const memberId = (String(m.id) || '').toLowerCase().trim();
            return memberSlug === cleanIncomingSlug || memberId === cleanIncomingSlug;
        });

        return member || null;
    } catch (error) {
        console.error('Error fetching leadership member by slug:', error);
        return null;
    }
};
