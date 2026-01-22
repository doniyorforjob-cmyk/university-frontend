import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';
import { ContentBlock } from '@/components/shared/ContentBuilder';

export interface CouncilData {
    title: string;
    slug?: string;
    content?: string;
    contentBlocks?: ContentBlock[];
    heroImage?: string;
}

export const getUniversityCouncilData = async (locale: string = 'uz'): Promise<CouncilData | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        const response = await apiClient.get(`/projects/${projectId}/content/board-of-trustees`, {
            params: { locale }
        });

        // Handle both response formats: direct array or wrapped in data object
        let items = [];
        if (Array.isArray(response.data)) {
            items = response.data;
        } else if (response.data?.success && response.data?.data) {
            items = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
        } else if (response.data?.data) {
            items = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
        } else {
            return null;
        }

        const item = items[0];

        if (!item) {
            return null;
        }

        // Extract from fields property (CMS structure)
        const fields = item.fields || item;

        // Extract fields with multi-language support
        const title = fields.title?.[locale] || fields.title?.uz || fields.title || '';
        const content = fields.content?.[locale] || fields.content?.uz || fields.content || '';
        const slug = fields.slug || item.slug;
        const imageArray = fields.image;
        const image = Array.isArray(imageArray) ? imageArray[0]?.url : (imageArray?.url || imageArray);

        // If no title and no content, return null to show empty state
        if (!title && !content) {
            return null;
        }

        // Build content blocks
        const contentBlocks: ContentBlock[] = [];

        if (content) {
            contentBlocks.push({
                id: `content-${Date.now()}`,
                type: 'rich-text',
                data: { content }
            });
        }

        return {
            title,
            slug,
            content,
            contentBlocks: contentBlocks.length > 0 ? contentBlocks : undefined,
            heroImage: image ? getImageUrl(image) : undefined
        };

    } catch (error) {
        console.error('Error fetching university council data:', error);
        return null;
    }
};
