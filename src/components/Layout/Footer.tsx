import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTelegramPlane,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from 'react-icons/fa';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { useSettingsStore } from '../../store/settingsStore';
import { useFooterData } from '../../hooks/useFooterData';
import { SocialLink } from '../../types/footer.types';
import { getLocalized } from '../../utils/apiUtils';
import { useLocale } from '../../contexts/LocaleContext';
import FooterSkeleton from './FooterSkeleton';
import Container from '../shared/Container';
import PrefetchLink from '../shared/PrefetchLink';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();
  const { data, loading: footerLoading, error } = useFooterData();
  const { settings, isLoading: settingsLoading } = useSettingsStore();
  const { locale } = useLocale();

  const isLoading = footerLoading || settingsLoading;

  if (isLoading) {
    return <FooterSkeleton />;
  }

  // Graceful error handling: log error but try to render what we have (e.g. settings)
  if (error) {
    console.error("Footer API Error:", error);
  }

  // Fallback data if API fails
  const contactInfo = settings?.contacts || {
    address: '',
    primaryPhone: '',
    email: ''
  };
  const socialLinks = settings?.socials || [];
  const linkGroups = data?.linkGroups || [];
  const copyrightText = (data as any)?.copyright || settings?.footer?.copyright || `© ${currentYear} ${settings?.siteName || "Namangan Davlat Texnika Universiteti"}.`;

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <PrefetchLink
              to="/"
              className="flex items-center gap-3 mb-6 group transition-colors"
            >
              <div className="flex-shrink-0">
                {settings?.logo ? (
                  <img src={settings.logo} alt="Logo" className="h-20 w-20 sm:h-24 sm:w-24 object-contain rounded-full" />
                ) : (
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gray-700 animate-pulse" />
                )}
              </div>
              <div className="flex flex-col justify-center h-20 sm:h-24">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-[1.05] tracking-tight whitespace-pre-line">
                  {t('universityName')}
                </h1>
              </div>
            </PrefetchLink>

            <p className="max-w-xs mt-4 text-base text-gray-300 leading-relaxed">
              {settings?.mission || settings?.siteDescription || ""}
            </p>

            <div className="flex mt-8 space-x-4">
              {socialLinks.map((link: any) => (
                <a
                  key={link.name || link.id}
                  href={link.url || link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-2 rounded-lg bg-gray-700 text-gray-300 shadow-lg transition-all duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-gray-900`}
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.icon ? (
                    <img
                      src={link.icon}
                      alt={link.name}
                      className="h-5 w-5 object-contain filter brightness-0 invert group-hover:filter-none"
                    />
                  ) : (
                    // Fallback to react-icons if using local data, or text
                    <SocialIcon name={link.name} />
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            {(settings?.contacts?.primaryPhone || settings?.contacts?.email || settings?.contacts?.address) && (
              <div>
                <div className="flex items-center mb-4">
                  <span className="w-1 h-5 bg-secondary-500 mr-3"></span>
                  <p className="font-medium text-lg text-white">{t('common:contact')}</p>
                </div>
                <ul className="flex flex-col space-y-3 text-base text-gray-300">
                  {settings?.contacts?.address && (
                    <li className="flex items-start group">
                      <MapPinIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-gray-400 transition-colors duration-300 group-hover:text-white" />
                      <a
                        href={settings?.contacts?.googleMapsUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white hover:bg-gray-700/50 px-2 py-1 transition-all duration-300 focus:outline-none focus:text-white focus:bg-gray-700/50 -ml-2"
                      >
                        {settings?.contacts?.address}
                      </a>
                    </li>
                  )}
                  {settings?.contacts?.primaryPhone && (
                    <li className="flex items-center group">
                      <PhoneIcon className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400 transition-colors duration-300 group-hover:text-white" />
                      <a
                        href={`tel:${settings?.contacts?.primaryPhone?.replace(/[^0-9+]/g, '') || ""}`}
                        className="hover:text-white hover:bg-gray-700/50 px-2 py-1 transition-all duration-300 focus:outline-none focus:text-white focus:bg-gray-700/50 -ml-2"
                      >
                        {settings?.contacts?.primaryPhone}
                      </a>
                    </li>
                  )}
                  {settings?.contacts?.email && (
                    <li className="flex items-center group">
                      <EnvelopeIcon className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400 transition-colors duration-300 group-hover:text-white" />
                      <a
                        href={`mailto:${settings?.contacts?.email || ""}`}
                        className="hover:text-white hover:bg-gray-700/50 px-2 py-1 transition-all duration-300 focus:outline-none focus:text-white focus:bg-gray-700/50 -ml-2"
                      >
                        {settings?.contacts?.email}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {linkGroups
              .filter(group => {
                const groupTitle = getLocalized(group.title, locale);
                const contactTitle = t('common:contact');
                // Filter out if it's explicitly "Aloqa uchun" or matches translation
                return groupTitle !== contactTitle && group.title !== 'Aloqa uchun';
              })
              .map((group) => (
                <div key={group.id}>
                  <div className="flex items-center mb-4">
                    <span className="w-1 h-5 bg-secondary-500 mr-3"></span>
                    <p className="font-medium text-lg text-white">{getLocalized(group.title, locale)}</p>
                  </div>
                  <nav className="flex flex-col space-y-2 text-base text-gray-300">
                    {group.links.map((link) => (
                      <PrefetchLink
                        key={link.id}
                        to={link.url}
                        prefetch={true}
                        className="hover:text-white hover:bg-gray-700/50 hover:translate-x-1 px-2 py-1 transition-all duration-300 focus:outline-none focus:text-white focus:bg-gray-700/50 focus:translate-x-1 inline-block -ml-2"
                      >
                        {getLocalized(link.text, locale)}
                      </PrefetchLink>
                    ))}
                  </nav>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center">
            {copyrightText}
          </p>
        </div>
      </Container>
    </footer>
  );
};

const SocialIcon: React.FC<{ name: SocialLink['name'] }> = ({ name }) => {
  const iconClass = "w-6 h-6 transition-transform duration-300 group-hover:scale-110";

  switch (name) {
    case 'Facebook':
      return <FaFacebookF className={iconClass} />;
    case 'Telegram':
      return <FaTelegramPlane className={iconClass} />;
    case 'Instagram':
      return <FaInstagram className={iconClass} />;
    case 'YouTube':
      return <FaYoutube className={iconClass} />;
    case 'Twitter':
      return <FaTwitter className={iconClass} />;
    default:
      return null;
  }
};

const getSocialColor = (name: SocialLink['name']): string => {
  switch (name) {
    case 'Facebook':
      return 'hover:bg-[#1877F2] hover:text-white';
    case 'Telegram':
      return 'hover:bg-[#0088cc] hover:text-white';
    case 'Instagram':
      return 'hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white';
    case 'YouTube':
      return 'hover:bg-[#FF0000] hover:text-white';
    case 'Twitter':
      return 'hover:bg-[#1DA1F2] hover:text-white';
    default:
      return 'hover:bg-gray-700 hover:text-white';
  }
};

export default Footer;