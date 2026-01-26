export interface StepForward {
    id: number;
    slug: string;
    title: string;
    description: string;
    image_url: string;
    date: string;
    views: number;
}

export interface StepForwardDetail extends StepForward {
    content: string;
    gallery?: string[];
}
