import apiClient from '../client';
import { Faculty, Department } from '../../types/faculty.types';
import { getImageUrl } from '../../utils/apiUtils';

const resolveImage = (img: any): string | null => {
    if (!img) return null;
    if (Array.isArray(img) && img.length > 0) return resolveImage(img[0]); // Handle array of images
    if (typeof img === 'string') return img;
    return img.url || img.thumbnail_url || img.path || null;
};

const formatPhone = (phone: any): string => {
    if (!phone) return '';
    return String(phone).split('.')[0];
};

const ensureSlug = (name: string, slug?: string) => {
    if (slug) return slug;
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const getFaculties = async (locale?: string): Promise<Faculty[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/faculties`, {
            params: { locale, with: 'icon,image' }
        });
        const data = Array.isArray(response.data) ? response.data : response.data.data;
        return data.map((entry: any) => {
            const fields = entry.fields || {};
            const name = fields.name || fields.title || entry.name || entry.title || "Fakultet";
            return {
                id: entry.uuid || entry.id,
                name: name,
                description: fields.content || fields.description || entry.description,
                image: getImageUrl(resolveImage(fields.image || entry.image)),
                iconImage: getImageUrl(resolveImage(fields.icon || entry.icon)),
                color: fields.color || 'from-sky-500 to-indigo-500',
                slug: ensureSlug(name, fields.slug || entry.slug),
                uuid: entry.uuid || entry.id
            };
        });
    } catch (error) {
        console.error("Faculties fetch error:", error);
        return [];
    }
};

export const getFacultyById = async (id: string | number, locale?: string): Promise<Faculty | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(id));
        const filterKey = isUUID ? 'filter[id][eq]' : 'filter[slug][eq]';

        const response = await apiClient.get(`/projects/${projectId}/content/faculties`, {
            params: {
                [filterKey]: id,
                locale,
                with: 'icon,image,gallery'
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;
        let entry = (data || []).find((item: any) => {
            const itemSlug = item.fields?.slug || item.slug;
            const itemId = item.uuid || item.id;
            return String(itemSlug) === String(id) || String(itemId) === String(id);
        });

        if (!entry) {
            const all = await getFaculties(locale);
            const found = all.find(f => f.slug === id || String(f.id) === String(id) || String(f.uuid) === String(id));
            if (!found) return null;

            const retryRes = await apiClient.get(`/projects/${projectId}/content/faculties`, {
                params: {
                    'filter[id][eq]': found.uuid || found.id,
                    locale,
                    with: 'icon,image,gallery'
                }
            });
            const retryData = Array.isArray(retryRes.data) ? retryRes.data : retryRes.data.data;
            entry = (retryData || []).find((item: any) => (item.uuid || item.id) === (found.uuid || found.id));
        }

        if (!entry) return null;

        const toString = (val: any): string => {
            if (typeof val === 'string') return val;
            if (typeof val === 'number') return String(val);
            if (Array.isArray(val) && val.length > 0) return toString(val[0]);
            if (val && typeof val === 'object') {
                return val.fields?.name || val.fields?.title || val.name || val.title || '';
            }
            return '';
        };

        const fields = entry.fields || {};
        const facultyId = entry.uuid || entry.id;

        let deanInfo = undefined;
        try {
            const deanRes = await apiClient.get(`/projects/${projectId}/content/deans-of-faculties`, {
                params: { locale, with: 'image,positions,faculty' }
            });
            const deansData = Array.isArray(deanRes.data) ? deanRes.data : deanRes.data.data;

            const deanEntry = deansData.find((d: any) => {
                const facultyField = d.fields?.faculty;
                const facultyObj = Array.isArray(facultyField) ? facultyField[0] : facultyField;
                const fId = facultyObj?.uuid || facultyObj?.id || facultyObj;
                return String(fId) === String(facultyId);
            });

            if (deanEntry) {
                const df = deanEntry.fields || {};
                const rawPos = df.positions;
                const posName = toString(rawPos) || toString(df.position) || "Fakultet dekani";

                deanInfo = {
                    id: deanEntry.uuid || deanEntry.id,
                    name: toString(df.name || deanEntry.name || '').trim(),
                    position: posName,
                    phone: formatPhone(df.phone || deanEntry.phone),
                    email: toString(df.email || deanEntry.email),
                    image: getImageUrl(resolveImage(df.image || deanEntry.image)),
                    career: toString(df['work-experience'] || df.work_experience || df.career || df.ish_tajribasi || df.milestones || df.experience),
                    description: toString(df.responsibilities || df.description || df.vazifalari || df.bio || df.content),
                    isMain: false
                };
            }
        } catch (deanErr) {
            console.warn("Error fetching dean for faculty:", deanErr);
        }

        const name = toString(fields.name || fields.title || entry.name || entry.title || "Fakultet");

        return {
            id: facultyId,
            name: name,
            description: fields.content || fields.description || entry.description,
            content: fields.content || '',
            image: getImageUrl(resolveImage(fields.image || entry.image)),
            iconImage: getImageUrl(resolveImage(fields.icon || entry.icon)),
            color: fields.color || 'from-sky-500 to-indigo-500',
            slug: ensureSlug(name, fields.slug || entry.slug),
            gallery: Array.isArray(fields.gallery) ? fields.gallery.map((img: any) => getImageUrl(resolveImage(img))) : [],
            directionsAndSpecializations: fields.directions || fields.specializations || fields.yo_nalishlar || fields['directions-and-specializations'],
            internationalCooperation: fields['international-cooperation'] || fields.international_cooperation || fields.cooperation || fields.xalqaro_hamkorlik,
            uuid: facultyId,
            deanInfo
        };
    } catch (error) {
        console.error("Faculty fetch error:", error);
        return null;
    }
};

export const getDepartmentsByFacultyId = async (facultyId: string | number, locale?: string): Promise<Department[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/academic-departments`, {
            params: { locale, with: 'image,faculty' }
        });
        const data = Array.isArray(response.data) ? response.data : response.data.data;
        return data
            .filter((item: any) => {
                const fId = item.fields?.faculty?.uuid || item.fields?.faculty?.id || item.fields?.faculty;
                return String(fId) === String(facultyId);
            })
            .map((entry: any) => {
                const fields = entry.fields || {};
                const name = fields.name || fields.title || entry.name || entry.title || "Kafedra";
                return {
                    id: entry.uuid || entry.id,
                    name: name,
                    slug: ensureSlug(name, fields.slug || entry.slug),
                    facultyId: facultyId,
                    image: getImageUrl(resolveImage(fields.image)),
                    phone: fields.phone ? String(fields.phone).split('.')[0] : (fields.phone_number ? String(fields.phone_number) : undefined),
                    email: fields.email ? String(fields.email).trim() : undefined,
                    headName: fields.head_name || fields.manager || fields.dean || fields.leader || (fields.staff && typeof fields.staff === 'string' && fields.staff.length < 50 ? fields.staff : undefined)
                };
            });
    } catch (error) {
        console.error("Error fetching departments by faculty:", error);
        return [];
    }
};

