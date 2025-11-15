import React, { useEffect } from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { ContentBlock } from '@/components/shared/ContentBuilder';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

interface LeadershipData {
  blocks: ContentBlock[];
}

// Mock API function
const fetchLeadershipData = async (): Promise<LeadershipData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        blocks: [
          {
            id: 'intro',
            type: 'highlight',
            data: {
              title: 'NamDTU Rahbariyati',
              content: 'Namangan Davlat Texnika Universiteti yuqori malakali rahbarlar tomonidan boshqariladi. Har bir rahbar o\'z sohasida katta tajribaga ega.'
            }
          },
          {
            id: 'rector',
            type: 'grid',
            data: {
              title: 'Rektor va o\'rinbosarlari',
              columns: 2,
              items: [
                {
                  title: 'Prof. Karimov Jasur Abdurahmonovich',
                  description: 'Rektor - Texnika fanlari doktori, professor',
                  details: {
                    'Lavozim': 'Rektor',
                    'Tajriba': '15 yil',
                    'Ta\'lim': 'Toshkent Davlat Texnika Universiteti',
                    'Telefon': '+998 69 227-01-01'
                  }
                },
                {
                  title: 'Dots. Rahimova Sevara Karimovna',
                  description: 'O\'quv ishlari bo\'yicha prorektor',
                  details: {
                    'Lavozim': 'O\'quv ishlari prorektor',
                    'Tajriba': '12 yil',
                    'Ta\'lim': 'Toshkent Axborot Texnologiyalari Universiteti',
                    'Telefon': '+998 69 227-01-02'
                  }
                },
                {
                  title: 'Prof. Aliyev Bobur Karimovich',
                  description: 'Ilmiy ishlar bo\'yicha prorektor',
                  details: {
                    'Lavozim': 'Ilmiy ishlar prorektor',
                    'Tajriba': '18 yil',
                    'Ta\'lim': 'Moskva Davlat Texnika Universiteti',
                    'Telefon': '+998 69 227-01-03'
                  }
                },
                {
                  title: 'Dots. Toshmatov Sardor Rustamovich',
                  description: 'Moliya-iqtisodiy ishlar bo\'yicha prorektor',
                  details: {
                    'Lavozim': 'Moliya-iqtisod prorektor',
                    'Tajriba': '10 yil',
                    'Ta\'lim': 'Toshkent Moliya Instituti',
                    'Telefon': '+998 69 227-01-04'
                  }
                }
              ]
            }
          },
          {
            id: 'stats',
            type: 'stats',
            data: {
              title: 'Rahbariyat statistikasi',
              stats: [
                { value: '25+', label: 'Yillik tajriba' },
                { value: '4', label: 'Prorektor' },
                { value: '15', label: 'Fakultet dekani' },
                { value: '45', label: 'Kafedra mudiri' }
              ]
            }
          },
          {
            id: 'deans',
            type: 'cards',
            data: {
              title: 'Fakultet dekanlari',
              cards: [
                {
                  title: 'Muhandislik fakulteti',
                  description: 'Prof. Aliyev Bobur Karimovich - 850 talaba, 6 kafedra'
                },
                {
                  title: 'IT fakulteti',
                  description: 'Dots. Karimova Nilufar Shavkatovna - 720 talaba, 4 kafedra'
                },
                {
                  title: 'Elektrotexnika fakulteti',
                  description: 'Prof. Rahimov Sardor Azimovich - 650 talaba, 5 kafedra'
                },
                {
                  title: 'Qurilish fakulteti',
                  description: 'Dots. Toshmatova Gulnora Rustamovna - 580 talaba, 4 kafedra'
                }
              ]
            }
          },
          {
            id: 'contact',
            type: 'table',
            data: {
              title: 'Aloqa ma\'lumotlari',
              headers: ['Lavozim', 'F.I.O', 'Telefon', 'Email'],
              rows: [
                ['Rektor', 'Prof. Karimov J.A.', '+998 69 227-01-01', 'rector@namdtu.uz'],
                ['O\'quv prorektor', 'Dots. Rahimova S.K.', '+998 69 227-01-02', 'education@namdtu.uz'],
                ['Ilmiy prorektor', 'Prof. Aliyev B.K.', '+998 69 227-01-03', 'science@namdtu.uz'],
                ['Moliya prorektor', 'Dots. Toshmatov S.R.', '+998 69 227-01-04', 'finance@namdtu.uz']
              ]
            }
          },
          {
            id: 'quote',
            type: 'quote',
            data: {
              quote: 'Bizning maqsadimiz - O\'zbekiston uchun yuqori malakali texnik kadrlar tayyorlash va ilm-fan rivojlantirishdir.',
              author: 'Prof. Karimov Jasur Abdurahmonovich, Rektor'
            }
          }
        ]
      });
    }, 100);
  });
};

const LeadershipPage: React.FC = () => {
  const { setBannerData, setBreadcrumbsData } = useGlobalLayout();
  const { data, loading, error, refetch } = useStandardPage(
    'leadership',
    fetchLeadershipData
  );

  useEffect(() => {
    setBannerData({
      title: "Rahbariyat",
      backgroundImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    });
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Tuzilma', href: '/structure' },
      { label: 'Rahbariyat' }
    ]);

    return () => {
      setBannerData(undefined);
      setBreadcrumbsData(undefined);
    };
  }, [setBannerData, setBreadcrumbsData]);

  if (loading) {
    return <GenericPageSkeleton showSidebar={true} showHeroImage={true} contentBlocks={6} showBanner={true} />;
  }

  if (error || !data) {
    return (
      <PageTemplate
        title="Rahbariyat"
      > {/* PageTemplate no longer takes showSidebar */}
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error?.message || 'Ma\'lumot topilmadi'}</p>
          <button 
            onClick={refetch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Qayta yuklash
          </button>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      title="Rahbariyat"
      contentBlocks={data.blocks}
    />
  );
};

export default LeadershipPage;
