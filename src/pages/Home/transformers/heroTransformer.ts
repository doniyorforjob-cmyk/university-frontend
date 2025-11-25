import { HomeHeroData } from '../../../api/homeApi';

export const transformHeroData = (apiData: any): HomeHeroData => {
  return {
    title: apiData.title || apiData.name || "Namangan davlat texnika universiteti",
    subtitle: apiData.subtitle || apiData.description || "Zamonaviy texnologiyalar va innovatsion yechimlar bilan kelajakni shakllantiruvchi yetakchi texnika ta'lim muassasasi.",
    backgroundVideo: apiData.backgroundVideo || apiData.background_video || apiData.video,
    backgroundImage: apiData.backgroundImage || apiData.background_image || apiData.image || "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop",
    ctaButton: {
      text: apiData.ctaButton?.text || apiData.cta_text || apiData.buttonText || "Biz haqimizda",
      link: apiData.ctaButton?.link || apiData.cta_link || apiData.buttonLink || "/about",
      variant: apiData.ctaButton?.variant || apiData.cta_variant || "primary"
    },
    overlay: apiData.overlay ? {
      opacity: apiData.overlay.opacity || apiData.overlay_opacity || 0.3,
      color: apiData.overlay.color || apiData.overlay_color || "#000000"
    } : {
      opacity: 0.3,
      color: "#000000"
    },
    carouselItems: apiData.carouselItems || apiData.carousel_items || []
  };
};