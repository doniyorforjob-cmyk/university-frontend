import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import SectionTemplate from '@/components/templates/SectionTemplate';
import LeadershipList from './components/LeadershipList';
import ContactForm from './components/ContactForm';
import Container from '@/components/shared/Container';

const ContactPage: React.FC = () => {
  const { t } = useTranslation(['common', 'pages']);
  const { setBreadcrumbsData } = useGlobalLayout();

  useEffect(() => {
    setBreadcrumbsData([
      { label: t('home'), href: '/' },
      { label: t('pages:contact') },
    ]);

    return () => {
      setBreadcrumbsData(undefined);
    };
  }, [setBreadcrumbsData, t]);

  return (
    <Container className="py-8">
      <SectionTemplate
        parentTitle={t('home')}
        sectionTitle={t('pages:contact')}
        sectionType="info"
        items={[]}
        showSearch={false}
        showPagination={false}
        showSorting={false}
        showFilters={false}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="order-2 lg:order-1">
            <LeadershipList />
          </div>
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </SectionTemplate>
    </Container>
  );
};

export default ContactPage;