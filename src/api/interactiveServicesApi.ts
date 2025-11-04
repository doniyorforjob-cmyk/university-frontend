import { Service } from '../types/service';

const mockServices: Service[] = [
  {
    id: 1,
    title: 'Elektron Kutubxona',
    description: 'Universitetning boy elektron kutubxona resurslaridan foydalaning.',
    href: '/library',
    icon: 'BookOpenIcon',
  },
  {
    id: 2,
    title: "Masofaviy Ta'lim",
    description: "Masofaviy ta'lim platformasi orqali darslarda ishtirok eting.",
    href: '/distance-learning',
    icon: 'ComputerDesktopIcon',
  },
  {
    id: 3,
    title: 'Onlayn Qabul',
    description: 'Hujjatlarni onlayn topshiring va qabul jarayonini kuzatib boring.',
    href: '/admission',
    icon: 'DocumentTextIcon',
  },
  {
    id: 4,
    title: 'Talabalar Portali',
    description: "Shaxsiy kabinetingiz orqali o'quv jarayoningizni boshqaring.",
    href: '/student-portal',
    icon: 'UserIcon',
  },
  {
    id: 5,
    title: 'Rektorga Murojaat',
    description: "Savol va takliflaringizni to'g'ridan-to'g'ri rektorga yo'llang.",
    href: '/contact-rector',
    icon: 'EnvelopeIcon',
  },
  {
    id: 6,
    title: 'Karyera Markazi',
    description: "Ishga joylashish va amaliyot o'tash uchun mavjud imkoniyatlar.",
    href: '/career-center',
    icon: 'BriefcaseIcon',
  },
];

export const getInteractiveServices = (): Promise<Service[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockServices);
    }, 500); // Simulate network delay
  });
};