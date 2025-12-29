import { useState, useEffect } from 'react';
import { getPosts } from '../services/postService';
import { Post, PostCategory } from '../types/post.types';
import { useLocale } from '../contexts/LocaleContext';

export const useNewsData = (category: PostCategory) => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getPosts(category);
        setData(result);
      } catch (err) {
        setError('Ma\'lumotlarni yuklashda xatolik yuz berdi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, locale]);

  return { data, loading, error };
};