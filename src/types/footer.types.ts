export interface SocialLink {
  id: string;
  name: 'Facebook' | 'Telegram' | 'Instagram' | 'YouTube' | 'Twitter';
  url: string;
}

export interface ContactInfo {
  address: {
    text: string;
    url: string;
  };
  phone: {
    number: string;
    tel: string;
  };
  email: {
    address: string;
    mailto: string;
  };
}

export interface FooterLink {
  id: string;
  text: string;
  url: string;
}

export interface FooterLinkGroup {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterData {
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  linkGroups: FooterLinkGroup[];
}