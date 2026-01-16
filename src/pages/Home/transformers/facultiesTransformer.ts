import { HomeFacultiesData } from '../../../types/home.types';
import { getImageUrl } from '../../../utils/apiUtils';

export const transformFacultiesData = (facultiesData: any, departmentsData: any = []): HomeFacultiesData => {
  // If facultiesData contains both faculties and departments (new combined API response shape)
  const facultiesRaw = (facultiesData?.faculties !== undefined) ? facultiesData.faculties : facultiesData;
  const departmentsRaw = (facultiesData?.departments !== undefined) ? facultiesData.departments : departmentsData;

  const faculties = Array.isArray(facultiesRaw) ? facultiesRaw : (facultiesRaw?.data || []);
  const departments = Array.isArray(departmentsRaw) ? departmentsRaw : (departmentsRaw?.data || []);

  if (faculties.length === 0) {
    console.warn('Transformer: No faculties found in input data');
  }

  return {
    faculties: faculties.map((facultyRaw: any) => {
      const fFields = facultyRaw.fields || {};
      const fId = facultyRaw.uuid || facultyRaw.id;

      // Helper to ensure slug exists (same logic as in api/http/faculties.http.ts)
      const ensureSlug = (name: string, existingSlug?: string): string => {
        if (existingSlug && existingSlug.trim().length > 0) return existingSlug;
        return (name || '')
          .toLowerCase()
          .replace(/['"]/g, '')
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim();
      };

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
            if (Array.isArray(imgField)) return imgField[0]?.url || imgField[0]?.thumbnail_url || imgField[0]?.path || '';
            if (typeof imgField === 'object') return imgField.url || imgField.thumbnail_url || imgField.path || '';
            return '';
          };

          const deptTitle = dFields.title || deptRaw.title || '';
          return {
            id: deptRaw.uuid || deptRaw.id,
            title: deptTitle,
            slug: ensureSlug(deptTitle, dFields.slug || deptRaw.slug),
            image: getImageUrl(extractDUrl(dFields.image)),
            // Add other fields if needed by DepartmentGridCard, e.g. headName, phone which might be in dFields
            headName: dFields.head_name || dFields.manager || '',
            phone: dFields.phone || '',
            email: dFields.email || ''
          };
        });

      // Image extraction helper
      const extractUrl = (imgField: any) => {
        if (!imgField) return '';
        if (typeof imgField === 'string') return imgField;
        if (Array.isArray(imgField)) return imgField[0]?.url || imgField[0]?.thumbnail_url || imgField[0]?.path || '';
        if (typeof imgField === 'object') return imgField.url || imgField.thumbnail_url || imgField.path || '';
        return '';
      };

      const fName = fFields.title || fFields.name || facultyRaw.name || '';

      return {
        id: fId,
        name: fName,
        slug: ensureSlug(fName, fFields.slug || facultyRaw.slug),
        description: fFields.description || facultyRaw.description || '',
        image: getImageUrl(extractUrl(fFields.image)),
        icon: fFields.icon || facultyRaw.icon || '',
        departments: facultyDepartments
      };
    })
  };
};