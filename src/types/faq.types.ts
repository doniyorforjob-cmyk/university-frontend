export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
}

export interface FAQCategory {
    id: string;
    name: string;
    count: number;
}
