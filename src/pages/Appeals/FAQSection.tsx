import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSettingsStore } from '../../store/settingsStore';
import { useFAQData } from '../../hooks/useFAQData';
import { FAQCategory } from '../../types/faq.types';
import { formatPhone } from '../../utils/format';

export const FAQSection: React.FC = () => {
  const { settings } = useSettingsStore();
  const { data: faqData = [], isLoading, error } = useFAQData();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const phone = settings?.contacts?.primaryPhone || "+998 69 227 00 00";
  const email = settings?.contacts?.email || "info@namdtu.uz";

  const categories = useMemo((): FAQCategory[] => {
    const counts = faqData.reduce((acc, faq) => {
      acc[faq.category] = (acc[faq.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categoryNames: Record<string, string> = {
      general: 'Umumiy',
      timing: 'Vaqt',
      files: 'Fayllar',
      tracking: 'Kuzatish',
      types: 'Turlari',
      privacy: 'Maxfiylik',
      process: 'Jarayon',
    };

    const result: FAQCategory[] = [
      { id: 'all', name: 'Barchasi', count: faqData.length }
    ];

    Object.entries(counts).forEach(([id, count]) => {
      result.push({
        id,
        name: categoryNames[id] || id,
        count
      });
    });

    return result;
  }, [faqData]);

  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [faqData, searchTerm, selectedCategory]);

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-12 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-lg p-6 text-center text-red-600">
        <p>Xatolik yuz berdi: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg p-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Tez-tez beriladigan savollar
        </h3>
        <p className="text-gray-600">
          Murojaat jarayoni haqida eng kop beriladigan savollar
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
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id
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
            Hech narsa topilmadi. Boshqa so&apos;z bilan qidiring.
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
                    <div
                      className="px-6 pb-4 text-gray-700 leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
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
          Savolingizga javob topmadimi?
        </h4>
        <p className="text-blue-700 mb-4">
          Qo&apos;shimcha savollar uchun quyidagi kontaktlar orqali bog&apos;laning
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            📞 {formatPhone(phone)}
          </a>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            ✉️ {email}
          </a>
        </div>
      </div>
    </div>
  );
};