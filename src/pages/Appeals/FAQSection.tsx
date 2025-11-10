import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
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
    question: 'Murojaat qayerda ko\'rib chiqiladi?',
    answer: 'Barcha murojaatlar tegishli bo\'lim va fakultet rahbariyati tomonidan ko\'rib chiqiladi. Murakkab masala bo\'lsa, rektoratga yo\'naltiriladi.',
    category: 'process'
  }
];

export const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Barcha', count: faqData.length },
    { id: 'general', name: 'Umumiy', count: faqData.filter(f => f.category === 'general').length },
    { id: 'timing', name: 'Vaqt', count: faqData.filter(f => f.category === 'timing').length },
    { id: 'files', name: 'Fayllar', count: faqData.filter(f => f.category === 'files').length },
    { id: 'tracking', name: 'Kuzatish', count: faqData.filter(f => f.category === 'tracking').length },
    { id: 'types', name: 'Turlari', count: faqData.filter(f => f.category === 'types').length },
    { id: 'privacy', name: 'Maxfiylik', count: faqData.filter(f => f.category === 'privacy').length },
    { id: 'process', name: 'Jarayon', count: faqData.filter(f => f.category === 'process').length },
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Tez-tez beriladigan savollar
        </h3>
        <p className="text-gray-600">
          Murojaat jarayoni haqida eng ko'p beriladigan savollar
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Savol qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Hech narsa topilmadi. Boshqa so'z bilan qidiring.
          </div>
        ) : (
          filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openItems.has(faq.id) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItems.has(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>

      {/* Contact CTA */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg text-center">
        <h4 className="text-lg font-semibold text-blue-900 mb-2">
          Savolingiz javob topmadi?
        </h4>
        <p className="text-blue-700 mb-4">
          Qo'shimcha savollar uchun quyidagi kontaktlar orqali bog'laning
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+998692270000"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            📞 +998 69 227 00 00
          </a>
          <a
            href="mailto:info@namdtu.uz"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            ✉️ info@namdtu.uz
          </a>
        </div>
      </div>
    </div>
  );
};