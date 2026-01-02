import apiClient from '../client';

export interface ContactMessageData {
    fullName: string;
    phone: string;
    message: string;
}

export const submitContactMessageApi = async (data: ContactMessageData): Promise<any> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        // Reverting to FormData with exact lowercase fields as requested
        const formData = new FormData();
        formData.append('fields[fullname]', data.fullName);
        formData.append('fields[phone]', data.phone);
        formData.append('fields[message]', data.message);
        formData.append('fields[appealType]', 'aloqa');
        formData.append('fields[status]', 'yangi');

        const response = await apiClient.post(`/projects/${projectId}/content/contact`, formData);

        return response.data;
    } catch (error) {
        console.error('Contact message submission error response:', (error as any).response?.data);
        console.error('Full submission error:', error);
        throw error;
    }
};
