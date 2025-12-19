import { GlobalSettings } from '../../types/settings.types';

export const mockGlobalSettings: GlobalSettings = {
    contacts: {
        primaryPhone: "+998 (69) 228-84-33",
        secondaryPhone: "+998 (69) 228-84-34",
        hotline: "1003",
        email: "info@namdtu.uz",
        address: "716003, Namangan sh., Boburshoh ko‘chasi, 197-uy",
        googleMapsUrl: "https://goo.gl/maps/...",
        workingHours: {
            weekdays: "Dush-Jum: 09:00 - 18:00",
            saturday: "Shanba: 09:00 - 14:00",
            sunday: "Dam olish kuni"
        }
    },
    socials: [
        { name: "Telegram", url: "https://t.me/namdtu_press" },
        { name: "Facebook", url: "https://facebook.com/namdtu" },
        { name: "Instagram", url: "https://instagram.com/namdtu" },
        { name: "YouTube", url: "https://youtube.com/namdtu" }
    ],
    footer: {
        copyright: `© ${new Date().getFullYear()} Namangan Davlat Texnika Universiteti. Barcha huquqlar himoyalangan.`,
        mission: "Sifatli ta'lim va innovatsion tadqiqotlar orqali jamiyat rivojiga hissa qo'shish.",
        quickLinks: [
            { title: "Bosh sahifa", href: "/" },
            { title: "Fakultetlar", href: "/faculties" },
            { title: "Qabul", href: "/admission" },
            { title: "Bog'lanish", href: "/contact" }
        ]
    }
};

export const settingsApi = {
    getSettings: async (): Promise<GlobalSettings> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockGlobalSettings;
    }
};
