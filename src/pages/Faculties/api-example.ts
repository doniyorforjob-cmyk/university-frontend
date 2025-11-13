// API'dan kelgan raw ma'lumotlar
interface RawFacultyData {
  id: number;
  name: string;
  dean: string;
  students_count: number;
  departments: string[];
  description: string;
  image_url: string;
  established_year: number;
  contact_phone: string;
  contact_email: string;
}

// API'dan kelgan ma'lumotlar
const rawApiData: RawFacultyData[] = [
  {
    id: 1,
    name: "Muhandislik-texnologiya fakulteti",
    dean: "Prof. Aliyev Bobur Karimovich",
    students_count: 850,
    departments: ["Mashinasozlik", "Energetika", "Avtomatlashtirish"],
    description: "Zamonaviy muhandislik yo'nalishlarida kadrlar tayyorlaydi",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    established_year: 1995,
    contact_phone: "+998 69 227-03-01",
    contact_email: "engineering@namdtu.uz"
  },
  {
    id: 2,
    name: "Iqtisodiyot fakulteti",
    dean: "Dots. Karimova Nilufar Shavkatovna",
    students_count: 720,
    departments: ["Moliya", "Marketing", "Buxgalteriya hisobi"],
    description: "Iqtisodiy soha mutaxassislarini tayyorlaydi",
    image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
    established_year: 1998,
    contact_phone: "+998 69 227-03-02",
    contact_email: "economics@namdtu.uz"
  }
];

// API ma'lumotlarini ContentBuilder formatiga o'tkazish
export const formatFacultyDataToContentBlocks = (rawData: RawFacultyData[]) => {
  const contentBlocks = [
    // 1. Intro highlight
    {
      id: 'intro',
      type: 'highlight',
      data: {
        title: 'NamDTU Fakultetlari',
        content: `Universitetimizda ${rawData.length} ta fakultet faoliyat yuritadi va jami ${rawData.reduce((sum, f) => sum + f.students_count, 0)} nafar talaba tahsil oladi.`
      }
    },

    // 2. Fakultetlar grid
    {
      id: 'faculties-grid',
      type: 'grid',
      data: {
        title: 'Fakultetlar ro\'yxati',
        columns: 2,
        items: rawData.map(faculty => ({
          title: faculty.name,
          description: faculty.description,
          details: {
            'Dekan': faculty.dean,
            'Talabalar soni': faculty.students_count.toLocaleString(),
            'Kafedralar soni': faculty.departments.length,
            'Tashkil etilgan': faculty.established_year,
            'Telefon': faculty.contact_phone,
            'Email': faculty.contact_email
          }
        }))
      }
    },

    // 3. Statistika
    {
      id: 'stats',
      type: 'stats',
      data: {
        title: 'Fakultetlar statistikasi',
        stats: [
          { 
            value: rawData.length.toString(), 
            label: 'Fakultetlar' 
          },
          { 
            value: rawData.reduce((sum, f) => sum + f.students_count, 0).toLocaleString(), 
            label: 'Talabalar' 
          },
          { 
            value: rawData.reduce((sum, f) => sum + f.departments.length, 0).toString(), 
            label: 'Kafedralar' 
          },
          { 
            value: Math.min(...rawData.map(f => f.established_year)).toString(), 
            label: 'Eng qadimiy yil' 
          }
        ]
      }
    },

    // 4. Kafedralar ro'yxati
    {
      id: 'departments',
      type: 'accordion',
      data: {
        title: 'Fakultetlar bo\'yicha kafedralar',
        items: rawData.map(faculty => ({
          question: `${faculty.name} kafedralari`,
          answer: `Bu fakultetda quyidagi kafedralar faoliyat yuritadi: ${faculty.departments.join(', ')}. Fakultet ${faculty.established_year} yilda tashkil etilgan va hozirda ${faculty.students_count} nafar talaba tahsil oladi.`
        }))
      }
    },

    // 5. Fakultet rasmlari
    ...rawData.map((faculty, index) => ({
      id: `faculty-image-${faculty.id}`,
      type: 'image',
      data: {
        title: faculty.name,
        src: faculty.image_url,
        alt: faculty.name,
        caption: `${faculty.name} - ${faculty.dean} rahbarligida`
      }
    }))
  ];

  return contentBlocks;
};

// Sahifada ishlatish
export const fetchFacultiesData = async () => {
  // 1. API'dan raw ma'lumotlarni olish
  const response = await fetch('/api/faculties');
  const rawData: RawFacultyData[] = await response.json();
  
  // 2. ContentBuilder formatiga o'tkazish
  const contentBlocks = formatFacultyDataToContentBlocks(rawData);
  
  return { blocks: contentBlocks };
};
