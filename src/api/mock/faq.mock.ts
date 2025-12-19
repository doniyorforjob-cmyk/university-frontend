import { FAQItem } from '../../types/faq.types';

const mockFAQs: FAQItem[] = [
    {
        id: '1',
        question: 'Murojaat yuborish uchun qanday ma\'lumotlar kerak?',
        answer: 'Murojaat yuborish uchun F.I.Sh., telefon raqami, email manzili va murojaat matni talab qilinadi. Ixtiyoriy ravishda manzil va qo\'shimcha fayllarni ham biriktirishingiz mumkin.',
        category: 'general'
    },
    {
        id: '2',
        question: 'Murojaatga javob qachon keladi?',
        answer: 'Murojaatga javob berish vaqti murojaatning muhimlik darajasiga qarab farq qiladi: Past - 5-7 kun, O\'rtacha - 3-5 kun, Yuqori - 1-2 kun, Shoshilinch - 24 soat ichida.',
        category: 'timing'
    },
    {
        id: '3',
        question: 'Qanday fayllarni biriktirish mumkin?',
        answer: 'PDF, DOC, DOCX, JPG, PNG formatdagi fayllarni yuklashingiz mumkin. Har bir fayl maksimal 10MB bo\'lishi va jami 5 tagacha fayl yuklashingiz mumkin.',
        category: 'files'
    },
    {
        id: '4',
        question: 'Murojaat holatini qanday tekshirish mumkin?',
        answer: 'Murojaat yuborilgandan keyin sizga berilgan Tracking ID orqali murojaat holatini tekshirishingiz mumkin. Shuningdek, email orqali status o\'zgarishlari haqida xabar beriladi.',
        category: 'tracking'
    },
    {
        id: '5',
        question: 'Murojaatni qaytarib olish yoki o\'zgartirish mumkinmi?',
        answer: 'Murojaat yuborilgandan keyin uni qaytarib olish yoki o\'zgartirish imkoni yo\'q. Agar murojaatda xatolik bo\'lsa, yangi murojaat yuborishingiz mumkin.',
        category: 'general'
    },
    {
        id: '6',
        question: 'Shikoyat va taklif o\'rtasidagi farq nima?',
        answer: 'Shikoyat - mavjud muammolar va kamchiliklar haqida, taklif esa o\'qitish sifatini yaxshilash, infratuzilma va xizmatlar bo\'yicha yangi g\'oyalar haqida bo\'ladi.',
        category: 'types'
    },
    {
        id: '7',
        question: 'Anonim murojaat yuborish mumkinmi?',
        answer: 'Hozirda barcha murojaatlar identifikatsiya qilinishi shart. Kelajakda anonim murojaat imkoni ham qo\'shilishi mumkin.',
        category: 'privacy'
    },
    {
        id: '8',
        question: 'Murojaat qayerda ko\'ko\'rib chiqiladi?',
        answer: 'Barcha murojaatlar tegishli bo\'lim va fakultet rahbariyati tomonidan ko\'rib chiqiladi. Murakkab masala bo\'lsa, rektoratga yo\'naltiriladi.',
        category: 'process'
    }
];

export const faqApi = {
    getFAQs: async (): Promise<FAQItem[]> => {
        console.log('Fetching FAQs (mock)...');
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockFAQs;
    }
};
