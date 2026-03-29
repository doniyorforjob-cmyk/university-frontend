export type PopupItemType = 
  | 'news' 
  | 'announcements' 
  | 'open-lessons' 
  | 'events' 
  | 'step-forward' 
  | 'green-university' 
  | 'cultural-events' 
  | 'sports-club-life';

export interface PopupItem {
  id: string;
  slug: string;
  title: string;
  type: PopupItemType;
  image_url: string;
  published_at: string;
  description?: string;
  showpopup: boolean;
}
