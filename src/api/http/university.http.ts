import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';
import { ContentBlock } from '@/components/shared/ContentBuilder';

export const getUniversityContent = async (locale?: string): Promise<ContentBlock[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/university`, {
            params: { locale }
        });

        console.log('=== UNIVERSITY API DEBUG ===');
        console.log('Full response:', response);
        console.log('Response data:', response.data);
        console.log('Is array?', Array.isArray(response.data));

        let data;
        if (Array.isArray(response.data)) {
            data = response.data[0];
            console.log('Extracted from array:', data);
        } else if (response.data?.data && Array.isArray(response.data.data)) {
            data = response.data.data[0];
            console.log('Extracted from data.data array:', data);
        } else {
            data = response.data?.data || response.data;
            console.log('Extracted as object:', data);
        }

        if (!data) {
            console.error('No data found in response!');
            throw new Error(`University API returned empty data. Status: ${response.status}`);
        }

        const fields = data.fields || {};
        console.log('Fields:', fields);
        console.log('Title:', fields.title);
        console.log('Information:', fields.information?.substring(0, 100));
        console.log('Image field:', fields.image);

        // Extract image URL from array if needed
        const imageUrl = Array.isArray(fields.image) ? fields.image[0]?.url : fields.image;

        const blocks: ContentBlock[] = [];

        // Add image block if exists
        if (imageUrl) {
            blocks.push({
                id: `image-${data.uuid}`,
                type: 'image',
                data: { src: getImageUrl(imageUrl), alt: fields.title || 'University image' }
            });
        }

        // Add text content block
        if (fields.information || fields.content) {
            blocks.push({
                id: `text-${data.uuid}`,
                type: 'rich-text',
                data: { content: fields.information || fields.content || '' }
            });
        }

        return blocks;
    } catch (error) {
        console.error("Error fetching university content:", error);
        // Return default content blocks
        return [{
            id: 'default-text',
            type: 'rich-text',
            data: { content: '<p>Universitet haqida ma\'lumot yuklanmoqda...</p>' }
        }];
    }
};
