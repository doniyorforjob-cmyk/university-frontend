import { HomeFacultiesData } from '../../../api/homeApi';

export const transformFacultiesData = (apiData: any): HomeFacultiesData => {
  const faculties = apiData.faculties || apiData.data || apiData.departments || [];

  return {
    faculties: faculties.map((faculty: any) => ({
      id: faculty.id || Math.random(),
      name: faculty.name || faculty.title || '',
      image: faculty.image || faculty.image_url || faculty.photo || '',
      iconImage: faculty.iconImage || faculty.icon || faculty.logo || '',
      color: faculty.color || faculty.gradient || 'from-blue-500 to-blue-600'
    }))
  };
};