import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAnnouncements } from '../../api/announcementApi';
import { Announcement } from '../../types/announcement';
import Sidebar from '../../components/shared/Sidebar';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '../../components/shared/Breadcrumbs';

const AnnouncementsPage: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const announcementsPerPage = 6;
    const [bannerImageUrl, setBannerImageUrl] = useState('https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop');

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await getAnnouncements();
                setAnnouncements(data);
            } catch (err) {
                setError('E\'lonlarni yuklashda xatolik yuz berdi.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // Pagination
    const indexOfLastAnnouncement = currentPage * announcementsPerPage;
    const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
    const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);
    const totalPages = Math.ceil(announcements.length / announcementsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    // Loading holatini olib tashladik - endi Suspense skeleton ishlatamiz

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
                    <h1 className="text-4xl font-bold">E&apos;lonlar</h1>
                </div>
            </div>

            {/* Asosiy kontent */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs
                    items={[
                        { label: 'Bosh sahifa', href: '/' },
                        { label: 'Axborot xizmati', href: '#' },
                        { label: "E'lonlar" },
                    ]}
                />
                <div className="flex flex-col lg:flex-row gap-10 mt-6">

                    {/* Chap ustun: E'lonlar ro'yxati */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {currentAnnouncements.map((announcement: Announcement) => (
                                <div key={announcement.id} className="group relative overflow-hidden h-64 transform hover:-translate-y-2 transition-transform duration-300">
                                    <Link to={`/announcements/${announcement.slug}`} className="block h-full">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={announcement.image_url || 'https://via.placeholder.com/400x400?text=Rasm+Mavjud+Emas'}
                                            alt={announcement.title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-4">
                                            <div className="flex items-center text-sm text-gray-300 mb-2">
                                                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                                                <time dateTime={announcement.published_at}>{new Date(announcement.published_at).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                                            </div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                                                {announcement.title}
                                            </h3>
                                            <p className="text-sm text-gray-200 mt-2 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden line-clamp-3">
                                                {announcement.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
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

export default AnnouncementsPage;