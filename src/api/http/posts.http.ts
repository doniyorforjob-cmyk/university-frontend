import apiClient from '../client';
import { Post, PostDetail, PostCategory } from '../../types/post.types';
import { getImageUrl } from '../../utils/apiUtils';

export const getPosts = async (category?: PostCategory, locale?: string): Promise<Post[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    console.log("Using projectId:", projectId);
    const params: any = { with: 'image' };
    if (category) {
      params['filter[category][eq]'] = category;
    }
    if (locale) {
      params['locale'] = locale;
    }

    // Start localized and English fallback requests in parallel if current locale is not English
    const currentLocale = locale || params.locale || localStorage.getItem('locale') || 'en';

    let data;
    if (currentLocale !== 'en') {
      try {
        const [resLocalized, resEnglish] = await Promise.all([
          apiClient.get(`/projects/${projectId}/content/news`, { params }),
          apiClient.get(`/projects/${projectId}/content/news`, {
            params: { ...params, locale: 'en' }
          })
        ]);

        let dataLocalized = Array.isArray(resLocalized.data) ? resLocalized.data : resLocalized.data.data;
        const dataEnglish = Array.isArray(resEnglish.data) ? resEnglish.data : resEnglish.data.data;

        // FALLBACK: Agar kategoriya bo'yicha o'zbekcha/ruscha ma'lumot topilmasa, filtersiz olib ko'rish
        // Bu "uz dagi malumotlarni kursatmayapti" degan muammoni hal qiladi (ehtimol kategoriya sluglari mos emas)
        if (!dataLocalized || dataLocalized.length === 0) {
          try {
            const fallbackParams = { ...params };
            if (fallbackParams['filter[category][eq]']) {
              console.warn(`No content for locale ${currentLocale} with category, trying unfiltered...`);
              delete fallbackParams['filter[category][eq]'];

              const resLocalizedUnfiltered = await apiClient.get(`/projects/${projectId}/content/news`, {
                params: { ...fallbackParams, per_page: 50, locale: currentLocale }
              });

              const dataUnfiltered = Array.isArray(resLocalizedUnfiltered.data) ? resLocalizedUnfiltered.data : resLocalizedUnfiltered.data.data;
              if (dataUnfiltered && dataUnfiltered.length > 0) {
                dataLocalized = dataUnfiltered;
              }
            }
          } catch (fallbackErr) {
            console.warn("Unfiltered fallback failed:", fallbackErr);
          }
        }

        data = (dataLocalized && dataLocalized.length > 0) ? dataLocalized : dataEnglish;
      } catch (e) {
        // Fallback to single request if parallel fails
        const response = await apiClient.get(`/projects/${projectId}/content/news`, { params });
        data = Array.isArray(response.data) ? response.data : response.data.data;
      }
    } else {
      const response = await apiClient.get(`/projects/${projectId}/content/news`, { params });
      data = Array.isArray(response.data) ? response.data : response.data.data;
    }

    // FINAL FALLBACK: If category was 'news' and returned 0 items, try WITHOUT category filter
    if (category === 'news' && (!data || data.length === 0)) {
      console.log("No items found with category 'news', trying unfiltered fetch...");
      const fallbackRes = await apiClient.get(`/projects/${projectId}/content/news`, {
        params: { with: 'image', per_page: 50 }
      });
      data = Array.isArray(fallbackRes.data) ? fallbackRes.data : fallbackRes.data.data;
    }

    return data.map((entry: any) => {
      // Logic for safer image extraction
      const imgField = entry.fields?.image;
      const imgsField = entry.fields?.images;

      const primaryImage = (Array.isArray(imgField) ? imgField[0] : imgField) || {};
      const secondaryImage = (Array.isArray(imgsField) ? imgsField[0] : imgsField) || {};

      const finalImageUrl =
        (primaryImage?.url || primaryImage?.thumbnail_url || primaryImage?.path) ||
        (secondaryImage?.url || secondaryImage?.thumbnail_url || secondaryImage?.path) ||
        (entry.image_url || entry.image || '');

      return {
        id: entry.uuid || entry.id,
        // Slug bo'lmasa ID yoki UUID ishlatamiz, URL undefined bo'lib qolmasligi uchun
        slug: entry.fields?.slug || entry.slug || entry.uuid || entry.id,
        title: entry.fields?.title || entry.title,
        image_url: getImageUrl(finalImageUrl),
        description: entry.fields?.content ? entry.fields.content.substring(0, 150) + '...' : '',
        published_at: entry.created_at || entry.published_at,
        views: entry.fields?.views || 0,
        category: (entry.fields?.category || 'news') as PostCategory,
      };
    });
  } catch (error) {
    console.error("News fetch error:", error);
    return [];
  }
};

