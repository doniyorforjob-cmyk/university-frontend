import React, { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAnnouncements } from '@/services/announcementService';
import { Announcement } from '@/types/announcement.types';
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
  const location = useLocation();
  const { t } = useTranslation(['common', 'pages']);

  // URL dan to'g'ridan-to'g'ri locale ni olish (i18n.language emas!)
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const urlLocale = ['uz', 'en', 'ru'].includes(pathSegments[0]) ? pathSegments[0] : 'uz';

  const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();
  const { data: items, loading, error } = useStandardPage(
    'announcements',
    fetchAnnouncementsData
  );

  useEffect(() => {
    setBreadcrumbsData([
      { label: t('home'), href: '/' },
      { label: t('pages:infoService'), href: '#' },
      { label: t('pages:announcements') }
    ]);

    setSidebarType('info');

    return () => {
      setBreadcrumbsData(undefined);
      setSidebarType(undefined);
    };
  }, [setBreadcrumbsData, setSidebarType, t]);


  const handleItemClick = useCallback((item: SectionItem) => {
    // URL dan olingan locale bilan navigatsiya qilish
    const targetPath = urlLocale === 'uz' ? item.href : `/${urlLocale}${item.href}`;
    navigate(targetPath);
  }, [navigate, urlLocale]);

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
      parentTitle={t('pages:infoService')}
      sectionTitle={t('pages:announcements')}
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