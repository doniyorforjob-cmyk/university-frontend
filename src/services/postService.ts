import { getPosts as httpGetPosts, getPostBySlug as httpGetPostBySlug } from '../api/http/posts.http';

// Directly export HTTP implementations, removing mock complexity
export const getPosts = httpGetPosts;
export const getPostBySlug = httpGetPostBySlug;
