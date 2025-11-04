import { useState, useEffect } from 'react';
import { getInteractiveServices } from '../api/interactiveServicesApi';
import { Service } from '../types/service';

export const useInteractiveServicesData = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getInteractiveServices();
        setServices(data);
        setError(null);
      } catch (err) {
        setError('Xizmatlarni yuklashda xatolik yuz berdi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};