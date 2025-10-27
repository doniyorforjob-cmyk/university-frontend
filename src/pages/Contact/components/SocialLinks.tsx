import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

const SocialLinks: React.FC = () => {
  return (
    <div className="my-12">
        <h2 className="text-3xl font-bold text-center mb-8">Ijtimoiy tarmoqlar</h2>
        <div className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <FaFacebookF className="text-3xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors duration-300">
                <FaTwitter className="text-3xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition-colors duration-300">
                <FaInstagram className="text-3xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-colors duration-300">
                <FaLinkedinIn className="text-3xl" />
            </a>
        </div>
    </div>
  );
};

export default SocialLinks;