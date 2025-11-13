import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnnouncements } from '@/services/announcementService';
import { Announcement } from '@/types/announcement';
import SectionTemplate, { SectionItem } from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const AnnouncementsPage: React.FC = () => {
  const navigate = useNavigate();
  const { setBannerData, setBreadcrumbsData } = useGlobalLayout();
  const [items, setItems] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBannerData({
      title: "E'lonlar",
      subtitle: "Universitetimizdagi eng so'nggi e'lonlar va bildirishnomalar",
      backgroundImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    });
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Axborot xizmati', href: '#' },
      { label: 'E\'lonlar' }
    ]);

    return () => {
      setBannerData(undefined);
      setBreadcrumbsData(undefined);
    };
  }, [setBannerData, setBreadcrumbsData]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const data = await getAnnouncements();

        const sectionItems: SectionItem[] = data.map((announcement: Announcement) => ({
          id: announcement.id.toString(),
          title: announcement.title,
          description: announcement.excerpt || '',
          date: announcement.published_at,
          image: announcement.image_url,
          href: `/announcements/${announcement.slug}`,
          category: 'E\'lon',
          views: announcement.views,
        }));

        setItems(sectionItems);
      } catch (err) {
        setError('E\'lonlarni yuklashda xatolik yuz berdi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleItemClick = useCallback((item: SectionItem) => {
    navigate(item.href);
  }, [navigate]);

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <SectionTemplate
      loading={loading}
      parentTitle="Axborot xizmati"
      sectionTitle="E'lonlar"
      sectionType="announcements"
      items={items}
      totalItems={items.length}
      layoutType="grid"
      itemsPerPage={12}
      showSearch={false}
      showPagination={true}
      showSorting={true}
      onItemClick={handleItemClick}
    />
  );
};

export default AnnouncementsPage;