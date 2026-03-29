import React from 'react';

interface OrganizationalStructureTreeProps {
  structure: {
    rector: any;
    prorektors: any[];
    dekans: any[];
    kafedras: any[];
    departments: any[];
  };
}

export const OrganizationalStructureTree: React.FC<OrganizationalStructureTreeProps> = ({ structure }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 via-yellow-500 to-purple-500"></div>

        {/* Timeline Items */}
        <div className="space-y-16">
          {/* Rektorat - Level 1 */}
          <div className="relative flex items-center space-x-8">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <a href="#" className="block bg-gradient-to-r from-white to-blue-50 rounded-none p-6 border-2 border-blue-200 flex-1 hover:bg-blue-100 transition-all duration-300 max-w-md" aria-label="Rektor haqida batafsil"> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={structure.rector.imageUrl}
                    alt={structure.rector.name}
                    className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{structure.rector.position}</h3>
                  <p className="text-gray-700 font-medium text-base mb-2">{structure.rector.name}</p>
                </div>
              </div>
            </a>
          </div>

          {/* Prorektorlar - Level 2 */}
          <div className="relative flex items-center space-x-8">
            <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Prorektorlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {structure.prorektors.map((prorector, index) => (
                  <a key={index} href="#" className="block bg-gradient-to-br from-white to-green-50 rounded-none p-5 border-2 border-green-200 hover:bg-green-100 hover:scale-105 transition-all duration-300" aria-label="Prorektor haqida batafsil"> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <img
                          src={prorector.imageUrl}
                          alt={prorector.name}
                          className="w-20 h-20 rounded-full border-4 border-green-500 object-cover shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="font-semibold text-green-800 text-base mb-1">{prorector.position}</div>
                      <div className="text-gray-700 font-medium text-sm mb-2">{prorector.name}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Dekanlar - Level 3 */}
          <div className="relative flex items-center space-x-8">
            <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Fakultetlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {structure.dekans.map((dekan, index) => (
                  <a key={index} href="#" className="block bg-gradient-to-br from-white to-yellow-50 rounded-none p-5 border-2 border-yellow-200 hover:bg-yellow-100 hover:scale-105 transition-all duration-300" aria-label="Dekan haqida batafsil"> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                    <div className="text-center">
                      <div className="relative inline-block mb-3">
                        <img
                          src={dekan.imageUrl}
                          alt={dekan.name}
                          className="w-14 h-14 rounded-full border-3 border-yellow-500 object-cover shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="font-bold text-yellow-800 text-sm mb-2 leading-tight">{dekan.faculty}</div>
                      <div className="text-gray-600 font-medium text-sm mb-3">{dekan.name}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Kafedralar - Level 4 */}
          <div className="relative flex items-center space-x-8">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Kafedralar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {structure.kafedras.map((kafedra, index) => (
                  <a key={index} href="#" className="block bg-gradient-to-br from-white to-gray-50 rounded-none p-4 border-2 border-gray-300 hover:bg-gray-100 hover:scale-105 transition-all duration-300" aria-label="Kafedra haqida batafsil"> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                    <div className="text-center">
                      <div className="font-bold text-gray-800 text-sm mb-2">{kafedra.faculty}</div>
                      <div className="text-xs text-gray-500 font-semibold">{kafedra.name}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Yordamchi bo'limlar - Level 5 */}
          <div className="relative flex items-center space-x-8">
            <div className="flex-shrink-0 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Yordamchi bo'limlar va markazlar</h3> {/* eslint-disable-line react/no-unescaped-entities */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {structure.departments.map((department, index) => (
                  <a key={index} href="#" className="block bg-gradient-to-br from-white to-purple-50 rounded-none p-4 border-2 border-purple-300 hover:bg-purple-100 hover:scale-105 transition-all duration-300" aria-label="Bo'lim haqida batafsil"> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                    <div className="text-center">
                      <div className="font-bold text-gray-800 text-sm mb-2">{department.faculty}</div>
                      <div className="text-xs text-gray-500 font-semibold">{department.name}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};