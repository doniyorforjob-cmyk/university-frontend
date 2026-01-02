import { getOpenLessons as mockGetOpenLessons, getOpenLessonBySlug as mockGetOpenLessonBySlug } from '../api/mock/open-lesson.mock';
import { getOpenLessons as httpGetOpenLessons, getOpenLessonBySlug as httpGetOpenLessonBySlug } from '../api/http/open-lesson.http';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

export const getOpenLessons = useMock ? mockGetOpenLessons : httpGetOpenLessons;
export const getOpenLessonBySlug = useMock ? mockGetOpenLessonBySlug : httpGetOpenLessonBySlug;
