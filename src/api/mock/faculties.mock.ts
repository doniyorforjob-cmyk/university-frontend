

import {
  CpuChipIcon,
  TruckIcon,
  BriefcaseIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ScissorsIcon,
} from '@heroicons/react/24/outline';

import { Faculty } from '../../types/faculty.types';

export type { Faculty };


// Kelajakda bu ma'lumotlar API orqali olinadi
export const facultiesData: Faculty[] = [
  {
    id: 1,
    name: 'Muhandislik-axborot texnologiyalari',
    icon: CpuChipIcon,
    color: 'from-sky-500 to-indigo-500',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
    iconImage: 'https://img.icons8.com/material-outlined/48/000000/processor.png',
    description: "Muhandislik va axborot texnologiyalari fakulteti zamonaviy raqamli iqtisodiyot uchun yuqori malakali mutaxassislar tayyorlaydi.",
    content: "<h3>Fakultet haqida</h3><p>Fakultetimizda 5 ta yo'nalish bo'yicha bakalavrlar tayyorlanmoqda. Bizda eng zamonaviy laboratoriyalar va yuqori tezlikdagi internet mavjud. Talabalarimiz darsdan bo'sh vaqtlarida robototexnika va dasturlash klublarida shug'ullanishlari mumkin.</p><ul><li>Dasturlash muhandisligi</li><li>Axborot xavfsizligi</li><li>Sun'iy intellekt</li></ul>",
    deanName: "Azizov Akmalbek",
    deanPosition: "Fakultet dekani",
    deanPhone: "+998 90 123 45 67",
    deanEmail: "akmalbek@example.com",
    deanImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    directionsAndSpecializations: "<h3>Bakalavriat yo'nalishlari:</h3><ul><li>Kompyuter ilmlari va dasturlash texnologiyalari</li><li>Axborot tizimlari va texnologiyalari</li><li>Axborot xavfsizligi</li></ul><h3>Magistratura mutaxassisliklari:</h3><ul><li>Kompyuter ilmlari va dasturlash texnologiyalari</li><li>Sun'iy intellekt</li></ul>",
    internationalCooperation: "<p>Fakultetimiz dunyoning ko'plab nufuzli universitetlari bilan hamkorlik qilib kelmoqda:</p><ul><li>Seul Milliy Universiteti (Koreya)</li><li>Moskva Davlat Texnika Universiteti (Rossiya)</li><li>Berlin Texnika Universiteti (Germaniya)</li></ul>"
  },
  { id: 2, name: 'Transport', icon: TruckIcon, color: 'from-slate-500 to-slate-700', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/truck.png' },
  { id: 3, name: 'Biznesni boshqarish', icon: BriefcaseIcon, color: 'from-emerald-500 to-green-600', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/business.png' },
  { id: 4, name: 'Iqtisodiyot', icon: BanknotesIcon, color: 'from-lime-500 to-green-500', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/money.png' },
  { id: 5, name: 'Qurilish', icon: BuildingOfficeIcon, color: 'from-amber-500 to-orange-600', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/construction.png' },
  { id: 6, name: 'Texnologiya', icon: Cog6ToothIcon, color: 'from-purple-500 to-violet-600', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/gear.png' },
  { id: 7, name: 'Energetika', icon: BoltIcon, color: 'from-yellow-400 to-amber-500', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/lightning-bolt.png' },
  { id: 8, name: 'Mexanika', icon: WrenchScrewdriverIcon, color: 'from-gray-500 to-slate-600', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/wrench.png' },
  { id: 9, name: 'To\'qimachilik sanoati enjiniringi', icon: ScissorsIcon, color: 'from-pink-500 to-rose-500', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/roller-skates.png' },
];

export const departmentsData = [
  {
    id: '6e808061-14f5-4f8c-97da-72e92a6c051a',
    name: "Axborot texnologiyalari kafedrasi",
    phone: "+998 90 111 22 33",
    email: "at@namdtu.uz",
    headName: "Ismoilov Bahodir Akmalovich",
    facultyId: 1,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: "<h3>Kafedra tarixi</h3><p>Axborot texnologiyalari kafedrasi 2010-yilda tashkil etilgan. Hozirda kafedrada 20 dan ortiq professor-o'qituvchilar faoliyat yuritmoqda. Kafedra zamonaviy dasturlash tillari, ma'lumotlar bazasi, sun'iy intellekt va boshqa IT yo'nalishlari bo'yicha ta'lim beradi.</p><p>Kafedra talabalariga nazariy bilimlar bilan bir qatorda amaliy ko'nikmalarni ham o'rgatishga alohida e'tibor beradi.</p>",
    directions: "<h4>Kafedra yo'nalishlari:</h4><ul><li>Dasturiy injiniring</li><li>Kompyuter ilmlari</li><li>Axborot tizimlari va texnologiyalari</li><li>Sun'iy intellekt</li></ul>",
    gallery: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
    ],
    history: "Kafedra 2010-yil 15-sentyabrda tashkil etilgan."
  },
  {
    id: 102,
    name: "Dasturiy injiniring kafedrasi",
    phone: "+998 90 444 55 66",
    headName: "Usmonov Jalol",
    facultyId: 1
  }
];
