import React from 'react';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const ContactInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="group text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <PhoneIcon className="h-10 w-10 text-[#0E104B] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Telefon</h3>
        <p className="text-gray-900/80">+998 69 234 1787</p>
      </div>
      <div className="group text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <EnvelopeIcon className="h-10 w-10 text-[#0E104B] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Elektron pochta</h3>
        <p className="text-gray-900/80">info@namdti.uz</p>
      </div>
      <div className="group text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <MapPinIcon className="h-10 w-10 text-[#0E104B] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Manzil</h3>
        <p className="text-gray-900/80">Namangan sh., I.Karimov ko'chasi, 12-uy</p>
      </div>
    </div>
  );
};

export default ContactInfo;