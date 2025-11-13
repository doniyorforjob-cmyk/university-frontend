import React, { useState, useEffect, useCallback } from 'react';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { fetchUniversityContentBlocks } from '@/api/universityContentApi';
import PageTemplate from '@/components/shared/PageTemplate';
import { ContentBlock } from '@/components/shared/ContentBuilder';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const UniversityPage: React.FC = () => {
  const { setBreadcrumbsData, setBannerData } = useGlobalLayout();
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchUniversityContentBlocks();
      setContentBlocks(data);
    } catch (err) {
      setError('Ma\'lumotlarni yuklashda xatolik yuz berdi');
      console.error('Error fetching university content:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Universitet' }
    ]);

    return () => {
      setBreadcrumbsData(undefined);
    };
  }, [setBreadcrumbsData]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  if (loading) {
    return <GenericPageSkeleton showSidebar={false} showHeroImage={false} contentBlocks={5} />;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const allContentBlocks: ContentBlock[] = [
    {
      id: 'university-image',
      type: 'image',
      data: {
        src: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Universitet'
      }
    },
    {
      id: 'history',
      type: 'heading',
      data: { level: 4, content: '• Boy va qadimiy tarix' }
    },
    {
      id: 'history-text',
      type: 'paragraph',
      data: {
        content: 'Namangan Davlat Texnika Universiteti 2000 yilda muhandislar, texnologlar va texnika sohasida boshqa yuqori malakali kadrlar tayyorlash maqsadida tashkil etilgan. NamDTU Farg\'ona vodiysidagi eng mashhur va yetakchi texnika oliy ta\'lim muassasalaridan biridir. Universitet O\'zbekiston Respublikasining texnika ta\'limi sohasidagi muhim markazlardan biri bo\'lib, 20 yildan ortiq tajribaga ega.'
      }
    },
    {
      id: 'accreditation',
      type: 'heading',
      data: { level: 4, content: '• Xalqaro akkreditatsiya va tan olinish' }
    },
    {
      id: 'accreditation-text',
      type: 'paragraph',
      data: {
        content: 'Namangan Davlat Texnika Universiteti O\'zbekistondagi yetakchi texnika oliy o\'quv yurti hisoblanadi. Texnika oliy ta\'lim muassasalari orasida mintaqada etakchi o\'rinlardan birini egallaydi. Universitetning ko\'plab ta\'lim dasturlari xalqaro standartlarga mos keladi va bitiruvchilar xorijiy kompaniyalarda ham tan olinadi.'
      }
    },
    {
      id: 'programs',
      type: 'heading',
      data: { level: 4, content: '• Ta\'lim dasturlari' }
    },
    {
      id: 'programs-text',
      type: 'paragraph',
      data: {
        content: 'NamDTU ixtisosligi doirasida keng qamrovli ta\'limni taklif qiluvchi ko\'p tarmoqli fakultetlar mavjud: Muhandislik va texnologiya fakulteti, Axborot texnologiyalari va kompyuter muhandisligi, Elektrotexnika va energetika fakulteti, Qurilish va arxitektura fakulteti, Iqtisodiyot va menejment fakulteti, Tayyorgarlik va malaka oshirish fakulteti.'
      }
    },
    {
      id: 'infrastructure',
      type: 'heading',
      data: { level: 4, content: '• Zamonaviy kampus va infratuzilma' }
    },
    {
      id: 'infrastructure-text',
      type: 'paragraph',
      data: {
        content: 'NamDTU bo\'lajak muhandislarni amaliy o\'qitish uchun zarur bo\'lgan eng yangi texnologiyalar va barcha zarur uskunalar bilan jihozlangan zamonaviy laboratoriyalar, texnik markazlar va ishlab chiqarish o\'quv korxonalariga ega. Axborot-resurs markazi mintaqadagi eng zamonaviy texnik kutubxonalardan biri hisoblanadi. Sport majmualari va yashash joylari talabalar uchun qulay sharoit yaratadi.'
      }
    },
    {
      id: 'faculty',
      type: 'heading',
      data: { level: 4, content: '• Yuqori malakali professor-o\'qituvchilar jamoasi' }
    },
    {
      id: 'faculty-text',
      type: 'paragraph',
      data: {
        content: 'NamDTU ning barcha ustoz va professor-o\'qituvchilari xalqaro standartlarga javob beradigan yuqori malakali texnika mutaxassislaridir. Universitetda 50 dan ortiq professor va dotsent, 200 dan ortiq katta o\'qituvchi va o\'qituvchilar faoliyat yuritadi. Ko\'plab o\'qituvchilar xorijiy universitetlarda malaka oshirgan va amaliy tajribaga ega. Darslar o\'zbek, rus va ingliz tillarida olib boriladi.'
      }
    },
    {
      id: 'international',
      type: 'heading',
      data: { level: 4, content: '• Xalqaro hamkorlik' }
    },
    {
      id: 'international-text',
      type: 'paragraph',
      data: {
        content: 'Namangan Davlat Texnika Universiteti butun dunyo bo\'ylab 30 dan ortiq yetakchi xorijiy texnika universitetlari bilan hamkorlik qiladi. Ustoz professorlar va universitet talabalari uchun xorijiy amaliyot va almashinuv dasturlari mavjud. Har yili xorijiy ekspertlar va mutaxassislar bilan seminar va konferensiyalar tashkil etiladi.'
      }
    },
    {
      id: 'support',
      type: 'heading',
      data: { level: 4, content: '• Talabalarni qo\'llab-quvvatlash va ish bilan ta\'minlash' }
    },
    {
      id: 'support-text',
      type: 'paragraph',
      data: {
        content: 'Universitet har yili 1000 dan ortiq talabani qabul qiladi va ularga to\'liq qo\'llab-quvvatlash ko\'rsatadi. Hozirda 5000 dan ortiq talaba tahsil olmoqda. Universitet bitiruvchilari uchun ish bilan ta\'minlash dasturlari mavjud va ko\'plab yirik kompaniyalar bilan hamkorlik shartnomasi tuzilgan. Universitet hududida zamonaviy yotoqxonalar va ovqatlanish xizmatlari mavjud.'
      }
    }
  ];

  return (
    <PageTemplate
      title="Universitet"
      contentBlocks={allContentBlocks}
    />
  );
};

export default UniversityPage;
