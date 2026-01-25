import apiClient from '../client';
import { Department } from '../../types/department.types';

// SLUG MAPPING FOR ADMINISTRATIVE SECTIONS - MULTI-LANGUAGE
const SECTION_SLUG_MAP: Record<string, string> = {
  // Uzbek
  'oʻquv-uslubiy': 'oquv-uslubiy-boshqarma',
  'o\'quv-uslubiy': 'oquv-uslubiy-boshqarma',
  'monitoring': 'monitoring-va-ichki-nazorat',
  'yoshlar bilan ishlash': 'yoshlar-bilan-ishlash-bolimi',
  'kadrlar': 'kadrlar-bolimi',
  'reja-moliya': 'reja-moliya-bolimi',
  'sirtqi': 'sirtqi-bolim',
  'magistratura': 'magistratura-bolimi',
  'devonxona': 'devonxona',
  'yuriskonsult': 'yurist',
  'buxgalteriya': 'buxgalteriya',
  'ilmiy-tadqiqot': 'ilmiy-tadqiqot-bolimi',
  'xalqaro': 'xalqaro-hamkorlik-bolimi',
  'marketing': 'marketing-bolimi',

  // Russian
  'учебно-методи': 'oquv-uslubiy-boshqarma',
  'мониторинг': 'monitoring-va-ichki-nazorat',
  'молодеж': 'yoshlar-bilan-ishlash-bolimi',
  'кадров': 'kadrlar-bolimi',
  'планово-финан': 'reja-moliya-bolimi',
  'заочн': 'sirtqi-bolim',
  'магистратур': 'magistratura-bolimi',
  'канцеляр': 'devonxona',
  'юрист': 'yurist',
  'бухгалтер': 'buxgalteriya',
  'научн': 'ilmiy-tadqiqot-bolimi',
  'международ': 'xalqaro-hamkorlik-bolimi',
  'маркетинг': 'marketing-bolimi',

  // English
  'academic': 'oquv-uslubiy-boshqarma',
  'youth': 'yoshlar-bilan-ishlash-bolimi',
  'human resource': 'kadrlar-bolimi',
  'planning': 'reja-moliya-bolimi',
  'extra-mural': 'sirtqi-bolim',
  'master': 'magistratura-bolimi',
  'chancery': 'devonxona',
  'lawyer': 'yurist',
  'accounting': 'buxgalteriya',
  'research': 'ilmiy-tadqiqot-bolimi',
  'international': 'xalqaro-hamkorlik-bolimi',
};

const getStableSectionSlug = (name: string, id: string): string => {
  const normalized = name.toLowerCase().trim();
  for (const [key, value] of Object.entries(SECTION_SLUG_MAP)) {
    if (normalized.includes(key)) return value;
  }
  return id;
};

export const getDepartments = async (locale?: string): Promise<Department[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/academic-departments`, {
      params: { locale }
    });

    // Transform API response to Department format
    const data = Array.isArray(response.data) ? response.data : response.data.data;
    // Handle potential null/undefined data safely
    if (!data) return [];

    return data.map((entry: any) => ({
      id: entry.uuid || entry.id,
      name: entry.fields?.name || entry.fields?.title || entry.name || entry.title || 'Nomsiz Kafedra',
      slug: entry.slug || entry.fields?.slug || (entry.fields?.name || entry.name || '').toLowerCase().replace(/['"ʻ`]/g, '').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim(),
      description: entry.fields?.description || entry.description,
      head: entry.fields?.head || entry.head,
      contact: entry.fields?.contact || entry.contact
    }));
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
};

// Fetch Administrative Departments (Bo'limlar) for Menu
export const getAdministrativeDepartments = async (locale?: string): Promise<any[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/departments`, {
      params: { locale }
    });

    const data = Array.isArray(response.data) ? response.data : response.data?.data;
    if (!data) return [];

    return data.map((entry: any) => {
      const name = entry.fields?.name || entry.name || 'Nomsiz Bo\'lim';
      const id = entry.uuid || entry.id;
      const slug = getStableSectionSlug(name, id);

      return {
        id: id,
        name: name,
        slug: slug
      };
    });
  } catch (error) {
    console.error('Error fetching administrative departments:', error);
    return [];
  }
};

// Fetch Administrative Heads specifically
export const getAdministrativeHeadsApi = async (locale?: string): Promise<any[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/heads-of-departments`, {
      params: {
        locale,
        with: 'image,department,position'
      }
    });

    const data = Array.isArray(response.data) ? response.data : response.data?.data;
    if (!data) return [];

    const { getImageUrl } = await import('../../utils/apiUtils');

    return data.map((entry: any) => {
      const fields = entry.fields || {};
      const name = fields.name || entry.name || '';
      const phone = fields.phone || '';
      const email = fields.email || '';
      const responsibilities = fields.responsibilities || '';
      const exp = fields['work-experience'] || fields.work_experience || '';
      const degree = fields['academic-degree'] || fields.degree || '';

      // Image resolution
      let image = '';
      const rawImg = fields.image || entry.image;
      if (rawImg) {
        if (typeof rawImg === 'string') image = getImageUrl(rawImg);
        else if (Array.isArray(rawImg) && rawImg[0]) image = getImageUrl(rawImg[0].url);
        else if (rawImg.url) image = getImageUrl(rawImg.url);
      }

      // Relations
      const positionRel = fields.position;
      const positionName = (Array.isArray(positionRel) ? positionRel[0]?.fields?.name : positionRel?.fields?.name)
        || positionRel?.name
        || fields.position_name;

      const departmentName = fields.department?.fields?.name || fields.department?.name || '';

      const fallbacks: Record<string, string> = {
        uz: "Bo'lim boshlig'i",
        ru: "Начальник отдела",
        en: "Head of department"
      };

      const cleanPosition = (pos: string) => {
        if (!pos) return '';
        return pos
          .replace(/Bo'lim boshlig'i/gi, '')
          .replace(/Bo‘lim boshlig‘i/gi, '')
          .replace(/Начальник отдела/gi, '')
          .replace(/Head of department/gi, '')
          .trim();
      };

      const rawPosition = positionName || fallbacks[locale || 'uz'] || fallbacks.uz;
      const cleanedPosition = cleanPosition(rawPosition);
      const finalPosition = cleanedPosition ? rawPosition : (departmentName || rawPosition);

      const id = entry.uuid || entry.id;
      const slug = getStableSectionSlug(departmentName || rawPosition, id);

      return {
        id: id,
        slug: slug,
        name: name,
        position: finalPosition,
        degree: degree,
        phone: String(phone).split('.')[0],
        email: email,
        image: image,
        biography: '',
        career: exp,
        description: responsibilities,
        isMain: false,
        departmentName: departmentName
      };
    });
  } catch (error) {
    console.error('Error fetching admin dept heads:', error);
    return [];
  }
};