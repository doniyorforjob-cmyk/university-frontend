import React, { useEffect, useState } from 'react';
import { getDepartments } from '../../../api/departmentApi';
import { Department } from '../../../types/department';
import { FaPhone, FaEnvelope } from 'react-icons/fa6';

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (err) {
        setError('Bo\'limlarni yuklashda xatolik yuz berdi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Bo&apos;limlar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-2">Rektorat</h3>
          <p className="text-gray-600 mb-4">
            Rektor: Odiljon Mamatkarimov
          </p>
          <div className="mt-4 text-gray-600">
            <div className="flex items-center mb-2">
              <FaPhone className="mr-3 text-gray-400" />
              <span>+998 99 999 99 99</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-3 text-gray-400" />
              <span>rektorat@example.com</span>
            </div>
          </div>
        </div>
        {departments.map((department) => (
          <div
            key={department.id}
            className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{department.name}</h3>
            <p className="text-gray-600 mb-4">
              Bo&apos;lim boshlig&apos;i: {department.head}
            </p>
            <div className="mt-4 text-gray-600">
              {department.phone && (
                <div className="flex items-center mb-2">
                  <FaPhone className="mr-3 text-gray-400" />
                  <span>{department.phone}</span>
                </div>
              )}
              {department.email && (
                <div className="flex items-center">
                  <FaEnvelope className="mr-3 text-gray-400" />
                  <span>{department.email}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;