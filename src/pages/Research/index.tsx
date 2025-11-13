import React, { useEffect } from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import usePage from '@/hooks/usePage';
import { ContentBlock } from '@/components/shared/ContentBuilder';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

interface ResearchData {
  blocks: ContentBlock[];
}

// Mock API function
const fetchResearchData = async (): Promise<ResearchData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        blocks: [
          {
            id: 'intro',
            type: 'highlight',
            data: {
              title: 'Ilmiy-Tadqiqot Faoliyati',
              content: 'NamDTU da zamonaviy texnologiyalar, muhandislik va axborot tizimlari bo\'yicha keng ko\'lamli ilmiy tadqiqotlar olib boriladi.'
            }
          },
          {
            id: 'research-areas',
            type: 'list',
            data: {
              title: 'Asosiy tadqiqot yo\'nalishlari',
              items: [
                'Zamonaviy qurilish materiallari va texnologiyalari',
                'Qayta tiklanadigan energiya manbalari',
                'Axborot xavfsizligi va kriptografiya',
                'Sun\'iy intellekt va mashinani o\'rganish',
                'Robotexnika va avtomatlashtirish',
                'Nano texnologiyalar va materiallar',
                'Ekologik toza texnologiyalar',
                'Smart shahar tizimlari'
              ]
            }
          },
          {
            id: 'projects',
            type: 'grid',
            data: {
              title: 'Joriy loyihalar',
              columns: 2,
              items: [
                {
                  title: 'Smart Grid tizimi',
                  description: 'Elektr energiyasini aqlli taqsimlash tizimi ishlab chiqish',
                  details: {
                    'Muddat': '2023-2025',
                    'Byudjet': '$150,000',
                    'Hamkor': 'Toshkent Texnika Universiteti',
                    'Status': 'Faol'
                  }
                },
                {
                  title: 'IoT Agriculture',
                  description: 'Qishloq xo\'jaligi uchun IoT yechimlar',
                  details: {
                    'Muddat': '2024-2026',
                    'Byudjet': '$200,000',
                    'Hamkor': 'Farg\'ona Politexnika',
                    'Status': 'Boshlangan'
                  }
                },
                {
                  title: 'Blockchain Education',
                  description: 'Ta\'lim tizimida blockchain texnologiyasi',
                  details: {
                    'Muddat': '2023-2024',
                    'Byudjet': '$80,000',
                    'Hamkor': 'INHA Universiteti',
                    'Status': 'Yakunlanmoqda'
                  }
                },
                {
                  title: 'Green Building',
                  description: 'Ekologik toza qurilish texnologiyalari',
                  details: {
                    'Muddat': '2024-2027',
                    'Byudjet': '$300,000',
                    'Hamkor': 'Germaniya Texnika Universiteti',
                    'Status': 'Rejalashtirilgan'
                  }
                }
              ]
            }
          },
          {
            id: 'timeline',
            type: 'timeline',
            data: {
              title: 'Ilmiy yutuqlar tarixi',
              events: [
                {
                  year: '2020',
                  description: 'Birinchi xalqaro patent olingan - "Aqlli suv taqsimlash tizimi"'
                },
                {
                  year: '2021',
                  description: 'IEEE konferensiyasida 15 ta maqola e\'lon qilingan'
                },
                {
                  year: '2022',
                  description: 'Evropa Ittifoqi bilan birgalikda Horizon 2020 loyihasi boshlangan'
                },
                {
                  year: '2023',
                  description: 'Milliy innovatsiya mukofoti g\'olibi bo\'lgan'
                },
                {
                  year: '2024',
                  description: 'Yangi ilmiy-tadqiqot markazi ochilgan'
                }
              ]
            }
          },
          {
            id: 'image',
            type: 'image',
            data: {
              title: 'Zamonaviy laboratoriya',
              src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
              alt: 'Ilmiy laboratoriya',
              caption: 'NamDTU ning zamonaviy ilmiy-tadqiqot laboratoriyasi'
            }
          },
          {
            id: 'stats',
            type: 'stats',
            data: {
              title: 'Ilmiy ko\'rsatkichlar',
              stats: [
                { value: '150+', label: 'Ilmiy maqolalar' },
                { value: '25', label: 'Xalqaro loyihalar' },
                { value: '8', label: 'Patentlar' },
                { value: '45', label: 'PhD talabalar' }
              ]
            }
          },
          {
            id: 'publications',
            type: 'text',
            data: {
              title: 'So\'nggi nashrlar',
              content: 'Universitetimiz professor-o\'qituvchilari tomonidan 2024 yilda 50 dan ortiq ilmiy maqola xalqaro jurnallarda chop etilgan. Shu jumladan Scopus va Web of Science bazalariga kiritilgan jurnallarda 25 ta maqola nashr etilgan.'
            }
          }
        ]
      });
    }, 100);
  });
};

const ResearchPage: React.FC = () => {
  const { setBannerData, setBreadcrumbsData } = useGlobalLayout();
  const { data, loading, error, refetch } = usePage({
    fetchData: fetchResearchData
  });

  useEffect(() => {
    setBannerData({
      title: "Ilmiy Faoliyat",
      backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    });
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Faoliyat', href: '/activities' },
      { label: 'Ilmiy Faoliyat' }
    ]);

    return () => {
      setBannerData(undefined);
      setBreadcrumbsData(undefined);
    };
  }, [setBannerData, setBreadcrumbsData]);

  if (loading) {
    return <GenericPageSkeleton showSidebar={true} showHeroImage={true} contentBlocks={7} showBanner={true} />;
  }

  if (error || !data) {
    return (
      <PageTemplate
        title="Ilmiy Faoliyat"
      > {/* PageTemplate no longer takes showSidebar */}
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error || 'Ma\'lumot topilmadi'}</p>
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
      title="Ilmiy Faoliyat"
      contentBlocks={data.blocks}
    />
  );
};

export default ResearchPage;
