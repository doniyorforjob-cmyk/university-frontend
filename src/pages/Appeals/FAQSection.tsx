import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../store/settingsStore';
import { useFAQData } from '../../hooks/useFAQData';
import { FAQCategory } from '../../types/faq.types';
import { formatPhone } from '../../utils/format';
import EmptyState from '../../components/shared/EmptyState';

export const FAQSection: React.FC = () => {
  const { t } = useTranslation(['common', 'pages', 'components']);
  const { settings } = useSettingsStore();
  const { data: faqData = [], isLoading, error } = useFAQData();
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const phone = settings?.contacts?.primaryPhone || "+998 69 227 00 00";
  const email = settings?.contacts?.email || "info@namdtu.uz";

  const categories = useMemo((): FAQCategory[] => {
    const counts = faqData.reduce((acc, faq) => {
      acc[faq.category] = (acc[faq.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const result: FAQCategory[] = [
      { id: 'all', name: t('components:faq.categories.all') as string, count: faqData.length }
    ];

    Object.entries(counts).forEach(([id, count]) => {
      result.push({
        id,
        name: (t(`components:faq.categories.${id}`) as string) || id,
        count
      });
    });

    return result;
  }, [faqData, t]);

  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [faqData, searchTerm, selectedCategory]);

  const toggleItem = (id: string) => {
    setOpenItemId(prevId => prevId === id ? null : id);
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
        <p>{t('common:errorOccurred')}: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg p-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t('components:faq.title')}
        </h3>
        <p className="text-gray-600">
          {t('components:faq.subtitle')}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder={t('components:faq.searchPlaceholder') as string}
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
          <EmptyState
            resourceKey="info"
            title={t('components:faq.noResults')}
            className="min-h-[15rem]"
          />
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
                  animate={{ rotate: openItemId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItemId === faq.id && (
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
          {t('components:faq.contactPrompt')}
        </h4>
        <p className="text-blue-700 mb-4">
          {t('components:faq.contactSubtitle')}
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