export const getPostBySlug = async (slug: string, locale?: string): Promise<PostDetail | undefined> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    // Start localized and English fallback requests in parallel if current locale is not English
    const currentLocale = locale || localStorage.getItem('locale') || 'en';

    // Slug yoki ID ekanligini aniqlash
    const isUUID = slug.length > 20 && slug.includes('-');
    const filterKey = isUUID ? 'filter[id][eq]' : 'filter[slug][eq]';

    let data;
    if (currentLocale !== 'en') {
      try {
        // 1. Avval joriy tilda so'rab ko'ramiz
        const resLocalized = await apiClient.get(`/projects/${projectId}/content/news`, {
          params: { [filterKey]: slug, with: 'image,gallery', locale: currentLocale }
        });

        const dataLocalized = Array.isArray(resLocalized.data) ? resLocalized.data : resLocalized.data.data;

        // 2. Agar ma'lumot bo'lsa, darhol qaytaramiz (Ingliz tilini kutib o'tirmaymiz)
        if (dataLocalized && dataLocalized.length > 0) {
          data = dataLocalized;
        } else {
          // 3. Agar joriy tilda yo'q bo'lsa, Ingliz tilida so'raymiz (Fallback)
          const resEnglish = await apiClient.get(`/projects/${projectId}/content/news`, {
            params: { [filterKey]: slug, with: 'image,gallery', locale: 'en' }
          });
          data = Array.isArray(resEnglish.data) ? resEnglish.data : resEnglish.data.data;
        }
      } catch (e) {
        // Xatolik bo'lsa, ingliz tilini sinab ko'ramiz
        try {
          const resFallback = await apiClient.get(`/projects/${projectId}/content/news`, {
            params: { [filterKey]: slug, with: 'image,gallery', locale: 'en' }
          });
          data = Array.isArray(resFallback.data) ? resFallback.data : resFallback.data.data;
        } catch (err) {
          console.error("Fallback fetch failed", err);
          return undefined;
        }
      }
    } else {
      const response = await apiClient.get(`/projects/${projectId}/content/news`, {
        params: { [filterKey]: slug, with: 'image,gallery' }
      });
      data = Array.isArray(response.data) ? response.data : response.data.data;
    }


    // API filtrni inobatga olmasligi mumkin, shuning uchun client-side da ham filtrlaymiz
    const entry = data.find((item: any) => {
      const itemSlug = item.fields?.slug || item.slug;
      const itemId = item.uuid || item.id;
      // Debug uchun
      // console.log(`Checking item slug: ${itemSlug} id: ${itemId} vs requested: ${slug}`);
      return itemSlug === slug || itemId === slug;
    });

    if (!entry) {
      console.warn(`Post not found for slug: ${slug} in locale: ${currentLocale}`);
      // Agar aniq slug bo'yicha topilmasa, noto'g'ri ma'lumot ko'rsatmaslik uchun undefined qaytaramiz.
      // Fallback data[0] bu yerda XATO edi.
      return undefined;
    }

    if (!entry) return undefined;

    const fields = entry.fields || {};
    const imageObj = Array.isArray(fields.image) ? fields.image[0] : fields.image;

    return {
      id: entry.uuid || entry.id,
      slug: fields.slug || entry.slug,
      title: fields.title || entry.title,
      image_url: getImageUrl(imageObj?.url || imageObj?.thumbnail_url || imageObj?.path || '/images/logo.png'),
      description: fields.content ? fields.content.substring(0, 150) + '...' : '',
      published_at: entry.created_at || entry.published_at,
      views: fields.views || 0,
      category: (fields.category || 'news') as PostCategory,
      content: fields.content || '',
      author: { name: 'Matbuot xizmati' },
      gallery: Array.isArray(fields.gallery)
        ? fields.gallery.map((img: any) => getImageUrl(img.url || img.thumbnail_url || img.path))
        : []
    };
  } catch (error) {
    console.error("News detail fetch error:", error);
    return undefined;
  }
};