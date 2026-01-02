import { OpenLesson, OpenLessonDetail } from '../../types/open-lesson.types';

export const getOpenLessons = async (): Promise<OpenLesson[]> => {
    return [
        {
            id: 1,
            slug: 'matematika-ochiq-darsi',
            title: 'Matematika: Oliy matematika asoslari',
            teacher_name: 'Eshmatov Toshmat',
            lesson_date: '2025-12-28T10:00:00Z',
            description: 'Oliy matematika bo‘yicha amaliy ochiq dars mashg‘uloti.',
            image_url: '/images/hero.jpg',
            views: 125
        },
        {
            id: 2,
            slug: 'fizika-ochiq-darsi',
            title: 'Fizika: Kvant mexanikasi',
            teacher_name: 'Boltaboyev G‘ulom',
            lesson_date: '2025-12-29T14:30:00Z',
            description: 'Kvant mexanikasi nazariyasi bo‘yicha ma’ruza darsi.',
            image_url: '/images/hero.jpg',
            views: 89
        }
    ];
};

export const getOpenLessonBySlug = async (slug: string): Promise<OpenLessonDetail | undefined> => {
    const lessons = await getOpenLessons();
    const lesson = lessons.find(l => l.slug === slug);

    if (!lesson) return undefined;

    return {
        ...lesson,
        content: '<p>Ushbu darsda oliy matematikaning eng muhim bo‘limlari va ularning amaliyotda qo‘llanilishi haqida batafsil ma’lumot beriladi.</p>',
        department: {
            id: 1,
            name: 'Matematika kafedrasi'
        },
        gallery: ['/images/hero.jpg', '/images/hero.jpg'],
        attachments: [
            { name: 'Dars rejasi.pdf', url: '#' },
            { name: 'Prezentatsiya.pptx', url: '#' }
        ]
    };
};
