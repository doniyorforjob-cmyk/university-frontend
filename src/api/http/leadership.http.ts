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

export const getLeadershipApi = async (locale?: string): Promise<Leadership[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        // Fetch Rector and Vice-Rectors in parallel
        // We include 'positions' relation which carries localized names
        const [rectorRes, viceRectorsRes] = await Promise.all([
            apiClient.get(`/projects/${projectId}/content/rector-university`, {
                params: {
                    locale,
                    with: 'image,positions'
                }
            }),
            apiClient.get(`/projects/${projectId}/content/vice-rectors`, {
                params: {
                    locale,
                    with: 'image,positions'
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

        const rector: Leadership[] = rectorRaw.map((entry: any) => {
            const fields = entry.fields || {};

            // Localization logic for positions
            // The position is usually in fields.positions.fields.name (localized by API)
            const position = fields.positions?.fields?.name ||
                fields.positions?.name ||
                (Array.isArray(fields.positions) ? fields.positions[0]?.fields?.name : null) ||
                fields.position ||
                "Universitet rektori";

            return {
                id: entry.uuid || entry.id,
                name: (fields.name || entry.name || '').trim(),
                position: position,
                phone: formatPhone(fields.phone || entry.phone),
                email: fields.email || entry.email,
                image: getImageUrl(resolveImage(fields.image || entry.image)),
                career: fields['work-experience'] || fields.work_experience || fields.career || fields.mehnat_faoliyati,
                description: fields.responsibilities || fields.description || fields.vazifalari,
                isMain: true
            };
        });

        const activeRector = rector.filter(r => r.name !== '');

        const viceRectors: Leadership[] = viceRectorsRaw.map((entry: any) => {
            const fields = entry.fields || {};

            const position = fields.positions?.fields?.name ||
                fields.positions?.name ||
                (Array.isArray(fields.positions) ? fields.positions[0]?.fields?.name : null) ||
                fields.position ||
                "Prorektor";

            return {
                id: entry.uuid || entry.id,
                name: (fields.name || entry.name || '').trim(),
                position: position,
                phone: formatPhone(fields.phone || entry.phone),
                email: fields.email || entry.email,
                image: getImageUrl(resolveImage(fields.image || entry.image)),
                career: fields['work-experience'] || fields.work_experience || fields.career || fields.mehnat_faoliyati,
                description: fields.responsibilities || fields.description || fields.vazifalari,
                isMain: false
            };
        });

        const activeViceRectors = viceRectors.filter(v => v.name !== '');

        // Return both Rector and Vice-rectors now
        return [...activeRector, ...activeViceRectors];
    } catch (error) {
        console.error('Error fetching leadership:', error);
        return [];
    }
};
