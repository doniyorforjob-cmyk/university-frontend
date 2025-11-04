import React from 'react';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import Sidebar from '../../components/shared/Sidebar';

const AppealsPage: React.FC = () => {
  const bannerImageUrl = 'https://picsum.photos/seed/picsum-appeals/1200/300';

  return (
    <div className="bg-gray-100">
      <div
        className="relative bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${bannerImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold">Arizalar, takliflar va shikoyatlar</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs
          items={[
            { label: 'Bosh sahifa', href: '/' },
            { label: 'Axborot xizmati', href: '#' },
            { label: 'Arizalar, takliflar va shikoyatlar' },
          ]}
        />

        <div className="flex flex-col lg:flex-row lg:space-x-8 mt-6">
          <div className="lg:w-3/4">
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Murojaat yuborish</h2>
              <p className="text-gray-700 mb-6">
                Ushbu sahifa orqali siz universitet rahbariyatiga yoki tegishli bo&apos;limlarga o&apos;z arizangizni, taklifingizni yoki shikoyatingizni yuborishingiz mumkin. Barcha murojaatlar belgilangan tartibda ko&apos;rib chiqiladi va sizga javob beriladi.
              </p>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="appealType" className="block text-sm font-medium text-gray-700 mb-1">Murojaat turi</label>
                    <select id="appealType" name="appealType" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>Ariza</option>
                      <option>Taklif</option>
                      <option>Shikoyat</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">F.I.Sh.</label>
                    <input type="text" name="fullName" id="fullName" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon raqam</label>
                    <input type="tel" name="phone" id="phone" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" id="email" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Murojaat matni</label>
                  <textarea id="message" name="message" rows={6} className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>
                <div className="mb-6">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">Fayl biriktirish</label>
                  <input type="file" name="file" id="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                </div>
                <div>
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Yuborish
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:w-1/4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppealsPage;