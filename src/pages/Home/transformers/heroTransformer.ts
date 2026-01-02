import { HomeHeroData } from '../../../services/homeService';

export const transformHeroData = (apiData: any): HomeHeroData => {
  // Check if the API data itself is the array of items
  const items = Array.isArray(apiData)
    ? apiData
    : apiData?.carouselItems || apiData?.carousel_items || [];

  return {
    title: apiData?.title || "",
    subtitle: apiData?.subtitle || "",
    backgroundVideo: apiData?.backgroundVideo,
    backgroundImage: apiData?.backgroundImage || "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop",
    ctaButton: {
      text: apiData?.ctaButton?.text || "Biz haqimizda",
      link: apiData?.ctaButton?.link || "/about",
      variant: apiData?.ctaButton?.variant || "primary"
    },
    overlay: {
      opacity: apiData?.overlay?.opacity || 0.3,
      color: apiData?.overlay?.color || "#000000"
    },
    carouselItems: items.map((item: any) => ({
      id: item.id,
      img: item.img || item.image || item.url,
      title: item.title || item.name,
      desc: item.desc || item.description,
      sliderName: item.sliderName || item.name,
      order: item.order,
      enabled: item.enabled !== false, // Default to true if undefined
    }))
  };
};