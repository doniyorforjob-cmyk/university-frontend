import apiClient from '../client';
import { ContentBlock } from '@/components/shared/ContentBuilder';

export interface SustainabilityDetailEntry {
    id: string;
    slug: string;
    parent_slug: string;
    level: number;
    title: string;
    description: string;
    contentBlocks: ContentBlock[];
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

export const getSustainabilityDetailBySlug = async (slug: string, locale?: string): Promise<SustainabilityDetailEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/sustainabilitydetail`, {
            params: {
                locale,
                'filter[slug][eq]': slug
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;
        let entry = (data || []).find((e: any) => (e.fields?.slug || e.slug) === slug);

        // Fallback: If not found in current locale, try to find it in other locales to get the correct UUID
        if (!entry) {
            const allLocales = ['uz', 'ru', 'en'];
            const otherLocales = allLocales.filter(l => l !== locale);

            for (const otherLocale of otherLocales) {
                const fallbackRes = await apiClient.get(`/projects/${projectId}/content/sustainabilitydetail`, {
                    params: {
                        locale: otherLocale,
                        'filter[slug][eq]': slug
                    }
                });
                const fallbackData = Array.isArray(fallbackRes.data) ? fallbackRes.data : fallbackRes.data.data;
                const foundEntry = (fallbackData || []).find((e: any) => (e.fields?.slug || e.slug) === slug);

                if (foundEntry) {
                    // Found the entry in another language, now fetch its version in the target locale by ID
                    const entryId = foundEntry.uuid || foundEntry.id;
                    const finalRes = await apiClient.get(`/projects/${projectId}/content/sustainabilitydetail`, {
                        params: {
                            locale,
                            'filter[id][eq]': entryId
                        }
                    });
                    const finalData = Array.isArray(finalRes.data) ? finalRes.data : finalRes.data.data;
                    entry = (finalData || []).find((e: any) => (e.uuid || e.id) === entryId);

                    if (entry) break;
                }
            }
        }

        if (!entry) return null;
        const fields = entry.fields || entry || {};

        // Parse content field (which is expected to be a JSON string of blocks or raw HTML)
        let blocks: ContentBlock[] = [];
        try {
            if (fields.content) {
                const parsed = typeof fields.content === 'string' ? JSON.parse(fields.content) : fields.content;
                if (Array.isArray(parsed)) {
                    blocks = parsed.map((b: any) => ({
                        id: b.id || Math.random().toString(36).substr(2, 9),
                        type: b.type || 'rich-text',
                        data: {
                            ...b.data,
                            content: typeof b.data?.content === 'string' ? unescapeHtml(b.data.content) : b.data?.content
                        }
                    }));
                } else {
                    // Fallback to rich-text if it's just a string
                    blocks = [{
                        id: entry.uuid || entry.id,
                        type: 'rich-text',
                        data: { content: unescapeHtml(fields.content) }
                    }];
                }
            }
        } catch (e) {
            // If JSON parse fails, treat as rich-text
            blocks = [{
                id: entry.uuid || entry.id,
                type: 'rich-text',
                data: { content: unescapeHtml(fields.content) }
            }];
        }

        return {
            id: entry.uuid || entry.id,
            slug: fields.slug || '',
            parent_slug: fields.parent_slug || '',
            level: Number(fields.level) || 1,
            title: fields.title || '',
            description: fields.description || '',
            contentBlocks: blocks
        };
    } catch (error) {
        console.error("SustainabilityDetail fetch error:", error);
        return null;
    }
};
