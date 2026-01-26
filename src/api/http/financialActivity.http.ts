import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface ActivityFile {
    name: string;
    url: string;
    size?: number;
    ext?: string;
}

export interface ActivityEntry {
    id: string;
    slug: string;
    title: string;
    files: ActivityFile[];
    date?: string;
    year?: string;
}

export const fetchFinancialActivities = async (locale?: string): Promise<ActivityEntry[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/financial-activity`, {
            params: {
                locale,
                with: 'files'
            }
        });

        const rawData = Array.isArray(response.data) ? response.data : response.data.data;
        if (!Array.isArray(rawData)) return [];

        return rawData.map((entry: any) => {
            const fields = entry.fields || entry || {};

            // 1. Try explicit 'date' field or various 'created' timestamps
            let rawDate = fields.date ||
                fields.Created || entry.Created ||
                fields.created_at || entry.created_at ||
                fields.createdAt || entry.createdAt ||
                entry.published_at;
            let year = '';

            // 2. Try to regex match year from title if date is missing or unreliable
            const yearMatch = fields.title?.match(/\b(20\d{2})\b/);
            if (yearMatch) {
                year = yearMatch[1];
            } else if (rawDate) {
                // Only use date if it actually looks like a date/year
                const d = new Date(rawDate);
                if (!isNaN(d.getTime())) {
                    year = d.getFullYear().toString();
                }
            }

            return {
                id: entry.uuid || entry.id,
                slug: fields.slug || entry.slug || '',
                title: fields.title || '',
                date: rawDate,
                year: year || 'Other',
                files: (fields.files || []).map((file: any) => ({
                    name: file.name || file.title || file.filename || 'Hujjat',
                    url: getImageUrl(file.url || file.path || ''),
                    size: file.size,
                    ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
                }))
            };
        }).sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
        });
    } catch (error) {
        console.error('Error fetching financial activities:', error);
        return [];
    }
};
