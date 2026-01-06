import apiClient from '../client';
import { GlobalSettings } from '../../types/settings.types';


export const settingsApi = {
    getSettings: async (locale?: string): Promise<GlobalSettings> => {
        try {
            const projectId = process.env.REACT_APP_PROJECT_ID;
            const response = await apiClient.get(`/projects/${projectId}/content/settings`, {
                params: { locale } // Pass explicit locale if provided
            });

            // Transform API response to GlobalSettings format
            const data = Array.isArray(response.data) ? response.data[0] : response.data.data?.[0] || response.data;
            const fields = data.fields || {};

            // Add formatting helper.
            // Clean up phone numbers.
            const cleanPhone = (phone: string) => {
                if (!phone) return '';
                // Remove trailing .000000 if present
                return phone.split('.')[0].replace(/[^0-9+]/g, '');
            };

            return {
                siteName: fields.sitename || 'NamDTU',
                siteDescription: fields.sitedescription || '',
                mission: fields.mission || '',
                logo: fields.logo?.[0]?.url || '',
                contacts: {
                    primaryPhone: cleanPhone(fields.primaryphone) || '+998 69 227 00 00',
                    secondaryPhone: cleanPhone(fields.secondaryphone),
                    hotline: cleanPhone(fields.hotline),
                    email: fields.email || 'info@namdtu.uz',
                    address: fields.address || '',
                    googleMapsUrl: fields.googlemapsurl || '',
                    workingHours: {
                        weekdays: fields.workingweekdays || 'Dushanba - Juma: 08:00 - 17:00',
                        saturday: fields.workingsaturday,
                        sunday: fields.workingsunday
                    }
                },
                socials: [
                    { name: 'Telegram', url: fields.telegramurl || '#' },
                    { name: 'Instagram', url: fields.instagramurl || '#' },
                    { name: 'Facebook', url: fields.facebookurl || '#' },
                    { name: 'YouTube', url: fields.youtubeurl || '#' }
                ],
                footer: {
                    copyright: fields.footercopyright || '© 2026 Namangan davlat texnika universiteti',
                    mission: fields.mission || fields.footermission || '',
                    quickLinks: []
                }
            };
        } catch (error) {
            console.error('Error fetching global settings from API:', error);
            throw error;
        }
    }
};
