import React, { useEffect } from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

interface Faculty {
  id: string;
  name: string;
  description: string;
  dean: string;
  departments: string[];
  studentCount: number;
  establishedYear: number;
}

// Mock API function
const fetchFaculties = async (): Promise<Faculty[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Muhandislik va texnologiya fakulteti',
          description: 'Zamonaviy muhandislik va texnologiya yo\'nalishlarida kadrlar tayyorlaydi.',
          dean: 'Prof. Aliyev Bobur Karimovich',
          departments: ['Mashinasozlik', 'Metallurgiya', 'Texnologik mashinalar'],
          studentCount: 850,
          establishedYear: 2000
        },
        {
          id: '2',
          name: 'Axborot texnologiyalari fakulteti',
          description: 'IT sohasida yuqori malakali mutaxassislar tayyorlaydi.',
          dean: 'Dots. Karimova Nilufar Shavkatovna',
          departments: ['Dasturiy injiniring', 'Kompyuter tizimlari', 'Axborot xavfsizligi'],
          studentCount: 720,
          establishedYear: 2005
        },
        {
          id: '3',
          name: 'Elektrotexnika va energetika fakulteti',
          description: 'Elektr energetikasi va elektrotexnika bo\'yicha mutaxassislar tayyorlaydi.',
          dean: 'Prof. Rahimov Sardor Azimovich',
          departments: ['Elektr energetikasi', 'Elektrotexnika', 'Qayta tiklanadigan energiya'],
          studentCount: 650,
          establishedYear: 2002
        },
        {
          id: '4',
          name: 'Qurilish va arxitektura fakulteti',
          description: 'Qurilish va arxitektura sohasida professional kadrlar tayyorlaydi.',
          dean: 'Dots. Toshmatova Gulnora Rustamovna',
          departments: ['Qurilish muhandisligi', 'Arxitektura', 'Shaharsozlik'],
          studentCount: 580,
          establishedYear: 2003
        }
      ]);
    }, 100);
  });
};

const FacultiesPage: React.FC = () => {
  const { setBannerData, setBreadcrumbsData } = useGlobalLayout();
  const { data: faculties, loading, error, refetch } = useStandardPage(
    'faculties',
    fetchFaculties
  );

  useEffect(() => {
    setBannerData({
      title: "Fakultetlar",
      backgroundImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    });
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Fakultetlar' }
    ]);

    return () => {
      setBannerData(undefined);
      setBreadcrumbsData(undefined);
    };
  }, [setBannerData, setBreadcrumbsData]);

  if (loading) {
    return <GenericPageSkeleton showSidebar={true} showHeroImage={false} contentBlocks={4} showBanner={true} />;
  }

  if (error || !faculties) {
    return (
      <PageTemplate
        title="Fakultetlar"
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
      title="Fakultetlar"
    >
      <div className="space-y-8">
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">NamDTU Fakultetlari</h2>
          <p className="text-blue-700">
            Namangan Davlat Texnika Universiteti {faculties.length} ta fakultetga ega bo'lib, 
            har biri o'z sohasida yuqori malakali mutaxassislar tayyorlaydi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faculties.map((faculty: Faculty, index: number) => (
            <div 
              key={faculty.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-bold text-black mb-3">{faculty.name}</h3>
              <p className="text-black mb-4">{faculty.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold text-black">Dekan:</span>
                  <span className="text-black">{faculty.dean}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-black">Talabalar soni:</span>
                  <span className="text-black">{faculty.studentCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-black">Tashkil etilgan:</span>
                  <span className="text-black">{faculty.establishedYear}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-black mb-2">Kafedralar:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {faculty.departments.map((dept, deptIndex) => (
                    <li key={deptIndex} className="text-black text-sm">{dept}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Fakultetlarga qabul</h3>
          <p className="mb-2">
            Har bir fakultetga qabul test sinovlari va suhbat orqali amalga oshiriladi.
          </p>
          <p className="font-semibold">
            Batafsil ma'lumot uchun qabul komissiyasi bilan bog'laning!
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default FacultiesPage;
