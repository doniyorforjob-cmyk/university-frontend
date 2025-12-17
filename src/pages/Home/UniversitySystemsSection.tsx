import React from 'react';
import { TransformedUniversitySystemsData, transformUniversitySystemsData } from './transformers/universitySystemsTransformer';
import Container from '../../components/shared/Container';
import { useStandardSection } from './hooks/useStandardSection';
import { homeApi } from '../../services/homeService';
import SectionHeader from './components/SectionHeader';
import { SystemsContainer } from '../../components/shared/cards';
import { useTranslation } from 'react-i18next';

const UniversitySystemsSection: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading } = useStandardSection<TransformedUniversitySystemsData>(
    'university-systems',
    homeApi.getUniversitySystemsData,

  );

  if (loading || !data) {
    return null; // Or a skeleton loader
  }

  return (
    <section className="py-16 bg-accent">
      <Container>
        <div className="lg:col-span-2">
          <SectionHeader
            title={t('Universitet tizimlari')}
            seeAllLink="/university-systems"
            seeAllText={t('seeAllUniversitySystems')}
            noContainer={true}
          />
        </div>

        <SystemsContainer
          systems={data.systems}
          quickLinks={data.quickLinks}
          variant="section"
        />
      </Container>
    </section>
  );
};

export default UniversitySystemsSection;