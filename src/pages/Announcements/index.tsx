import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnnouncements } from '@/services/announcementService';
import { Announcement } from '@/types/announcement';
import SectionTemplate, { SectionItem } from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';

// E'lonlar ma'lumotlarini olish funksiyasi
const fetchAnnouncementsData = async (): Promise<SectionItem[]> => {
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

  return sectionItems;
};

const AnnouncementsPage: React.FC = () => {
  const navigate = useNavigate();
  const { setBannerData, setBreadcrumbsData } = useGlobalLayout();
  const { data: items, loading, error, refetch } = useStandardPage(
    'announcements',
    fetchAnnouncementsData
  );

  useEffect(() => {
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Axborot xizmati', href: '#' },
      { label: 'E\'lonlar' }
    ]);

    return () => {
      setBreadcrumbsData(undefined);
    };
  }, [setBreadcrumbsData]);


  const handleItemClick = useCallback((item: SectionItem) => {
    navigate(item.href);
  }, [navigate]);

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error?.message || 'Ma\'lumot topilmadi'}</p>
      </div>
    );
  }

  return (
    <SectionTemplate
      loading={loading}
      parentTitle="Axborot xizmati"
      sectionTitle="E'lonlar"
      sectionType="announcements"
      items={items || []}
      totalItems={(items || []).length}
      layoutType="horizontal"
      itemsPerPage={12}
      showSearch={false}
      showPagination={true}
      showSorting={true}
      onItemClick={handleItemClick}
    />
  );
};

export default AnnouncementsPage;