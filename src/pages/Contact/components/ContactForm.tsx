import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  UserIcon,
  PhoneIcon,
  PencilIcon,
  ArrowLeftIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';

const ContactForm: React.FC = () => {
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [userCode, setUserCode] = useState<string>('');

  useEffect(() => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
  }, []);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full h-full">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Biz bilan bog‘lanish
      </h2>

      <form className="space-y-6">
        {/* Ism */}
        <div className="relative group">
          <UserIcon className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-gray-900/50 group-focus-within:text-[#0E104B] transition-colors z-10" />
          <input
            type="text"
            placeholder="Ismingiz"
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#0E104B] transition-colors w-full pl-12"
          />
        </div>

        {/* Telefon raqami */}
        <div className="relative group">
          <PhoneIcon className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-gray-900/50 group-focus-within:text-[#0E104B] transition-colors z-10" />
          <input
            type="tel"
            placeholder="Telefon raqamingiz (+998 XX XXX XX XX)"
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#0E104B] transition-colors w-full pl-12"
          />
        </div>

        {/* Xabar */}
        <div className="relative group">
          <PencilIcon className="absolute top-5 left-4 w-5 h-5 text-gray-900/50 group-focus-within:text-[#0E104B] transition-colors z-10" />
          <textarea
            placeholder="Xabaringiz"
            rows={5}
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#0E104B] transition-colors w-full pl-12 resize-none"
          />
        </div>

        {/* CAPTCHA */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          {/* Generated Code */}
          <div className="flex-1 flex items-center justify-center h-full px-4 py-3 relative rounded-lg border-2 border-gray-300 bg-gray-100 shadow-inner">
            <KeyIcon className="w-5 h-5 text-gray-900/80 mr-2" />
            <code className="font-mono text-xl font-bold text-gray-900 tracking-wider select-none">
              {generatedCode || '......'}
            </code>
          </div>

          {/* Kod kiritish */}
          <div className="flex-1 relative group">
            <KeyIcon className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-gray-900/50 group-focus-within:text-[#22c55e] transition-colors z-10" />
            <input
              type="text"
              placeholder="Kodni kiriting"
              value={userCode}
              onChange={(e) =>
                setUserCode(e.target.value.replace(/\D/g, '').slice(0, 6))
              }
              maxLength={6}
              className="px-4 py-3 border-2 border-[#22c55e] rounded-lg focus:outline-none focus:border-[#22c55e] transition-colors w-full pl-12 font-mono text-lg"
            />
          </div>
        </div>

        {/* Kod holati */}
        {userCode && (
          <p
            className={`text-sm text-center font-medium transition-colors ${
              userCode === generatedCode ? 'text-[#22c55e]' : 'text-[#ef4444]'
            }`}
          >
            {userCode === generatedCode
              ? 'Kod to‘g‘ri!'
              : 'Kod noto‘g‘ri. Qayta urining.'}
          </p>
        )}

        {/* Tugmalar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg bg-transparent text-gray-700 hover:bg-gray-100 transition-all duration-300 gap-2 order-2 sm:order-1 group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Orqaga</span>
          </Link>

          <button
            type="submit"
            disabled={userCode !== generatedCode}
            className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg bg-[#0E104B] text-white hover:bg-[#0c0d3a] transition-all duration-300 w-full sm:w-auto order-1 sm:order-2"
          >
            {userCode === generatedCode ? 'Yuborish' : 'Kodni kiriting'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;