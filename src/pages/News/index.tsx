import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../services/postService';
import { Post } from '../../types/post';
import Sidebar from '../../components/shared/Sidebar';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { OptimizedImage } from '../../components/shared';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';

const NewsPage: React.FC = () => {
    const [articles, setArticles] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 8;
    const [bannerImageUrl, setBannerImageUrl] = useState('https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop');


    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getPosts('news');
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

    // Loading holatini olib tashladik - endi Suspense skeleton ishlatamiz

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    return (
        <div>
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
                        { label: 'Axborot xizmati', href: '#' },
                        { label: 'Yangiliklar' },
                    ]}
                />
                <div className="flex flex-col lg:flex-row gap-10 mt-6">

                    {/* Chap ustun: Yangiliklar ro'yxati */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {currentArticles.map((article) => (
                                <div
                                    key={article.id}
                                    className="flex flex-col bg-white overflow-hidden transition-all duration-300 relative group shadow-sm"
                                    onClick={(e) => e.preventDefault()}
                                    onKeyDown={(e) => e.preventDefault()}
                                    role="presentation"
                                >
                                    <div className="absolute bottom-0 left-0 h-1 bg-secondary w-[10%] group-hover:w-full transition-all duration-700 ease-out"></div>
                                    <Link
                                        to={`/news/${article.slug}`}
                                        className="h-48 overflow-hidden relative block"
                                    >
                                        <OptimizedImage
                                            src={article.image_url || 'https://via.placeholder.com/400x400?text=Rasm+Mavjud+Emas'}
                                            alt={article.title}
                                            className="w-full h-full object-cover"
                                            width={400}
                                            height={192}
                                            lazy={true}
                                        />
                                        <div className="absolute -bottom-3 left-4 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[30px] border-b-white"></div>
                                    </Link>
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
                                        <Link
                                            to={`/news/${article.slug}`}
                                            className="text-lg font-bold mb-4 flex-grow hover:text-blue-600 transition-colors"
                                        >
                                            {article.title}
                                        </Link>
                                        <div className="mt-auto flex justify-end">
                                            <Link
                                                to={`/news/${article.slug}`}
                                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                                            >
                                                Batafsil
                                                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <PaginationItem key={index + 1}>
                                            <PaginationLink
                                                onClick={() => handlePageChange(index + 1)}
                                                isActive={currentPage === index + 1}
                                                className="cursor-pointer"
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
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