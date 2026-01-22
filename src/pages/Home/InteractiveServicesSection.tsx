import React from 'react';
import PrefetchLink from '../../components/shared/PrefetchLink';
import { useTranslation } from 'react-i18next';
import Container from '../../components/shared/Container';
import SectionHeader from './components/SectionHeader';
import { AOS_CONFIG } from '../../config/constants';
import { useStandardSection } from './hooks/useStandardSection';
import { homeApi } from '../../services/homeService';
import { getLocalized } from '../../utils/apiUtils';
import { useLocale } from '../../contexts/LocaleContext';
import EmptyState from '../../components/shared/EmptyState';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { transformInteractiveServicesData } from './transformers/interactiveServicesTransformer';
import { SectionSkeleton } from './components/SectionSkeleton';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: string;
}

const svgMap: Record<string, string> = {
  BookOpenIcon: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-16 h-16"><path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>`,
  ComputerDesktopIcon: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-16 h-16"><path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/></svg>`,
  DocumentTextIcon: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-16 h-16"><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>`,
  UserIcon: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-16 h-16"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>`,
  EnvelopeIcon: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-16 h-16"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>`,
  BriefcaseIcon: `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-16 h-16"><path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"/></svg>`,
};

const InteractiveServicesSection = () => {
  const { t } = useTranslation(['common', 'pages']);
  const { locale } = useLocale();

  const { data, loading } = useStandardSection(
    'interactive-services',
    homeApi.getInteractiveServicesData,
    { transformData: transformInteractiveServicesData, keepPreviousData: true }
  );

  if (loading && !data) {
    return <SectionSkeleton sectionType="interactive-services" />;
  }

  if (!data) return null;

  const services = (data?.services || []) as ServiceItem[];
  const cardColors = ['#4F99DD', '#2FA5AD', '#697FD7', '#329CC6'];

  return (
    <div className="pt-8 md:pt-12">
      <SectionHeader
        title={t('pages:interactiveServices')}
        seeAllLink="/services"
        seeAllText={t('common:seeAllServices')}
      />
      <Container>
        {services.length === 0 && (
          <EmptyState
            resourceKey="services"
            icon={<ComputerDesktopIcon className="w-16 h-16" />}
          />
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service: any, index: number) => {
            const backgroundColor = service.color && service.color.startsWith('#')
              ? service.color
              : cardColors[index % cardColors.length];

            const rawSvg = service.icon.startsWith('<svg')
              ? service.icon
              : svgMap[service.icon] ||
              `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-16 h-16"><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>`;

            const svgHtml = rawSvg;

            return (
              <PrefetchLink to={service.href} key={service.id} className="group" prefetch={true}>
                <div
                  className="g-card _service _n1 relative p-6 min-h-[145px] flex items-center overflow-hidden transition-all duration-300 hover:shadow-md"
                  {...(AOS_CONFIG.enabled && {
                    'data-aos': AOS_CONFIG.defaultAnimation,
                    'data-aos-delay': `${index * AOS_CONFIG.staggerDelay}`,
                    'data-aos-duration': AOS_CONFIG.defaultDuration,
                  })}
                  style={{ backgroundColor }}
                >
                  <div className="flex items-center z-10 w-full">
                    <div className="g-card-image mr-4 flex-shrink-0 text-white [&>svg]:w-16 [&>svg]:h-16 [&_path]:fill-none [&_path]:stroke-white [&_path]:stroke-[1.5]">
                      <div dangerouslySetInnerHTML={{ __html: svgHtml }} />
                    </div>
                    <div className="g-card-info flex-1 min-w-0">
                      <h4 className="text-white text-xl font-bold truncate pr-2">{getLocalized(service.title, locale)}</h4>
                      <span className="text-white text-base line-clamp-3 opacity-90 block leading-snug">
                        {getLocalized(service.description, locale)}
                      </span>
                    </div>
                  </div>

                  <div className="g-card-alpha absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
                    <div
                      className="w-32 h-32 opacity-15 [&>svg]:w-32 [&>svg]:h-32 [&_path]:fill-none [&_path]:stroke-white [&_path]:stroke-1"
                      style={{
                        filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.18))',
                        maskImage: 'linear-gradient(to bottom, black 15%, black 55%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 15%, black 55%, transparent 100%)',
                        maskSize: '100% 100%',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: svgHtml,
                      }}
                    />
                  </div>
                </div>
              </PrefetchLink>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default InteractiveServicesSection;