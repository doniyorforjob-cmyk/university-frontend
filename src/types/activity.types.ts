
import { ContentBlock } from '@/components/shared/ContentBuilder';

/**
 * Faoliyat turi
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

export interface ActivitiesApi {
    fetchActivitiesData(): Promise<ContentBlock[]>;
}
