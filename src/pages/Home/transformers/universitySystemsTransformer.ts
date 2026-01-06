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
  // If systemsData contains both systems and quickLinks (new combined API response shape)
  const systemsRaw = (systemsData?.systems !== undefined) ? systemsData.systems : systemsData;
  const quickLinksRaw = (systemsData?.quickLinks !== undefined) ? systemsData.quickLinks : quickLinksData;

  // Combine all raw data sources into one pool
  const rawSystems = Array.isArray(systemsRaw) ? systemsRaw : (systemsRaw?.data || []);
  const rawQuickLinks = Array.isArray(quickLinksRaw) ? quickLinksRaw : (quickLinksRaw?.data || []);

  const allRawItems = [...rawSystems, ...rawQuickLinks];

  // Helper to extract category string from various formats
  const extractCategory = (cat: any): string => {
    if (!cat) return '';
    if (typeof cat === 'string') return cat;
    if (Array.isArray(cat)) return extractCategory(cat[0]);
    if (typeof cat === 'object' && cat !== null) return cat.name || cat.title || cat.slug || cat.value || '';
    return String(cat || '');
  };

  // Process all items
  const processedItems = allRawItems.map((item: any) => {
    const fields = item.fields || {};

    // Icon handling
    let iconValue = fields.icon || item.icon || 'BookOpen';
    if (typeof iconValue === 'object' && iconValue !== null) {
      iconValue = iconValue.url || iconValue.path || 'BookOpen';
    }

    // Category handling
    const rawCat = fields.category || item.category || fields.tag || item.tag || '';
    const normalizedCat = extractCategory(rawCat).toLowerCase().replace(/\s+/g, '').trim();

    return {
      id: String(item.uuid || item.id || Math.random()),
      title: fields.title || item.title || '',
      description: fields.description || item.description || '',
      href: fields.url || fields.href || item.url || '#',
      icon: iconValue,
      color: fields.color || item.color || 'bg-blue-600',
      category: normalizedCat,
      createdAt: item.created_at || item.createdAt || new Date().toISOString()
    };
  });

  // Separate by category
  // 1. Deduplicate by string ID, Normalized Title, and Normalized URL
  const uniqueItemsMap = new Map();
  processedItems.forEach(item => {
    // Keys to identify duplicates
    // Normalize title: remove all non-alphanumeric, lowercase, fuzzy c/k
    const titleKey = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/c/g, 'k').trim();

    // Normalize URL: remove protocol, www, and trailing slash
    const urlKey = item.href.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '')
      .trim();

    const existing = uniqueItemsMap.get(titleKey) ||
      uniqueItemsMap.get(urlKey) ||
      uniqueItemsMap.get(item.id);

    if (existing) {
      // Keep the "richer" item (one that has a description or better category)
      const currentValue = (item.description?.length || 0) + (item.category ? 20 : 0);
      const existingValue = (existing.description?.length || 0) + (existing.category ? 20 : 0);

      if (currentValue > existingValue) {
        uniqueItemsMap.set(titleKey, item);
        uniqueItemsMap.set(urlKey, item);
        uniqueItemsMap.set(item.id, item);
      }
    } else {
      uniqueItemsMap.set(titleKey, item);
      uniqueItemsMap.set(urlKey, item);
      uniqueItemsMap.set(item.id, item);
    }
  });

  // Convert map values to unique list (using Set for reference equality check)
  const uniqueItems = Array.from(new Set(uniqueItemsMap.values()));

  // 2. STRICT CATEGORIZATION LOGIC
  const quickLinksPool: any[] = [];
  const systemsPool: any[] = [];

  uniqueItems.forEach(item => {
    const isExplicitQuickLink = item.category.includes('quicklink') ||
      item.category.includes('havola') ||
      item.category === 'ql';

    const isExplicitSystem = item.category === 'system' ||
      item.category === 'systems';

    // Decide where it goes (Exclusive)
    if (isExplicitQuickLink) {
      quickLinksPool.push(item);
    } else if (isExplicitSystem) {
      systemsPool.push(item);
    } else {
      // Fallback: Decide based on content
      // Links usually don't have descriptions
      if (!item.description || item.description.length < 5) {
        quickLinksPool.push(item);
      } else {
        systemsPool.push(item);
      }
    }
  });

  const systems = systemsPool.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const quickLinks = quickLinksPool.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


  return {
    title: 'Universitet Tizimlari',
    subtitle: 'Barcha ta\'lim tizimlari',
    systems: systems,
    quickLinks: quickLinks
  };
};
