import apiClient from '../client';
import { Leadership } from '../../types/leadership.types';
import { getImageUrl } from '../../utils/apiUtils';

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

// SLUG MAPPING FOR CENTERS - MULTI-LANGUAGE
const CENTER_SLUG_MAP: Record<string, string> = {
    // Uzbek
    'raqamli': 'raqamli-talim-markazi',
    'innovatsiya': 'innovatsiyalar-markazi',
    'axborot resurs': 'axborot-resurs-markazi',
    'bandlik': 'karyera-markazi',
    'karyera': 'karyera-markazi',

    // Russian
    'цифр': 'raqamli-talim-markazi',
    'инновац': 'innovatsiyalar-markazi',
    'информ': 'axborot-resurs-markazi',
    'карьер': 'karyera-markazi',

    // English
    'digital': 'raqamli-talim-markazi',
    'innovation': 'innovatsiyalar-markazi',
    'information': 'axborot-resurs-markazi',
    'career': 'karyera-markazi',
};

const getCenterSlug = (centerName: string, id: string): string => {
    const normalized = centerName.toLowerCase().trim();
    for (const [key, value] of Object.entries(CENTER_SLUG_MAP)) {
        if (normalized.includes(key)) return value;
    }
    return id;
};

export const getCentersHeadsApi = async (locale?: string): Promise<Leadership[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        // Fetch Heads of Centers
        const response = await apiClient.get(`/projects/${projectId}/content/heads-of-centers`, {
            params: {
                locale,
                with: 'image,center,position' // center and position are relations
            }
        });

        const normalizeData = (res: any) => {
            if (!res) return [];
            const data = res.data !== undefined ? res.data : res;
            if (Array.isArray(data)) return data;
            return [];
        };

        const rawData = normalizeData(response.data);

        return rawData.map((entry: any) => {
            const fields = entry.fields || {};

            // Determine position name
            const position = fields.position?.fields?.name ||
                fields.position?.name ||
                (Array.isArray(fields.position) ? fields.position[0]?.fields?.name : null) ||
                fields.position_name ||
                "Markaz rahbari";

            // Determine center name
            const centerName = fields.center?.fields?.name ||
                fields.center?.fields?.title ||
                fields.center?.name ||
                fields.center?.title ||
                "";

            const id = entry.uuid || entry.id;
            const slug = getCenterSlug(centerName || position, id);

            return {
                id: id,
                slug: slug,
                name: (fields.name || entry.name || '').trim(),
                position: centerName ? `${position} (${centerName})` : position,
                phone: formatPhone(fields.phone || entry.phone),
                email: fields.email || entry.email,
                image: getImageUrl(resolveImage(fields.image || entry.image)),
                career: fields['work-experience'] || fields.work_experience || fields.career || fields.mehnat_faoliyati,
                description: fields.responsibilities || fields.description || fields.vazifalari,
                isMain: false
            };
        });
    } catch (error) {
        console.error('Error fetching centers heads:', error);
        return [];
    }
};
