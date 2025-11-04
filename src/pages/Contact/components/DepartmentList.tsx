import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '../../../api/departmentApi';
import {
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';

const DepartmentList: React.FC = () => {
  const {
    data: departments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
  });

  if (isLoading) {
    return (
      <div className="p-8 rounded-2xl w-full text-center py-12">
        <div className="loading loading-spinner text-[#0E104B] loading-lg"></div>
        <p className="mt-3 text-gray-900/80 font-medium">Yuklanmoqda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 rounded-2xl w-full text-center py-12">
        <p className="text-[#ef4444] font-medium">
          Bo‘limlarni yuklashda xatolik yuz berdi.
        </p>
      </div>
    );
  }

  const lineColors = [
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'bg-info',
  ];

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Bo‘limlar
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Rektorat */}
        <div className="relative flex items-start group">
          <div
            className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
          ></div>
          <div
            className="absolute left-[-6px] top-8 w-3 h-3 bg-primary rounded-full shadow-md group-hover:scale-125 transition-transform duration-300"
          ></div>
          <div className="ml-6 pl-2 w-full bg-white p-6 rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-3">
              <BuildingOffice2Icon className="w-5 h-5 text-[#0E104B] mr-2" />
              <h3 className="text-xl font-bold text-[#0E104B]">Rektorat</h3>
            </div>
            <p className="text-gray-900 mb-3 flex items-center text-sm">
              <UserIcon className="w-4 h-4 mr-2 text-secondary" />
              <span>
                Rektor: <strong>Odiljon Mamatkarimov</strong>
              </span>
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-900/80">
                <PhoneIcon className="w-4 h-4 mr-3 text-[#0E104B]" />
                <span className="font-medium">+998 99 999 99 99</span>
              </div>
              <div className="flex items-center text-gray-900/80">
                <EnvelopeIcon className="w-4 h-4 mr-3 text-secondary" />
                <span className="font-medium">rektorat@example.com</span>
              </div>
            </div>
          </div>
        </div>
        {/* Boshqa bo‘limlar */}
        {departments?.map((department, index) => (
          <div key={department.id} className="relative flex items-start group">
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 rounded-full opacity-80 group-hover:opacity-100 transition-opacity ${
                lineColors[index % lineColors.length]
              }`}
            ></div>
            <div
              className={`absolute left-[-6px] top-8 w-3 h-3 rounded-full shadow-md group-hover:scale-125 transition-transform duration-300 ${
                lineColors[index % lineColors.length]
              }`}
            ></div>
            <div className="ml-6 pl-2 w-full bg-white p-6 rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-3">
                <BuildingOffice2Icon className="w-5 h-5 text-gray-900/70 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">
                  {department.name}
                </h3>
              </div>
              <p className="text-gray-900 mb-3 flex items-center text-sm">
                <UserIcon className="w-4 h-4 mr-2 text-gray-900/70" />
                <span>
                  Bo‘lim boshlig‘i: <strong>{department.head}</strong>
                </span>
              </p>
              <div className="space-y-2 text-sm">
                {department.phone && (
                  <div className="flex items-center text-gray-900/80">
                    <PhoneIcon className="w-4 h-4 mr-3 text-[#0E104B]" />
                    <span className="font-medium">{department.phone}</span>
                  </div>
                )}
                {department.email && (
                  <div className="flex items-center text-gray-900/80">
                    <EnvelopeIcon className="w-4 h-4 mr-3 text-secondary" />
                    <span className="font-medium">{department.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;