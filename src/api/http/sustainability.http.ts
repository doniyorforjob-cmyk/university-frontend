import apiClient from '../client';
import { ContentBlock } from '@/components/shared/ContentBuilder';
import { getImageUrl } from '../../utils/apiUtils';

export interface SustainabilityEntry {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    contentBlocks?: ContentBlock[];
}

const unescapeHtml = (html: string) => {
    if (!html) return '';
    return html
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ');
};

export const fetchSustainabilityData = async (locale?: string): Promise<SustainabilityEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/sustainability`, {
            params: {
                locale,
                order_by: 'sort_order',
                order_direction: 'asc'
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;
        if (!Array.isArray(data) || data.length === 0) return null;

        // The first entry provides main page info
        const mainEntry = data[0];
        const mainFields = mainEntry.fields || mainEntry || {};

        // Transform ALL entries into blocks
        const contentBlocks: ContentBlock[] = data.map((entry: any) => {
            const f = entry.fields || entry || {};
            const type = f.type || 'rich-text';

            // Basic unescaping for rich-text if it looks like it's encoded
            let content = f.content || '';
            if (typeof content === 'string' && content.includes('&lt;')) {
                content = unescapeHtml(content);
            }

            return {
                id: entry.uuid || entry.id,
                type: type,
                data: {
                    title: f.title,
                    content: content,
                    ...f.data
                }
            };
        });

        // Add main image if exists
        if (mainFields.image) {
            const imageUrl = Array.isArray(mainFields.image) ? mainFields.image[0]?.url : mainFields.image;
            if (imageUrl) {
                contentBlocks.unshift({
                    id: `main-image-${mainEntry.uuid || mainEntry.id}`,
                    type: 'image',
                    data: { src: getImageUrl(imageUrl), alt: mainFields.title || 'Sustainability' }
                });
            }
        }

        return {
            id: mainEntry.uuid || mainEntry.id,
            slug: mainFields.slug || mainEntry.slug || '',
            title: mainFields.title || '',
            description: mainFields.description || '',
            content: '', // No longer used directly
            contentBlocks
        };
    } catch (error) {
        console.error("Sustainability fetch error:", error);
        return null;
    }
};
