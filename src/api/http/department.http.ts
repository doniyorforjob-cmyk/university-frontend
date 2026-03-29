import apiClient from '../client';
import { Department } from '../../types/department.types';
import { Leadership } from '../../types/leadership.types';
import { slugify } from '../../utils/transliterate';
import { toString, normalizeCertificates } from '../../utils/apiUtils';

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
  'xalqaro-hamkorlik': 'xalqaro-hamkorlik-bolimi',
  'xalqaro': 'xalqaro-hamkorlik-bolimi',
  'marketing': 'marketing-bolimi',
  'axborot-resurs': 'axborot-resurs-markazi',
  'arm': 'axborot-resurs-markazi',

  // Russian
  'учебно-методи': 'oquv-uslubiy-boshqarma',
  'мониторинг': 'monitoring-va-ichki-nazorat',
  'контрол': 'monitoring-va-ichki-nazorat',
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
  'информационно-ресурс': 'axborot-resurs-markazi',
  'ирма': 'axborot-resurs-markazi',

  // English
  'academic': 'oquv-uslubiy-boshqarma',
  'educational': 'oquv-uslubiy-boshqarma',
  'methodical': 'oquv-uslubiy-boshqarma',
  'study': 'oquv-uslubiy-boshqarma',
  'internal control': 'monitoring-va-ichki-nazorat',
  'youth': 'yoshlar-bilan-ishlash-bolimi',
  'youth work': 'yoshlar-bilan-ishlash-bolimi',
  'human resource': 'kadrlar-bolimi',
  'hr department': 'kadrlar-bolimi',
  'planning': 'reja-moliya-bolimi',
  'finance': 'reja-moliya-bolimi',
  'extra-mural': 'sirtqi-bolim',
  'master': 'magistratura-bolimi',
  'chancery': 'devonxona',
  'lawyer': 'yurist',
  'accounting': 'buxgalteriya',
  'research': 'ilmiy-tadqiqot-bolimi',
  'international': 'xalqaro-hamkorlik-bolimi',
  'information-resource': 'axborot-resurs-markazi',
  'irc': 'axborot-resurs-markazi',
};

const getStableSectionSlug = (name: string, id: string): string => {
  const normalized = name.toLowerCase().trim();
  for (const [key, value] of Object.entries(SECTION_SLUG_MAP)) {
    if (key.length <= 3) {
      // Use word boundaries for short acronyms (like arm, irc) to avoid partial matches
      const regex = new RegExp(`\\b${key}\\b`, 'i');
      if (regex.test(normalized)) return value;
    } else if (normalized.includes(key)) {
      return value;
    }
  }
  // Fallback to name-based slug if not in map
  const safeName = slugify(name || '');
  if (safeName && safeName.length > 2) {
    return safeName;
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
      const name = toString(entry.fields?.name || entry.name || 'Nomsiz Bo\'lim', locale);
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
export const getAdministrativeHeadsApi = async (locale?: string): Promise<Leadership[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/heads-of-departments`, {
      params: {
        locale,
        with: 'image,department,position,academic-degree,admission-day,reception-days,birth-date'
      }
    });

    const data = Array.isArray(response.data) ? response.data : response.data?.data;
    if (!data) return [];

    const { getImageUrl } = await import('../../utils/apiUtils');

    return data.map((entry: any) => {
      const fields = entry.fields || {};
      const name = toString(fields.name || entry.name || '', locale);
      const phone = toString(fields.phone || '', locale);
      const email = toString(fields.email || '', locale);
      const responsibilities = toString(fields.responsibilities || '', locale);
      const exp = toString(fields['work-experience'] || fields.work_experience || '', locale);
      const degree = toString(fields['academic-degree'] || fields.degree || fields.academicDegree || fields.ilmiy_daraja || fields['academic-degree']?.fields?.name, locale);

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
      const positionName = toString((Array.isArray(positionRel) ? positionRel[0]?.fields?.name : positionRel?.fields?.name)
        || positionRel?.name
        || fields.position_name, locale);

      const departmentRel = fields.department;
      const departmentObj = Array.isArray(departmentRel) ? departmentRel[0] : departmentRel;
      const departmentName = toString(
        departmentObj?.fields?.name ||
        departmentObj?.fields?.title ||
        departmentObj?.name ||
        departmentObj?.title ||
        "", locale);

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

      const personId = entry.uuid || entry.id;

      // HUMAN-READABLE SLUG: Strictly prioritize department name as requested by user
      const slug = getStableSectionSlug(departmentName || name || personId, personId);

      return {
        id: personId,
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
        birth_date: toString(fields['birth-date'] || fields.birth_date || fields.tugilgan_sana || fields['birth-date']?.fields?.name || entry['birth-date'], locale),
        reception_days: toString(fields['reception-days'] || fields.reception_days || fields['admission-day'] || fields.admission_day || fields.qabul_kunlari || fields.reception || fields['reception-days']?.fields?.name || fields['admission-day']?.fields?.name, locale),
        isMain: false,
        departmentName: departmentName,
        order: fields.order !== undefined ? parseInt(fields.order, 10) : undefined,
        category: 'admin' as const,
        certificates: normalizeCertificates(fields),
        fields,
        collection: entry.collection
      };
    }).sort((a: Leadership, b: Leadership) => {
      const orderA = a.order !== undefined ? a.order : 999;
      const orderB = b.order !== undefined ? b.order : 999;
      return orderA - orderB;
    });
  } catch (error) {
    console.error('Error fetching admin dept heads:', error);
    return [];
  }
};