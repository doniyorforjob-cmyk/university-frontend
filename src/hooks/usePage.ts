import { useState, useEffect } from 'react';

interface UsePageOptions<T> {
  fetchData: () => Promise<T>;
  initialDelay?: number;
}

interface UsePageReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Sahifalar uchun umumiy hook
 */
export function usePage<T>({ fetchData, initialDelay = 100 }: UsePageOptions<T>): UsePageReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchData();
      setData(result);
    } catch (err) {
      setError('Ma\'lumotlarni yuklashda xatolik yuz berdi');
      console.error('Error fetching page data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refetch = () => {
    loadData();
  };

  return {
    data,
    loading,
    error,
    refetch
  };
}

export default usePage;
