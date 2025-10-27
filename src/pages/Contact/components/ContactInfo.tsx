import React from 'react';
import { FaPhone, FaEnvelope, FaMapLocationDot } from 'react-icons/fa6';

const ContactInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="group text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <FaPhone className="text-4xl text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-semibold mb-2">Telefon</h3>
        <p className="text-gray-600">+998 69 234 1787</p>
      </div>
      <div className="group text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <FaEnvelope className="text-4xl text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-semibold mb-2">Elektron pochta</h3>
        <p className="text-gray-600">info@namdti.uz</p>
      </div>
      <div className="group text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <FaMapLocationDot className="text-4xl text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-semibold mb-2">Manzil</h3>
        <p className="text-gray-600">Namangan sh., I.Karimov ko&apos;chasi, 12-uy</p>
      </div>
    </div>
  );
};

export default ContactInfo;