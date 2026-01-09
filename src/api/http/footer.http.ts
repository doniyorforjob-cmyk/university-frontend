import apiClient from '../client';
import { FooterData } from '../../types/footer.types';

export const fetchFooterData = async (locale?: string): Promise<FooterData> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/footer`, { params: { locale } });

    // ElmaPi returns an array or object wrapping the data
    const apiData = Array.isArray(response.data) ? response.data[0] : (response.data.data?.[0] || response.data);
    const fields = apiData?.fields || {};

    // copyright text
    const copyrightText = fields.copyright || '© 2025 Namangan Davlat Texnika Universiteti. Barcha huquqlar himoyalangan.';

    // Parse JSON links (ElmaPi might return it as a string in an array)
    let rawLinks = [];
    try {
      // JSON field in ElmaPi can return as a string inside an array or as a string/object
      const linksData = fields.links;
      let linksStr = Array.isArray(linksData) ? linksData[0] : linksData;

      if (typeof linksStr === 'string' && linksStr.trim().startsWith('[')) {
        rawLinks = JSON.parse(linksStr);
      } else if (Array.isArray(linksStr)) {
        rawLinks = linksStr;
      }
    } catch (e) {
      console.warn('Failed to parse footer links JSON:', e);
    }

    // Group links by category
    const categories: Record<string, any[]> = {};
    if (Array.isArray(rawLinks)) {
      rawLinks.forEach((link: any) => {
        const cat = link.category || 'Useful Links';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push({
          id: link.id || Math.random().toString(),
          text: link.text || '',
          url: link.url || '#'
        });
      });
    }

    const linkGroups = Object.keys(categories).map(catName => ({
      id: catName.toLowerCase().replace(/\s+/g, '-'),
      title: catName,
      links: categories[catName]
    }));

    // Return extended object (FooterData + copyright)
    return {
      contactInfo: {
        address: { text: '', url: '' },
        phone: { number: '', tel: '' },
        email: { address: '', mailto: '' }
      },
      socialLinks: [],
      linkGroups,
      copyright: copyrightText
    } as any;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    throw error;
  }
};