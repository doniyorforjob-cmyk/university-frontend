import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMediaArticles } from '../../api/mediaApi';
import { MediaArticle } from '../../types/media';
import Sidebar from '../../components/shared/Sidebar';
import { CalendarDaysIcon, LinkIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '../../components/shared/Breadcrumbs';

const MediaAboutUsPage: React.FC = () => {
    const [articles, setArticles] = useState<MediaArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [bannerImageUrl, setBannerImageUrl] = useState('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop');

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const data = await getMediaArticles();
                setArticles(data);
            } catch (err) {
                setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMedia();
    }, []);

    if (loading) {
        return <div className="text-center py-20">Yuklanmoqda...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-50">
            {/* Banner */}
            <div
                className="relative h-48 bg-cover bg-center"
                style={{ backgroundImage: `url('${bannerImageUrl}')` }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-white z-10">
                    <h1 className="text-4xl font-bold">OAV biz haqimizda</h1>
                </div>
            </div>

            {/* Asosiy kontent */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs
                    items={[
                        { label: 'Bosh sahifa', href: '/' },
                        { label: 'Axborot xizmati', href: '#' },
                        { label: 'OAV biz haqimizda' },
                    ]}
                />
                <div className="flex flex-col lg:flex-row gap-10 mt-6">
                    {/* Chap ustun: Kirish matni va Maqolalar ro'yxati */}
                    <div className="lg:w-3/4 space-y-8">
                        {/* Kirish matni uchun alohida blok */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <p className="text-lg text-gray-700">
                                Bu yerda universitetimiz faoliyati, yutuqlari va tadbirlari haqida respublika va xalqaro ommaviy axborot vositalarida chop etilgan maqolalar, reportajlar va intervyular to&apos;plami bilan tanishishingiz mumkin.
                            </p>
                        </div>

                        {/* Maqolalar ro'yxati */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <ul className="space-y-6">
                                {articles.map((article) => (
                                    <li key={article.id} className="border-b pb-6 last:border-b-0">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h3>
                                        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
                                            <span className="font-semibold">{article.source}</span>
                                            <div className="flex items-center">
                                                <CalendarDaysIcon className="w-4 h-4 mr-1.5" />
                                                <time dateTime={article.published_at}>
                                                    {new Date(article.published_at).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </time>
                                            </div>
                                        </div>
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                        >
                                            <LinkIcon className="w-5 h-5 mr-2" />
                                            Batafsil o&apos;qish
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* O'ng ustun: Sidebar */}
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default MediaAboutUsPage;