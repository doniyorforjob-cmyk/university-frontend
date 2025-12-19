import React, { useEffect } from 'react';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import DepartmentList from './components/DepartmentList';
import ContactForm from './components/ContactForm';
import Container from '@/components/shared/Container';

const ContactPage: React.FC = () => {
  const { setBannerData, setBreadcrumbsData } = useGlobalLayout();

  useEffect(() => {
    setBannerData({
      title: "Bog'lanish",
      backgroundImage: "https://img.freepik.com/free-photo/view-3d-school-building_23-2151038198.jpg?t=st=1719480901~exp=1719484501~hmac=0924c8a1813354343e743845a74519e46d3b83e46b9a447c21a5a8c78b54853a&w=1380"
    });

    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: "Bog'lanish" },
    ]);

    return () => {
      setBannerData(undefined);
      setBreadcrumbsData(undefined);
    };
  }, [setBannerData, setBreadcrumbsData]);

  return (
    <Container className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DepartmentList />
        <ContactForm />
      </div>
    </Container>
  );
};

export default ContactPage;