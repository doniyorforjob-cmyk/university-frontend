import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRightIcon,
  BookOpenIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  UserIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import Container from '../../components/shared/Container';
import { useInteractiveServicesData } from '../../hooks/useInteractiveServicesData';

type HeroIconType = React.ComponentType<React.ComponentProps<'svg'>>;

const iconMap: Record<string, HeroIconType> = {
  BookOpenIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  UserIcon,
  EnvelopeIcon,
  BriefcaseIcon,
};

const InteractiveServicesSection = () => {
  const { t } = useTranslation();
  const { services, loading, error } = useInteractiveServicesData();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center text-lg text-gray-900">
          Ma&apos;lumotlar yuklanmoqda...
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-lg text-[#ef4444] flex items-center justify-center">
          <ExclamationTriangleIcon className="h-6 w-6 mr-2" /> {error}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || ExclamationTriangleIcon;
          return (
            <Link to={service.href} key={service.id} className="group">
              <div className="h-full p-6 bg-white rounded-lg transform hover:-translate-y-2 transition-all duration-300 flex flex-row items-start shadow-lg hover:shadow-2xl border border-gray-200 hover:border-blue-500">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-blue-600 to-blue-800 text-white transform transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0E104B] transition-colors duration-300">{service.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{service.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Container>
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-1 bg-primary h-8 mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('interactiveServices')}
            </h2>
          </div>
          <Link
            to="/services"
            className="group inline-flex items-center text-[#0E104B] font-semibold transform transition-all duration-200 hover:scale-105 hover:text-[#0E104B]-focus"
          >
            {t('seeAllServices')}
            <ChevronRightIcon className="w-5 h-5 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
        {renderContent()}
      </Container>
    </div>
  );
};

export default InteractiveServicesSection;