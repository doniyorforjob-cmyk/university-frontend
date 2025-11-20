import { HomeNewsData } from '../../../api/homeApi';

export const transformNewsData = (apiData: any): HomeNewsData => {
  const data = apiData.news || apiData.data || apiData;

  return {
    news: (data.news || []).map((item: any) => ({
      id: item.id || item.slug || Math.random(),
      title: item.title || item.name || '',
      description: item.description || item.content || item.excerpt || '',
      image_url: item.image_url || item.image || item.thumbnail || '',
      published_at: item.published_at || item.date || item.created_at || new Date().toISOString(),
      slug: item.slug || item.id || ''
    })),
    announcements: (data.announcements || []).map((item: any) => ({
      id: item.id || Math.random(),
      text: item.text || item.title || '',
      description: item.description || item.content || '',
      date: item.date || item.published_at || new Date().toISOString().split('T')[0]
    })),
    events: (data.events || []).map((item: any) => ({
      id: item.id || Math.random(),
      title: item.title || item.name || '',
      description: item.description || item.content || '',
      date: item.date || item.event_date || new Date().toISOString().split('T')[0]
    })),
    corruption: (data.corruption || []).map((item: any) => ({
      id: item.id || Math.random(),
      title: item.title || item.name || '',
      description: item.description || item.content || '',
      date: item.date || item.published_at || new Date().toISOString().split('T')[0]
    })),
    sport: (data.sport || []).map((item: any) => ({
      id: item.id || Math.random(),
      title: item.title || item.name || '',
      description: item.description || item.content || '',
      date: item.date || item.event_date || new Date().toISOString().split('T')[0]
    }))
  };
};