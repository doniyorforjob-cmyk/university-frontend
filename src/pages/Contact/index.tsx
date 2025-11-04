import React from 'react';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import Banner from '../../components/shared/Banner';
import DepartmentList from './components/DepartmentList';
import ContactForm from './components/ContactForm';

const ContactPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Bosh sahifa', path: '/' },
    { label: "Bog'lanish", path: '/contact' },
  ];

  return (
    <div className="bg-gray-100">
      <Banner
        title="Bog'lanish"
        backgroundImage="https://img.freepik.com/free-photo/view-3d-school-building_23-2151038198.jpg?t=st=1719480901~exp=1719484501~hmac=0924c8a1813354343e743845a74519e46d3b83e46b9a447c21a5a8c78b54853a&w=1380"
      />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <DepartmentList />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;