import apiClient from '../client';
import { Announcement, AnnouncementDetail } from '../../types/announcement.types';

export const getAnnouncements = async (): Promise<Announcement[]> => {
  // TODO: Haqiqiy API so'rovi shu yerda yoziladi
  console.warn("getAnnouncements: http versiyasi hali yozilmagan.");
  return [];
};

export const getAnnouncementBySlug = async (slug: string): Promise<AnnouncementDetail | undefined> => {
  // TODO: Haqiqiy API so'rovi shu yerda yoziladi
  console.warn("getAnnouncementBySlug: http versiyasi hali yozilmagan.");
  return undefined;
};