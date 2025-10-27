import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF as FaFacebookFIcon, 
  FaTelegramPlane as FaTelegramPlaneIcon, 
  FaInstagram as FaInstagramIcon, 
  FaYoutube as FaYoutubeIcon 
} from 'react-icons/fa';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

// Type assertion to fix React 19 compatibility issue with react-icons
const FaFacebookF = FaFacebookFIcon as React.ElementType;
const FaTelegramPlane = FaTelegramPlaneIcon as React.ElementType;
const FaInstagram = FaInstagramIcon as React.ElementType;
const FaYoutube = FaYoutubeIcon as React.ElementType;

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src="/logo192.png" alt="NamDU Logo" className="h-12 mr-3" />
              <span className="text-xl font-bold tracking-tight">NamDTU</span>
            </Link>
            <p className="text-gray-400 text-sm">
              O&apos;zbekistonning yetakchi oliy ta&apos;lim muassasasi. Biz kelajak yetakchilarini tarbiyalaymiz.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Aloqa uchun</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Namangan+sh.,+Uychi+ko&apos;chasi,+316-uy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Namangan sh., Uychi ko&apos;chasi, 316-uy
                </a>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                <a href="tel:+998692288375" className="hover:text-white transition-colors">
                  +998 (69) 228-83-75
                </a>
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                <a href="mailto:info@namdu.uz" className="hover:text-white transition-colors">
                  info@namdu.uz
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Tezkor havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  Universitet haqida
                </Link>
              </li>
              <li>
                <Link to="/faculties" className="text-gray-400 hover:text-white transition-colors">
                  Fakultetlar
                </Link>
              </li>
              <li>
                <Link to="/admission" className="text-gray-400 hover:text-white transition-colors">
                  Qabul
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition-colors">
                  Yangiliklar
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Bizni kuzating</h3>
            <div className="flex space-x-4">
              <a href="/#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full">
                <FaFacebookF size={20} />
              </a>
              <a href="/#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full">
                <FaTelegramPlane size={20} />
              </a>
              <a href="/#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full">
                <FaInstagram size={20} />
              </a>
              <a href="/#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Namangan Davlat Texnika Universiteti. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-white text-sm">
              Maxfiylik siyosati
            </Link>
            <Link to="/terms-of-use" className="text-gray-500 hover:text-white text-sm">
              Foydalanish shartlari
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;