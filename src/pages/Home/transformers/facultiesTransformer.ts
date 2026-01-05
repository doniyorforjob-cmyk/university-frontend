import { HomeFacultiesData } from '../../../types/home.types';
import { getImageUrl } from '../../../utils/apiUtils';

export const transformFacultiesData = (facultiesData: any, departmentsData: any = []): HomeFacultiesData => {
  console.log('Transforming faculties:', { facultiesData, departmentsData });
  const faculties = Array.isArray(facultiesData) ? facultiesData : (facultiesData?.data || []);
  const departments = Array.isArray(departmentsData) ? departmentsData : (departmentsData?.data || []);

  if (faculties.length === 0) {
    console.warn('Transformer: No faculties found in input data');
  }

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

          // Image extraction helper (local within map or we can move it up)
          const extractDUrl = (imgField: any) => {
            if (!imgField) return '';
            if (typeof imgField === 'string') return imgField;
            if (Array.isArray(imgField)) return imgField[0]?.url || imgField[0]?.path || '';
            if (typeof imgField === 'object') return imgField.url || imgField.path || '';
            return '';
          };

          return {
            id: deptRaw.uuid || deptRaw.id,
            title: dFields.title || deptRaw.title || '',
            image: getImageUrl(extractDUrl(dFields.image))
          };
        });

      // Image extraction helper
      const extractUrl = (imgField: any) => {
        if (!imgField) return '';
        if (typeof imgField === 'string') return imgField;
        if (Array.isArray(imgField)) return imgField[0]?.url || imgField[0]?.path || '';
        if (typeof imgField === 'object') return imgField.url || imgField.path || '';
        return '';
      };

      return {
        id: fId,
        name: fFields.title || fFields.name || facultyRaw.name || '',
        description: fFields.description || facultyRaw.description || '',
        image: getImageUrl(extractUrl(fFields.image)),
        icon: fFields.icon || facultyRaw.icon || '',
        departments: facultyDepartments
      };
    })
  };
};