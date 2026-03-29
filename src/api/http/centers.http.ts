import apiClient from '../client';
import { Leadership } from '../../types/leadership.types';
import { getImageUrl, toString, normalizeCertificates } from '../../utils/apiUtils';
import { slugify } from '../../utils/transliterate';

const formatPhone = (phone: any): string => {
    if (!phone) return '';
    return String(phone).split('.')[0];
};

const resolveImage = (img: any): string => {
    if (!img) return '';
    if (Array.isArray(img)) {
        const first = img[0];
        if (!first) return '';
        if (typeof first === 'string') return first;
        return first.thumbnail_url || first.url || '';
    }
    if (typeof img === 'string') return img;
    return img.thumbnail_url || img.url || '';
};

export const getCentersHeadsApi = async (locale?: string): Promise<Leadership[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        // Fetch Heads of Centers
        const response = await apiClient.get(`/projects/${projectId}/content/heads-of-centers`, {
            params: {
                locale,
                with: 'image,center,position,academic-degree,admission-day,reception-days,birth-date'
            }
        });

        const normalizeData = (res: any) => {
            if (!res) return [];
            const data = res.data !== undefined ? res.data : res;
            if (Array.isArray(data)) return data;
            return [];
        };

        const rawData = normalizeData(response.data);

        return rawData.map((entry: any) => {
            const fields = entry.fields || {};

            // Determine position name
            const position = toString(fields.position?.fields?.name ||
                fields.position?.name ||
                (Array.isArray(fields.position) ? fields.position[0]?.fields?.name : null) ||
                fields.position_name ||
                "Markaz rahbari", locale);

            // Determine center name - more defensive for relationships
            const centerRel = fields.center;
            // If multiple centers, try to find one that matches the position title better
            const centerObj = Array.isArray(centerRel)
                ? (centerRel.find((c: any) => {
                    const cName = toString(c.fields?.name || c.name || '', locale).toLowerCase();
                    return position.toLowerCase().includes(cName);
                }) || centerRel[0])
                : centerRel;

            const centerName = toString(
                centerObj?.fields?.name ||
                centerObj?.fields?.title ||
                centerObj?.name ||
                centerObj?.title ||
                fields.center_name ||
                fields.centerName ||
                "", locale);


            const personId = entry.uuid || entry.id;
            const personName = toString(fields.name || entry.name || '', locale).trim();

            // HUMAN-READABLE SLUG: Strictly prioritize center name as requested by user
            let slug = slugify(centerName || personName || personId);

            // SYNC WITH NAVBAR: Ensure the same stable slugs as Navbar
            const lowerCenter = centerName.toLowerCase();
            const lowerPos = position.toLowerCase();
            const combined = `${lowerCenter} ${lowerPos}`;

            // Innovatsiya markazi (TIVM) check - prioritizing it because it often contains generic "texnologiya"
            // We search BOTH center name and position because sometimes the relation is misleading
            if (combined.includes('innovatsiya') || combined.includes('инновац') || combined.includes('innovation') || combined.includes('innovasiya') || combined.includes('tivm')) {
                slug = 'innovatsiyalar-markazi';
            }
            // Raqamli ta'lim markazi - stricter check to avoid catching TIVM
            else if (combined.includes('raqamli') && (combined.includes('ta\'lim') || combined.includes('образован') || combined.includes('education'))) {
                slug = 'raqamli-talim-markazi';
            } else if (combined.includes('axborot') && (combined.includes('resurs') || combined.includes('ресурс') || combined.includes('resource'))) {
                slug = 'axborot-resurs-markazi';
            } else if (combined.includes('bandlik') || combined.includes('karyera') || combined.includes('карьер') || combined.includes('career')) {
                slug = 'karyera-markazi';
            }

            return {
                id: personId,
                slug: slug,
                name: personName,
                degree: toString(fields['academic-degree'] || fields.degree || fields.academicDegree || fields.ilmiy_daraja || fields['academic-degree']?.fields?.name, locale),
                position: centerName ? `${position} (${centerName})` : position,
                phone: formatPhone(fields.phone || entry.phone),
                email: toString(fields.email || entry.email, locale),
                image: getImageUrl(resolveImage(fields.image || entry.image)),
                career: toString(fields['work-experience'] || fields.work_experience || fields.career || fields.mehnat_faoliyati || fields.ish_tajribasi || fields.milestones || fields.experience, locale),
                description: toString(fields.responsibilities || fields.description || fields.vazifalari || fields.bio || fields.content, locale),
                birth_date: toString(fields['birth-date'] || fields.birth_date || fields.tugilgan_sana || fields['birth-date']?.fields?.name || entry['birth-date'], locale),
                reception_days: toString(fields['reception-days'] || fields.reception_days || fields['admission-day'] || fields.admission_day || fields.qabul_kunlari || fields.reception || fields['reception-days']?.fields?.name || fields['admission-day']?.fields?.name, locale),
                isMain: false,
                order: fields.order !== undefined ? parseInt(fields.order, 10) : undefined,
                category: 'center' as const,
                certificates: normalizeCertificates(fields),
                fields,
                collection: entry.collection
            };
        }).sort((a, b) => {
            const orderA = a.order !== undefined ? a.order : 999;
            const orderB = b.order !== undefined ? b.order : 999;
            return orderA - orderB;
        });
    } catch (error) {
        console.error('Error fetching centers heads:', error);
        return [];
    }
};
