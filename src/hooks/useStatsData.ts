import { useState, useEffect } from 'react';
import { Stat } from '../types/stat';
import { fetchStats } from '../api/statsApi';

export const useStatsData = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  return { stats, loading, error };
};