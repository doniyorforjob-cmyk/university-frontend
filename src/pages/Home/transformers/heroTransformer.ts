import { HomeHeroData } from '../../../services/homeService';
import { getImageUrl } from '../../../utils/apiUtils';

export const transformHeroData = (apiData: any): HomeHeroData => {
  // Elmapi can return data directly as an array or wrapped in a data property
  const rawItems = Array.isArray(apiData)
    ? apiData
    : (Array.isArray(apiData?.data) ? apiData.data : (apiData?.data ? [apiData.data] : []));

  return {
    carouselItems: rawItems.map((item: any) => {
      const fields = item.fields || {};

      // Extensive image extraction to cover all Elmapi variations
      let imgPath = '';
      if (Array.isArray(fields.image) && fields.image.length > 0) {
        const firstImg = fields.image[0];
        imgPath = firstImg.url || firstImg.path || (typeof firstImg === 'string' ? firstImg : '');
      } else if (typeof fields.image === 'object' && fields.image !== null) {
        imgPath = fields.image.url || fields.image.path;
      } else {
        imgPath = fields.image;
      }

      const title = fields.title || item.title || 'NamDTU';
      const desc = fields.description || fields.content || item.description || '';

      return {
        id: item.uuid || item.id || Math.random().toString(),
        img: getImageUrl(imgPath) || "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop",
        title: title,
        desc: desc,
        sliderName: title.substring(0, 20),
        enabled: fields.enabled !== false,
        createdAt: item.created_at || item.createdAt || ''
      };
    }).sort((a: any, b: any) => {
      // Eng yangisi birinchi slide bo'lishi uchun teskari tartibda saralash
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
  };
};