import { getPosts as httpGetPosts, getPostBySlug as httpGetPostBySlug } from '../api/http/posts.http';
import { Post, PostDetail } from '../types/post.types';

// Directly export HTTP implementations, removing mock complexity
export const getPosts = httpGetPosts;
export const getPostBySlug = httpGetPostBySlug;
