import React from 'react';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { useSettingsStore } from '../../../store/settingsStore';

const ContactInfo: React.FC = () => {
  const { settings } = useSettingsStore();
  const phone = settings?.contacts?.primaryPhone || "+998 69 234 1787";
  const email = settings?.contacts?.email || "info@namdti.uz";
  const address = settings?.contacts?.address || "Namangan sh., I.Karimov ko'chasi, 12-uy";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="group text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <PhoneIcon className="h-10 w-10 text-[#0E104B] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Telefon</h3>
        <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-gray-900/80 hover:text-primary transition-colors">
          {phone}
        </a>
      </div>
      <div className="group text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <EnvelopeIcon className="h-10 w-10 text-[#0E104B] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Elektron pochta</h3>
        <a href={`mailto:${email}`} className="text-gray-900/80 hover:text-primary transition-colors">
          {email}
        </a>
      </div>
      <div className="group text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <MapPinIcon className="h-10 w-10 text-[#0E104B] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Manzil</h3>
        <p className="text-gray-900/80">{address}</p>
      </div>
    </div>
  );
};

export default ContactInfo;