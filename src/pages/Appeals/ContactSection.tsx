import React from 'react';
import { motion } from 'framer-motion';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { useSettingsStore } from '../../store/settingsStore';
import { formatPhone } from '../../utils/format';

export const ContactSection: React.FC = () => {
  const { settings } = useSettingsStore();

  const contactInfo = {
    phone: settings?.contacts?.primaryPhone || '+998 69 227 00 00',
    email: settings?.contacts?.email || 'info@namdtu.uz',
    address: settings?.contacts?.address || 'Namangan shahri, Kosonsoy ko\'chasi, 12',
    workingHours: {
      weekdays: settings?.contacts?.workingHours?.weekdays || 'Dushanba - Juma: 08:00 - 17:00',
      weekend: settings?.contacts?.workingHours?.saturday || 'Shanba: 08:00 - 13:00',
      closed: settings?.contacts?.workingHours?.sunday || 'Yakshanba: Dam olish kuni'
    }
  };

  const departments = [
    {
      name: 'Rektorat',
      phone: '+998 69 227 00 01',
      email: 'rektor@namdtu.uz',
      responsibility: 'Universitet rahbariyati, strategik qarorlar'
    },
    {
      name: 'O\'quv bo\'limi',
      phone: '+998 69 227 00 02',
      email: 'oquv@namdtu.uz',
      responsibility: 'Talabalar, dars jadvali, baholash'
    },
    {
      name: 'Ilmiy bo\'lim',
      phone: '+998 69 227 00 03',
      email: 'ilmiy@namdtu.uz',
      responsibility: 'Ilmiy tadqiqotlar, grantlar, konferensiyalar'
    },
    {
      name: 'Moliya bo\'limi',
      phone: '+998 69 227 00 04',
      email: 'moliya@namdtu.uz',
      responsibility: 'To\'lovlar, stipendiya, grantlar'
    },
    {
      name: 'Axborot xizmati',
      phone: '+998 69 227 00 05',
      email: 'axborot@namdtu.uz',
      responsibility: 'Sayt, ijtimoiy tarmoqlar, matbuot'
    }
  ];

  return (
    <div className="bg-white shadow-lg p-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Aloqa malumotlari
        </h3>
        <p className="text-gray-600">
          Qo&apos;himcha savollar uchun murojaat qilishingiz mumkin
        </p>
      </div>

      {/* Main Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center p-4 bg-blue-50 rounded-lg"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
            <PhoneIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Telefon</h4>
          <a
            href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {formatPhone(contactInfo.phone)}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center p-4 bg-green-50 rounded-lg"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
            <EnvelopeIcon className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-green-600 hover:text-green-800 transition-colors break-all"
          >
            {contactInfo.email}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center p-4 bg-purple-50 rounded-lg md:col-span-2"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
            <MapPinIcon className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Manzil</h4>
          <p className="text-purple-600">{contactInfo.address}</p>
        </motion.div>
      </div>

      {/* Working Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-50 rounded-lg p-6 mb-8"
      >
        <div className="flex items-center mb-4">
          <ClockIcon className="w-6 h-6 text-gray-600 mr-3" />
          <h4 className="text-lg font-semibold text-gray-900">Ish vaqti</h4>
        </div>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-medium">Dushanba - Juma:</span> {contactInfo.workingHours.weekdays}</p>
          <p><span className="font-medium">Shanba:</span> {contactInfo.workingHours.weekend}</p>
          <p><span className="font-medium">Yakshanba:</span> {contactInfo.workingHours.closed}</p>
        </div>
      </motion.div>

      {/* Department Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center mb-6 text-gray-900">
          <UserGroupIcon className="w-6 h-6 text-gray-600 mr-3" />
          <h4 className="text-xl font-semibold">Bo&apos;limlar bo&apos;yicha kontaktlar</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h5 className="font-semibold text-gray-900 mb-2">{dept.name}</h5>
              <div className="space-y-1 text-sm text-gray-600 mb-3">
                <p>
                  <span className="font-medium">Tel:</span>{' '}
                  <a
                    href={`tel:${dept.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {formatPhone(dept.phone)}
                  </a>
                </p>
                <p>
                  <span className="font-medium">Email:</span>{' '}
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-blue-600 hover:text-blue-800 break-all"
                  >
                    {dept.email}
                  </a>
                </p>
              </div>
              <p className="text-xs text-gray-500">{dept.responsibility}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactSection;