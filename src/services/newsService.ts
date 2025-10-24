import { getNews as apiGetNews, getNewsBySlug as apiGetNewsBySlug } from '../api/newsApi';
import { NewsArticle, NewsArticleDetail } from '../types/news'; // <-- Qaytadan qo'shildi

// Barcha yangiliklar ro'yxatini olish
export const getNews = (): Promise<NewsArticle[]> => {
  return apiGetNews();
};

// Bitta yangilikni 'slug' orqali olish
export const getNewsBySlug = (slug: string): Promise<NewsArticleDetail> => {
  return apiGetNewsBySlug(slug);
};