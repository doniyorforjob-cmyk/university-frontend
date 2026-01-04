import { HomeFacultiesData } from '../../../types/home.types';
import { getImageUrl } from '../../../utils/apiUtils';

export const transformFacultiesData = (facultiesData: any, departmentsData: any = []): HomeFacultiesData => {
  const faculties = Array.isArray(facultiesData) ? facultiesData : (facultiesData?.data || []);
  const departments = Array.isArray(departmentsData) ? departmentsData : (departmentsData?.data || []);

  return {
    faculties: faculties.map((facultyRaw: any) => {
      const fFields = facultyRaw.fields || {};
      const fId = facultyRaw.uuid || facultyRaw.id;

      // Filter departments for this faculty
      const facultyDepartments = departments
        .filter((deptRaw: any) => {
          const dFields = deptRaw.fields || {};
          // Check relation field. User said they use a relation. 
          // Usually relation fields come as an object or UUID.
          const rel = dFields.faculty || dFields.faculty_id || deptRaw.faculty_id;
          const relId = typeof rel === 'object' ? (rel.uuid || rel.id) : rel;
          return String(relId) === String(fId);
        })
        .map((deptRaw: any) => {
          const dFields = deptRaw.fields || {};
          return {
            id: deptRaw.uuid || deptRaw.id,
            title: dFields.title || deptRaw.title || '',
            image: getImageUrl(Array.isArray(dFields.image) ? dFields.image[0]?.url : (dFields.image?.url || ''))
          };
        });

      return {
        id: fId,
        name: fFields.title || fFields.name || facultyRaw.name || '',
        description: fFields.description || facultyRaw.description || '',
        image: getImageUrl(Array.isArray(fFields.image) ? fFields.image[0]?.url : (fFields.image?.url || '')),
        icon: fFields.icon || facultyRaw.icon || '',
        departments: facultyDepartments
      };
    })
  };
};