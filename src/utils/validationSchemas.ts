                                                                                                                                                                                                                                                                                    /**
 * Validation Schemas for Forms
 * Using Zod for type-safe validation
 */

import { z } from 'zod';

// Zod enum helper for older versions
const createEnum = <T extends readonly string[]>(values: T) => {
  return z.string().refine((val): val is T[number] => values.includes(val as T[number]));
};

// Appeal form validation schema
export const appealFormSchema = z.object({
  // Step 1: Appeal Type Selection
  appealType: createEnum(['ariza', 'taklif', 'shikoyat']),

  // Step 2: Personal Information
  fullName: z
    .string()
    .min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak')
    .max(100, 'Ism juda uzun')
    .regex(/^[a-zA-Z\s\u0400-\u04FF]+$/, 'Faqat harflar va bo\'sh joylardan iborat bo\'lishi kerak'),

  phone: z
    .string()
    .regex(/^\+998\d{9}$/, 'Telefon raqami +998XXXXXXXXX formatida bo\'lishi kerak'),

  email: z
    .string()
    .email('Email manzili noto\'g\'ri')
    .max(100, 'Email juda uzun'),

  address: z
    .string()
    .max(200, 'Manzil juda uzun')
    .optional(),

  // Step 3: Appeal Details
  title: z
    .string()
    .min(5, 'Sarlavha kamida 5 ta belgidan iborat bo\'lishi kerak')
    .max(200, 'Sarlavha juda uzun'),

  description: z
    .string()
    .min(20, 'Tavsif kamida 20 ta belgidan iborat bo\'lishi kerak')
    .max(2000, 'Tavsif juda uzun'),

  category: z
    .string()
    .min(1, 'Kategoriyani tanlang'),
                                                                                      
  priority: createEnum(['low', 'medium', 'high', 'urgent']),

  // Step 4: Additional Information
  department: z
    .string()
    .optional(),

  faculty: z
    .string()
    .optional(),

  attachments: z
    .array(z.instanceof(File))
    .default([]),

  // Step 5: Confirmation
  agreeToTerms: z
    .boolean()
    .refine(val => val === true, {
      message: 'Foydalanish shartlariga rozilik bildirishingiz kerak',
    }),

  agreeToProcessing: z
    .boolean()
    .refine(val => val === true, {
      message: 'Ma\'lumotlarni qayta ishlashga rozilik bildirishingiz kerak',
    }),
});

// File validation schema
export const fileValidationSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
});

// Appeal tracking schema
export const appealTrackingSchema = z.object({
  trackingId: z
    .string()
    .regex(/^[A-Z]{2}\d{8}$/, 'Tracking ID noto\'g\'ri formatda'),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak')
    .max(100, 'Ism juda uzun'),

  email: z
    .string()
    .email('Email manzili noto\'g\'ri'),

  phone: z
    .string()
    .optional(),

  subject: z
    .string()
    .min(5, 'Mavzu kamida 5 ta belgidan iborat bo\'lishi kerak')
    .max(200, 'Mavzu juda uzun'),

  message: z
    .string()
    .min(10, 'Xabar kamida 10 ta belgidan iborat bo\'lishi kerak')
    .max(1000, 'Xabar juda uzun'),
});

// Type inference from schemas
export type AppealFormData = z.infer<typeof appealFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type AppealTrackingData = z.infer<typeof appealTrackingSchema>;

// Validation helpers
export const validateFile = (file: File) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ];

  if (file.size > maxSize) {
    return 'Fayl hajmi 10MB dan oshmasligi kerak';
  }

  if (!allowedTypes.includes(file.type)) {
    return 'Fayl turi qo\'llab-quvvatlanmaydi';
  }

  return null; // Valid
};

export const validateFiles = (files: File[]) => {
  const maxFiles = 5;
  const errors: string[] = [];

  if (files.length > maxFiles) {
    errors.push(`Maksimal ${maxFiles} ta fayl yuklashingiz mumkin`);
  }

  files.forEach((file, index) => {
    const error = validateFile(file);
    if (error) {
      errors.push(`Fayl ${index + 1}: ${error}`);
    }
  });

  return errors;
};

// Form step validation
export const validateStep = (step: number, data: Partial<AppealFormData>) => {
  const stepSchemas = {
    1: appealFormSchema.pick({ appealType: true }),
    2: appealFormSchema.pick({ fullName: true, phone: true, email: true, address: true }),
    3: appealFormSchema.pick({ title: true, description: true, category: true, priority: true }),
    4: appealFormSchema.pick({ department: true, faculty: true }),
    5: appealFormSchema.pick({ agreeToTerms: true, agreeToProcessing: true }),
  };

  const schema = stepSchemas[step as keyof typeof stepSchemas];
  if (!schema) return { success: false, errors: ['Noto\'g\'ri qadam'] };

  try {
    schema.parse(data);
    return { success: true, errors: [] };
  } catch (error: any) {
    return {
      success: false,
      errors: error.errors.map((err: any) => err.message),
    };
  }
};