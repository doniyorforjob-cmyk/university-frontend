import React from 'react';
import { TransformedUniversitySystemsData, transformUniversitySystemsData } from './transformers/universitySystemsTransformer';
import Container from '../../components/shared/Container';
import { useStandardSection } from './hooks/useStandardSection';
import { homeApi } from '../../services/homeService';
import SectionHeader from './components/SectionHeader';
import { SystemsContainer } from '../../components/shared/cards';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import { useGlobalCache } from '../../components/providers/CachedApiProvider';
import EmptyState from '../../components/shared/EmptyState';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const UniversitySystemsSection: React.FC = () => {
  const { t } = useTranslation('common');
  const { locale } = useLocale(); // Assuming useLocale is available here (imported below)
  const { cacheManager } = useGlobalCache();

  // 1. Stabilize Fetcher
  const fetcher = React.useMemo(() => () => homeApi.getUniversitySystemsData(locale), [locale]);

  const { data, loading } = useStandardSection<TransformedUniversitySystemsData>(
    'university-systems',
    fetcher,
    { transformData: transformUniversitySystemsData }
  );

  // 2. Prefetching Logic
  React.useEffect(() => {
    if (!data) return;

    const otherLocales = ['uz', 'ru', 'en'].filter(l => l !== locale);

    otherLocales.forEach(async (targetLocale) => {
      const cacheKey = `home-section-university-systems-http-${targetLocale}`;

      if (!cacheManager.has(cacheKey)) {
        try {
          const rawData = await homeApi.getUniversitySystemsData(targetLocale);
          cacheManager.set(cacheKey, rawData, 5); // 5 minutes TTL
        } catch (e) {
          console.warn(`Failed to prefetch university-systems for ${targetLocale}`, e);
        }
      }
    });
  }, [data, locale, cacheManager]);

  if (loading || !data) {
    return null; // Or a skeleton loader
  }

  const hasContent = data.systems.length > 0 || data.quickLinks.length > 0;

  return (
    <section className="py-8 md:py-12 bg-accent">
      <Container>
        <div className="lg:col-span-2">
          <SectionHeader
            title={t('universitySystems', 'Universitet tizimlari')}
            seeAllLink="/university-systems"
            seeAllText={t('seeAllUniversitySystems', 'Barcha tizimlar')}
            noContainer={true}
          />
        </div>

        {!hasContent ? (
          <EmptyState
            resourceKey="systems"
            icon={<GlobeAltIcon className="w-16 h-16" />}
          />
        ) : (
          <SystemsContainer
            systems={data.systems}
            quickLinks={data.quickLinks}
            variant="section"
          />
        )}
      </Container>
    </section>
  );
};

export default UniversitySystemsSection;