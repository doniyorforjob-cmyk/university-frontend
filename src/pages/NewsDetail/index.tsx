import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsBySlug } from '../../services/newsService';
import { NewsArticleDetail as NewsType } from '../../types/news';
import Breadcrumbs from '../../components/Breadcrumbs';

const NewsDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [newsItem, setNewsItem] = useState<NewsType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewsItem = async () => {
            if (!slug) {
                setError("Yangilik topilmadi.");
                setLoading(false);
                return;
            }
            try {
                const data = await getNewsBySlug(slug);
                if (data) {
                    setNewsItem(data);
                } else {
                    setError("Yangilik topilmadi.");
                }
            } catch (err) {
                setError("Yangilikni yuklashda xatolik yuz berdi.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsItem();
    }, [slug]);

    if (loading) {
        return <div className="text-center py-8">Yuklanmoqda...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    if (!newsItem) {
        return <div className="text-center py-8">Yangilik topilmadi.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="py-6">
                <Breadcrumbs
                    items={[
                        { label: 'Bosh sahifa', href: '/' },
                        { label: 'Yangiliklar', href: '/news' },
                        { label: newsItem.title },
                    ]}
                />
            </div>
            <img src={newsItem.image_url} alt={newsItem.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            <h1 className="text-4xl font-bold mb-4">{newsItem.title}</h1>
            <div className="flex items-center text-gray-600 text-sm mb-6">
                <span className="mr-4">{new Date(newsItem.published_at).toLocaleDateString()}</span>
                <span className="mr-4">Kategoriya: {newsItem.category.name}</span>
                <span>Ko&apos;rishlar soni: {newsItem.views}</span>
            </div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newsItem.content }} />
            <Link to="/news" className="mt-8 inline-block text-blue-600 hover:underline">
                &larr; Barcha yangiliklarga qaytish
            </Link>
        </div>
    );
};

export default NewsDetailPage;