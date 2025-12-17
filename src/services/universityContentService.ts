import { fetchUniversityContentBlocks as mockFetchUniversityContentBlocks } from '../api/mock/universityContent.mock';
import { fetchUniversityContentBlocks as httpFetchUniversityContentBlocks } from '../api/http/universityContent.http';
import { ContentBlock } from '@/components/shared/ContentBuilder';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const fetchUniversityContentBlocks = useMock ? mockFetchUniversityContentBlocks : httpFetchUniversityContentBlocks;