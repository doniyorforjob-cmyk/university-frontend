import { getAnnouncements as mockGetAnnouncements, getAnnouncementBySlug as mockGetAnnouncementBySlug } from '../api/mock/announcement.mock';
import { getAnnouncements as httpGetAnnouncements, getAnnouncementBySlug as httpGetAnnouncementBySlug } from '../api/http/announcement.http';
import { Announcement, AnnouncementDetail } from '../types/announcement.types';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const getAnnouncements = useMock ? mockGetAnnouncements : httpGetAnnouncements;
export const getAnnouncementBySlug = useMock ? mockGetAnnouncementBySlug : httpGetAnnouncementBySlug;