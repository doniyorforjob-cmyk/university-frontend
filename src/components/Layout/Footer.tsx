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
import { useFooterData } from '../../hooks/useFooterData';
import { SocialLink } from '../../types/footer';
import FooterSkeleton from './FooterSkeleton';
import Container from '../shared/Container';

// Ijtimoiy tarmoq ikonkalarini nomiga qarab qaytaruvchi komponent
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

// Ijtimoiy tarmoq ranglarini qaytaruvchi funksiya
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

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { data, isLoading, error } = useFooterData();

  if (isLoading) {
    return <FooterSkeleton />;
  }

  if (error) {
    return (
      <footer className="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100">
        <div className="max-w-screen-xl px-4 py-16 mx-auto text-center sm:px-6 lg:px-8">
          <p className="text-red-600">Xatolik yuz berdi: {error.message}</p>
        </div>
      </footer>
    );
  }

  if (!data) {
    return null; // Yoki boshqa biror "ma'lumot yo'q" xabarini ko'rsatish
  }

  const { contactInfo, socialLinks, linkGroups } = data;

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700">
      <Container className="py-16">
        {/* ==== 1-qator – logo + qisqacha ma'lumot + ijtimoiy tarmoqlar ==== */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link
              to="/"
              className="flex flex-col sm:flex-row sm:items-center mb-4 group transition-transform duration-300 hover:scale-105"
            >
              <img src="/images/logo.png" alt="Logo" className="h-20 w-20 sm:h-24 sm:w-24 mb-2 sm:mb-0 sm:mr-4 rounded-full transition-transform duration-300 group-hover:rotate-12 flex-shrink-0" />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-center sm:text-left">
                Namangan Davlat Texnika Universiteti
              </span>
            </Link>

            <p className="max-w-xs mt-4 text-base text-gray-300 leading-relaxed">
              O‘zbekistonning yetakchi oliy ta’lim muassasasi. Biz kelajak
              yetakchilarini tarbiyalaymiz.
            </p>

            {/* Ijtimoiy tarmoqlar */}
            <div className="flex mt-8 space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-2 rounded-lg bg-gray-700 text-gray-300 shadow-lg transition-all duration-300 ${getSocialColor(link.name)} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-gray-900`}
                  aria-label={link.name}
                >
                  <SocialIcon name={link.name} />
                </a>
              ))}
            </div>
          </div>

          {/* ==== 2-qator – ustunlar (Aloqa, Havolalar) ==== */}
          <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1 – Aloqa */}
            <div>
              <div className="flex items-center mb-4">
                <span className="w-1 h-5 bg-secondary-500 mr-3"></span>
                <p className="font-medium text-lg text-white">Aloqa uchun</p>
              </div>
              <ul className="flex flex-col space-y-3 text-base text-gray-300">
                <li className="flex items-start group">
                  <MapPinIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-gray-400 transition-colors duration-300 group-hover:text-white" />
                  <a
                    href={contactInfo.address.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:bg-gray-700/50 px-2 py-1 transition-all duration-300 focus:outline-none focus:text-white focus:bg-gray-700/50 -ml-2"
                  >
                    {contactInfo.address.text}
                  </a>
                </li>
                <li className="flex items-center group">
                  <PhoneIcon className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400 transition-colors duration-300 group-hover:text-white" />
                  <a
                    href={`tel:${contactInfo.phone.tel}`}
                    className="hover:text-white hover:bg-gray-700/50 px-2 py-1 transition-all duration-300 focus:outline-none focus:text-white focus:bg-gray-700/50 -ml-2"
                  >
                    {contactInfo.phone.number}
                  </a>
                </li>
                <li className="flex items-center group">
                  <EnvelopeIcon className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400 transition-colors duration-300 group-hover:text-white" />
                  <a
                    href={contactInfo.email.mailto}
                    className="hover:text-white hover:bg-gray-700/50 px-2 py-1 transition-all duration-300 focus:outline-none focus:text-white focus:bg-gray-700/50 -ml-2"
                  >
                    {contactInfo.email.address}
                  </a>
                </li>
              </ul>
            </div>

            {/* 2, 3, 4 – Havolalar guruhlari */}
            {linkGroups.map((group) => (
              <div key={group.id}>
                <div className="flex items-center mb-4">
                  <span className="w-1 h-5 bg-secondary-500 mr-3"></span>
                  <p className="font-medium text-lg text-white">{group.title}</p>
                </div>
                <nav className="flex flex-col space-y-2 text-base text-gray-300">
                  {group.links.map((link) => (
                    <Link
                      key={link.id}
                      to={link.url}
                      className="hover:text-white hover:bg-gray-700/50 hover:translate-x-1 px-2 py-1 transition-all duration-300 focus:outline-none focus:text-white focus:bg-gray-700/50 focus:translate-x-1 inline-block -ml-2"
                    >
                      {link.text}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* ==== Pastki qism – mualliflik huquqi ==== */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center">
            © {currentYear} <span className="font-semibold text-white">Namangan Davlat Texnika Universiteti</span>. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;