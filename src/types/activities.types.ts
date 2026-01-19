export interface ActivityIconMap {
  [key: string]: {
    svg: string;
    label: string;
    description?: string;
  };
}

export interface ActivityPageData {
  id: string;
  title: string;
  content: string;
  categories: string[]; // e.g. ["O'quv", "Ilmiy"]
  icons_json: ActivityIconMap;
}

/**
 * Faoliyat turi (Old legacy structure, keep if needed by other components for now)
 */
export interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'scientific' | 'educational' | 'social' | 'cultural' | 'sports' | 'partnership' | 'administrative' | 'international';
  date?: string;
  imageUrl?: string;
  status?: 'completed' | 'ongoing' | 'upcoming';
  impact?: string;
  participants?: string;
}