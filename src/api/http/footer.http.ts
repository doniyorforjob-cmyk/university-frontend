import apiClient from '../client';
import { FooterData } from '../../types/footer.types';

export const fetchFooterData = async (): Promise<FooterData> => {
  // TODO: Haqiqiy API so'rovi shu yerda yoziladi
  console.warn("fetchFooterData: http versiyasi hali yozilmagan.");
  return {
    contactInfo: {
      address: { text: '', url: '' },
      phone: { number: '', tel: '' },
      email: { address: '', mailto: '' },
    },
    socialLinks: [],
    linkGroups: [],
  };
};