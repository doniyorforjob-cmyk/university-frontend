export interface ContactSettings {
    primaryPhone: string;
    secondaryPhone?: string;
    hotline?: string;
    email: string;
    address: string;
    googleMapsUrl: string;
    workingHours: {
        weekdays: string;
        saturday?: string;
        sunday?: string;
    };
}

export interface SocialLink {
    name: string;
    url: string;
    icon?: string;
}

export interface FooterSettings {
    copyright: string;
    mission: string;
    quickLinks: Array<{
        title: string;
        href: string;
    }>;
}

export interface GlobalSettings {
    logo?: string;
    siteName?: string;
    siteDescription?: string;
    mission?: string;
    contacts: ContactSettings;
    socials: SocialLink[];
    footer: FooterSettings;
}
