

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

import { Faculty } from '../types/faculty';

export type { Faculty };


// Kelajakda bu ma'lumotlar API orqali olinadi
export const facultiesData: Faculty[] = [
    { id: 1, name: 'Muhandislik-axborot texnologiyalari', icon: CpuChipIcon, color: 'from-sky-500 to-indigo-500', image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/processor.png' },
    { id: 2, name: 'Transport', icon: TruckIcon, color: 'from-slate-500 to-slate-700', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/truck.png' },
    { id: 3, name: 'Biznesni boshqarish', icon: BriefcaseIcon, color: 'from-emerald-500 to-green-600', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/business.png' },
    { id: 4, name: 'Iqtisodiyot', icon: BanknotesIcon, color: 'from-lime-500 to-green-500', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/money.png' },
    { id: 5, name: 'Qurilish', icon: BuildingOfficeIcon, color: 'from-amber-500 to-orange-600', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/construction.png' },
    { id: 6, name: 'Texnologiya', icon: Cog6ToothIcon, color: 'from-purple-500 to-violet-600', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/gear.png' },
    { id: 7, name: 'Energetika', icon: BoltIcon, color: 'from-yellow-400 to-amber-500', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/lightning-bolt.png' },
    { id: 8, name: 'Mexanika', icon: WrenchScrewdriverIcon, color: 'from-gray-500 to-slate-600', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/wrench.png' },
    { id: 9, name: 'To\'qimachilik sanoati enjiniringi', icon: ScissorsIcon, color: 'from-pink-500 to-rose-500', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', iconImage: 'https://img.icons8.com/material-outlined/48/000000/roller-skates.png' },
];
