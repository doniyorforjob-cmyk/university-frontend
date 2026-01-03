import { HomeUniversitySystemsData } from '../../../types/home.types';

// Type for the data after transformation, ready for the component
export interface TransformedUniversitySystemsData {
  title: string;
  subtitle: string;
  systems: {
    id: number;
    title: string;
    description: string;
    href: string;
    icon: string; // e.g., 'BookOpen', 'Users' or SVG string
    color: string; // e.g., 'bg-blue-500'
    createdAt: string;
  }[];
  quickLinks: {
    id: number;
    title: string;
    href: string;
  }[];
}

export const transformUniversitySystemsData = (
  systemsData: any,
  quickLinksData: any = []
): TransformedUniversitySystemsData => {
  // Helper to process items
  const processItems = (data: any) => {
    const rawItems = Array.isArray(data)
      ? data
      : (Array.isArray(data?.data) ? data.data : (data?.data ? [data.data] : []));

    return rawItems.map((item: any) => {
      const fields = item.fields || {};

      // Icon can be an SVG string or a key name.
      let iconValue = fields.icon || item.icon || 'BookOpen';
      if (typeof iconValue === 'object') {
        iconValue = iconValue.url || iconValue.path || 'BookOpen';
      }

      return {
        id: item.uuid || item.id || Math.random(),
        title: fields.title || item.title || '',
        description: fields.description || item.description || '',
        href: fields.url || fields.href || item.url || '#',
        icon: iconValue,
        color: fields.color || item.color || 'bg-blue-600',
        createdAt: item.created_at || item.createdAt || new Date().toISOString()
      };
    }).sort((a: any, b: any) => {
      // Sort: Newest First (Descending)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  const systems = processItems(systemsData);
  const quickLinks = processItems(quickLinksData);

  return {
    title: 'Universitet Tizimlari',
    subtitle: 'Barcha ta\'lim tizimlari',
    systems: systems,
    quickLinks: quickLinks
  };
};
