import { getPosts as mockGetPosts, getPostBySlug as mockGetPostBySlug } from '../api/mock/posts.mock';
import { getPosts as httpGetPosts, getPostBySlug as httpGetPostBySlug } from '../api/http/posts.http';
import { Post, PostDetail } from '../types/post.types';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Svitcher: env ga qarab mock yoki http API ni tanlash
export const getPosts = useMock ? mockGetPosts : httpGetPosts;
export const getPostBySlug = useMock ? mockGetPostBySlug : httpGetPostBySlug;
