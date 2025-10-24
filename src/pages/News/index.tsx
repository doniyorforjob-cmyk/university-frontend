import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNews } from '../../services/newsService';
import { NewsArticle } from '../../types/news';
import Sidebar from '../../components/Sidebar';
import Breadcrumbs from '../../components/Breadcrumbs';

const NewsPage: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 8;
    const [bannerImageUrl, setBannerImageUrl] = useState('https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop');


    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews();
                setArticles(data);
            } catch (err) {
                setError('Yangiliklarni yuklashda xatolik yuz berdi.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Pagination
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Sahifa almashganda yuqoriga o'tish
    };

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
                    <h1 className="text-4xl font-bold">Yangiliklar</h1>
                </div>
            </div>

            {/* Asosiy kontent */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
                <Breadcrumbs
                    items={[
                        { label: 'Bosh sahifa', href: '/' },
                        { label: 'Yangiliklar' },
                    ]}
                />
                <div className="flex flex-col lg:flex-row gap-10 mt-6">

                    {/* Chap ustun: Yangiliklar ro'yxati */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {currentArticles.map((article: NewsArticle) => (
                                <Link
                                    to={`/news/${article.slug}`}
                                    key={article.id}
                                    className="flex flex-col bg-white shadow-lg overflow-hidden transition-transform duration-300 hover:translate-y-2 hover:shadow-xl border-b-4 border-secondary"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={article.image_url || 'https://via.placeholder.com/400x400?text=Rasm+Mavjud+Emas'}
                                            alt={article.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                                            <span>{new Date(article.published_at).toLocaleDateString()}</span>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>{article.views}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-4 flex-grow">
                                            {article.title}
                                        </h3>
                                        <div className="mt-auto">
                                            {/* This div can be used later for tags or other info */}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${currentPage === index + 1 ? 'bg-blue-600 text-white shadow' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* O'ng ustun: Sidebar */}
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default NewsPage;