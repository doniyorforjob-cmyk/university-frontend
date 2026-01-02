/**
 * Appeal Types and Interfaces
 */

export type AppealType = 'ariza' | 'taklif' | 'shikoyat';

export type AppealStatus = 'pending' | 'processing' | 'completed' | 'rejected';

export type AppealPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface AppealFormData {
  // Step 1: Appeal Type Selection
  appealType: AppealType;

  // Step 2: Personal Information
  fullName: string;
  phone: string;
  email: string;
  address?: string;

  // Step 3: Appeal Details
  title: string;
  description: string;
  category: string;
  priority: AppealPriority;

  // Step 4: Additional Information
  department?: string;
  faculty?: string;
  attachments: File[];

  // Step 5: Confirmation
  agreeToTerms: boolean;
  agreeToProcessing: boolean;
}

export interface AppealSubmission {
  id: string;
  trackingId: string;
  formData: AppealFormData;
  status: AppealStatus;
  createdAt: Date;
  updatedAt: Date;
  estimatedResponseTime: string;
  assignedTo?: string;
}

export interface AppealCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

// Appeal categories for different types
export const APPEAL_CATEGORIES = {
  ariz: [
    { id: 'admission', name: "Qabul bo'yicha", description: "Talabalikka qabul, transfer va boshqa qabul jarayonlari" },
    { id: 'documents', name: "Hujjatlar", description: "Diplom, akademik ma'lumotnoma va boshqa hujjatlar" },
    { id: 'grades', name: "Baholar", description: "Baholash, qayta topshirish, apellyatsiya" },
    { id: 'tuition', name: "To'lovlar", description: "Kontrakt to'lovlari, stipendiya, grantlar" },
    { id: 'other', name: "Boshqa", description: "Boshqa turdagi arizalar" },
  ],
  taklif: [
    { id: 'education', name: "Ta'lim sifati", description: "Darslar, o'qitish metodlari, dasturlar" },
    { id: 'infrastructure', name: "Infratuzilma", description: "Binolar, jihozlar, transport" },
    { id: 'services', name: "Xizmatlar", description: "Kutubxona, sport, ovqatlanish" },
    { id: 'digital', name: "Raqamli xizmatlar", description: "Onlayn platformalar, ilovalar" },
    { id: 'other', name: "Boshqa", description: "Boshqa turdagi takliflar" },
  ],
  shikoyat: [
    { id: 'teaching', name: "O'qitish", description: "O'qituvchilar, darslar, baholash" },
    { id: 'administration', name: "Ma'muriyat", description: "Xodimlar, tartib-qoidalar" },
    { id: 'facilities', name: "Sharoitlar", description: "Binolar, jihozlar, tozalik" },
    { id: 'services', name: "Xizmatlar", description: "Kutubxona, sport, ovqatlanish" },
    { id: 'harassment', name: "Tahqirlash", description: "Zo'ravonlik, kamsitish holatlari" },
  ],
} as const;

// Priority levels
export const PRIORITY_LEVELS = [
  { value: 'low', label: 'Past', description: 'Oddiy murojaat', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: "O'rtacha", description: 'Muhim murojaat', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'Yuqori', description: 'Jiddiy murojaat', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Shoshilinch', description: 'Darhol ko\'rib chiqish kerak', color: 'bg-red-100 text-red-800' },
] as const;

// Status labels
export const STATUS_LABELS = {
  pending: { label: 'Kutilmoqda', color: 'bg-gray-100 text-gray-800' },
  processing: { label: "Ko'rib chiqilmoqda", color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Hal qilindi', color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rad etildi', color: 'bg-red-100 text-red-800' },
} as const;

// File upload constraints
export const FILE_CONSTRAINTS = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
  maxFiles: 5,
} as const;

// Response time estimates
export const RESPONSE_TIME_ESTIMATES = {
  low: '5-7 ish kuni',
  medium: '3-5 ish kuni',
  high: '1-2 ish kuni',
  urgent: '24 soat ichida',
} as const;