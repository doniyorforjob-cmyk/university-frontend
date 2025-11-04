import React from 'react';
import Container from '../../components/shared/Container';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { useStructureData } from '../../hooks/useStructureData';
// import PersonCard from './components/PersonCard';
import { Department } from '../../types/structure';

const OrganizationalStructurePage: React.FC = () => {
  const { data, isLoading, isError, error } = useStructureData();

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-500">Yuklanmoqda...</p>;
    }

    if (isError) {
      // Xatolikni to'g'ri qayta ishlash
      const errorMessage = error instanceof Error ? error.message : 'Noma\'lum xatolik yuz berdi.';
      return <p className="text-center text-red-500">Xatolik: {errorMessage}</p>;
    }

    return (
      <div className="space-y-12">
        {data?.map((department: Department) => (
          <div key={department.id}>
            <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4 mb-6">
              {department.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {/* {department.members.map(member => (
                // <PersonCard key={member.id} member={member} />
              ))} */}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Universitet' },
          { label: 'Tashkiliy tuzilma' },
        ]}
      />
      <h1 className="text-3xl font-bold my-8 text-center">Tashkiliy tuzilma</h1>
      {renderContent()}
    </Container>
  );
};

export default OrganizationalStructurePage;