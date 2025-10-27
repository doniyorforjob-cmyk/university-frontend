import React from 'react';
import { FaUser, FaEnvelope, FaPencil } from 'react-icons/fa6';

const ContactForm: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
      <h2 className="text-3xl font-bold text-center mb-8">Biz bilan bog‘lanish</h2>
      <form>
        <div className="mb-6 relative">
          <FaUser className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          <input
            type="text"
            placeholder="Ismingiz"
            className="w-full p-3 pl-12 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>
        <div className="mb-6 relative">
          <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          <input
            type="email"
            placeholder="Elektron pochta"
            className="w-full p-3 pl-12 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>
        <div className="mb-6 relative">
          <FaPencil className="absolute top-5 left-4 text-gray-400" />
          <textarea
            placeholder="Xabaringiz"
            rows={5}
            className="w-full p-3 pl-12 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Yuborish
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;