import { getAnnouncements as apiGetAnnouncements, getAnnouncementBySlug as apiGetAnnouncementBySlug } from '../api/announcementApi';
import { Announcement, AnnouncementDetail } from '../types/announcement';

// Barcha e'lonlar ro'yxatini olish
export const getAnnouncements = (): Promise<Announcement[]> => {
  return apiGetAnnouncements();
};

// Bitta e'lonni 'slug' orqali olish
export const getAnnouncementBySlug = (slug: string): Promise<AnnouncementDetail> => {
  return apiGetAnnouncementBySlug(slug);
};