export const getDepartments = async (locale?: string): Promise<Department[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/academic-departments`, {
            params: { locale, with: 'image,faculty' }
        });
        const data = Array.isArray(response.data) ? response.data : response.data.data;
        return data.map((entry: any) => {
            const fields = entry.fields || {};
            const name = fields.name || fields.title || entry.name || entry.title || "Kafedra";
            return {
                id: entry.uuid || entry.id,
                name: name,
                slug: ensureSlug(name, fields.slug || entry.slug),
                facultyId: fields.faculty?.uuid || fields.faculty?.id || fields.faculty,
                image: getImageUrl(resolveImage(fields.image)),
                phone: fields.phone ? String(fields.phone).split('.')[0] : (fields.phone_number ? String(fields.phone_number) : undefined),
                email: fields.email ? String(fields.email).trim() : undefined,
                headName: fields.head_name || fields.manager || fields.dean || fields.leader || (fields.staff && typeof fields.staff === 'string' && fields.staff.length < 50 ? fields.staff : undefined)
            };
        });
    } catch (error) {
        console.error("Error fetching departments:", error);
        return [];
    }
};

export const getDepartmentById = async (id: string | number, locale?: string): Promise<Department | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const isTrueUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(id));
        const filterKey = isTrueUUID ? 'filter[id][eq]' : 'filter[slug][eq]';

        const response = await apiClient.get(`/projects/${projectId}/content/academic-departments`, {
            params: {
                [filterKey]: id,
                locale,
                with: 'image,gallery,faculty'
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;
        let entry = (data || []).find((item: any) => {
            const itemSlug = item.fields?.slug || item.slug;
            const itemId = item.uuid || item.id;
            return String(itemSlug) === String(id) || String(itemId) === String(id);
        });

        if (!entry) {
            const all = await getDepartments(locale);
            let found = all.find(d => d.slug === id || String(d.id) === String(id));

            if (!found && locale !== 'uz') {
                const allUz = await getDepartments('uz');
                found = allUz.find(d => d.slug === id || String(d.id) === String(id));
            }

            if (!found) return null;

            const targetId = found.id;

            // First attempt: fetch in requested locale
            const retryRes = await apiClient.get(`/projects/${projectId}/content/academic-departments`, {
                params: {
                    'filter[id][eq]': targetId,
                    locale,
                    with: 'image,gallery,faculty'
                }
            });
            let retryData = Array.isArray(retryRes.data) ? retryRes.data : retryRes.data.data;
            entry = (retryData || []).find((item: any) => (item.uuid || item.id) === targetId);

            // Second attempt: if content not found in current locale (e.g. RU), fetch in UZ (fallback content)
            if (!entry && locale !== 'uz') {
                const fallbackRes = await apiClient.get(`/projects/${projectId}/content/academic-departments`, {
                    params: {
                        'filter[id][eq]': targetId,
                        locale: 'uz',
                        with: 'image,gallery,faculty'
                    }
                });
                const fallbackData = Array.isArray(fallbackRes.data) ? fallbackRes.data : fallbackRes.data.data;
                entry = (fallbackData || []).find((item: any) => (item.uuid || item.id) === targetId);
            }
        }

        if (!entry) return null;

        const fields = entry.fields || {};
        const departmentId = entry.uuid || entry.id;
        const facultyId = fields.faculty?.uuid || fields.faculty?.id || fields.faculty;
        const name = fields.name || fields.title || entry.name || entry.title || "Kafedra";

        const toString = (val: any): string => {
            if (typeof val === 'string') return val;
            if (typeof val === 'number') return String(val);
            if (Array.isArray(val) && val.length > 0) return toString(val[0]);
            if (val && typeof val === 'object') {
                return val.fields?.name || val.fields?.title || val.name || val.title || '';
            }
            return '';
        };

        let headInfo = undefined;
        try {
            const headRes = await apiClient.get(`/projects/${projectId}/content/heads-of-academic-departments`, {
                params: { locale, with: 'image,positions,academic_department,academic-department' }
            });
            let headsData = Array.isArray(headRes.data) ? headRes.data : headRes.data.data;

            // Fallback 1: try without locale on the same collection if empty
            if (!headsData || headsData.length === 0) {
                const headResAlt = await apiClient.get(`/projects/${projectId}/content/heads-of-academic-departments`, {
                    params: { with: 'image,positions,academic_department,academic-department' }
                });
                headsData = Array.isArray(headResAlt.data) ? headResAlt.data : headResAlt.data.data;
            }

            const headEntry = headsData?.find((h: any) => {
                const deptField = h.fields?.academic_department || h.fields?.['academic-department'] || h.fields?.department;
                const deptObj = Array.isArray(deptField) ? deptField[0] : deptField;
                const dId = deptObj?.uuid || deptObj?.id || deptObj;
                return String(dId) === String(departmentId);
            });

            if (headEntry) {
                const hf = headEntry.fields || {};
                const rawPos = hf.positions || hf.position;
                const posName = toString(rawPos) || "Kafedra mudiri";

                headInfo = {
                    id: headEntry.uuid || headEntry.id,
                    name: toString(hf.name || headEntry.name || '').trim(),
                    position: posName,
                    phone: formatPhone(hf.phone || headEntry.phone),
                    email: toString(hf.email || headEntry.email),
                    image: getImageUrl(resolveImage(hf.image || headEntry.image)),
                    career: toString(hf['work-experience'] || hf.work_experience || hf.career || hf.ish_tajribasi || hf.milestones || hf.experience),
                    description: toString(hf.responsibilities || hf.description || hf.vazifalari || hf.bio || hf.content),
                    isMain: false
                };
            }
        } catch (headErr) {
            console.warn("Error fetching head for department:", headErr);
        }

        return {
            id: departmentId,
            name: name,
            phone: fields.phone || fields.phone_number,
            email: fields.email,
            headName: fields.head_name || fields.manager || fields.dean || fields.leader,
            slug: ensureSlug(name, fields.slug || entry.slug),
            facultyId: facultyId,
            image: getImageUrl(resolveImage(fields.image)),
            description: fields.description || fields.content,
            content: fields.content || '',
            gallery: Array.isArray(fields.gallery) ? fields.gallery.map((img: any) => getImageUrl(resolveImage(img))) : [],
            directions: fields.directions || fields.yo_nalishlar || fields['directions-and-specializations'] || fields.yonalishlar,
            history: fields.history || fields.tarix || fields.about || fields.history_uz || fields.history_ru || fields.history_en,
            staff: fields.staff || fields.composition || fields.kafedra_tarkibi || fields.members || fields.teachers || fields.employee,
            scientificActivity: fields['scientific-activity'] || fields.scientific_activity || fields.ilmiy_faoliyat || fields.science || fields.research,
            internationalCooperation: fields['international-cooperation'] || fields.international_cooperation || fields.xalqaro_hamkorlik || fields.cooperation,
            headInfo
        };
    } catch (error) {
        console.error("Department fetch error:", error);
        return null;
    }
};
