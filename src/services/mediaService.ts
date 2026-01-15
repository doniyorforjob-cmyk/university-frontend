import { getMediaArticles as mockGetMediaArticles, getMediaArticleBySlug as mockGetMediaArticleBySlug } from '../api/mock/media.mock';
import { getMediaArticles as httpGetMediaArticles, getMediaArticleBySlug as httpGetMediaArticleBySlug } from '../api/http/media.http';
import { MediaArticle } from '../types/media.types';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const getMediaArticles = useMock ? mockGetMediaArticles : httpGetMediaArticles;
export const getMediaArticleBySlug = useMock ? mockGetMediaArticleBySlug : httpGetMediaArticleBySlug;