export interface OpenLesson {
    id: number;
    slug: string;
    title: string;
    teacher_name: string;
    lesson_date: string;
    description: string;
    image_url: string;
    views: number;
}

export interface OpenLessonDetail extends OpenLesson {
    content: string;
    department?: {
        id: number;
        name: string;
    };
    gallery?: string[];
    attachments?: {
        name: string;
        url: string;
    }[];
    video_url?: string;
}
