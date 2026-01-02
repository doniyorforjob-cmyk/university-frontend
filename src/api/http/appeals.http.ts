import apiClient from '../client';
import { AppealFormData } from '../../utils/validationSchemas';

/**
 * Murojaatni yuborish (Elmapi CMS)
 */
export const submitAppealApi = async (data: AppealFormData, trackingId: string): Promise<any> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        // FormData ishlatamiz (fayllar borligi sababli)
        const formData = new FormData();

        // Asosiy maydonlarni fields[name] formatida qo'shamiz
        formData.append('fields[fullName]', data.fullName || 'Anonymous');
        formData.append('fields[phone]', data.phone || '');
        formData.append('fields[email]', data.email || '');
        formData.append('fields[address]', data.address || '');
        formData.append('fields[appealType]', data.appealType);
        formData.append('fields[title]', data.title);
        formData.append('fields[description]', data.description);
        formData.append('fields[category]', data.category || 'general');
        formData.append('fields[priority]', data.priority || 'medium');
        formData.append('fields[trackingId]', trackingId);
        formData.append('fields[status]', 'pending');

        // Agar department yoki faculty kelsa (forma ichida bor bo'lsa)
        if (data.department) formData.append('fields[department]', data.department);
        if (data.faculty) formData.append('fields[faculty]', data.faculty);

        // Fayllarni biriktirish
        if (data.attachments && data.attachments.length > 0) {
            data.attachments.forEach((file) => {
                formData.append('fields[attachments][]', file);
            });
        }

        const response = await apiClient.post(`/projects/${projectId}/content/appeals`, formData);

        return response.data;
    } catch (error) {
        console.error('Appeal submission error:', error);
        throw error;
    }
};

/**
 * Murojaat holatini trackingId orqali tekshirish
 */
export const getAppealStatusApi = async (trackingId: string): Promise<any> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/appeals`, {
            params: {
                'filter[trackingId][eq]': trackingId
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;
        return data && data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error('Error fetching appeal status:', error);
        throw error;
    }
};
