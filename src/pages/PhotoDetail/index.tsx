import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { homeApi } from '../../services/homeService';
import DetailTemplate, { DetailMeta } from '@/components/templates/DetailTemplate';
import { PageSkeleton } from '@/components/shared';

const PhotoDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { setSidebarType } = useGlobalLayout();
    const [photoItem, setPhotoItem] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhotoDetail = async () => {
            if (!id) {
                setError('Fotosurat topilmadi.');
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                // homeApi.getPhotoDetailById nomi bilan yangi funksiya qo'shilgan
                const data = await (homeApi as any).getPhotoDetailById(id);
                if (data) {
                    setPhotoItem(data);
                } else {
                    setError('Fotosurat topilmadi.');
                }
            } catch (err) {
                setError('Ma\'lumotni yuklashda xatolik yuz berdi.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotoDetail();

        setSidebarType('systems');
        return () => {
            setSidebarType(undefined);
        };
    }, [id, setSidebarType]);

    if (loading) {
        return <PageSkeleton type="news" />; // Photo uchun alohida skeleton bo'lmagani uchun news ishlatildi
    }

    if (error || !photoItem) {
        return (
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-red-600 mb-4">{error || 'Fotosurat topilmadi'}</p>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Bosh sahifaga qaytish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const meta: DetailMeta = {
        publishDate: photoItem.uploadDate,
        author: photoItem.author || "Axborot xizmati",
        category: photoItem.category,
        views: photoItem.views || 0
    };

    return (
        <DetailTemplate
            title={photoItem.title}
            contentType="news" // Layout uchun 'news' ishlatiladi
            heroImage={photoItem.image}
            heroImageAlt={photoItem.title}
            content={photoItem.content}
            meta={meta}
            breadcrumbs={[
                { label: 'Bosh sahifa', href: '/' },
                { label: 'Fotogalereya', href: '#' },
                { label: photoItem.title }
            ]}
            showMeta={true}
            showSocialShare={true}
            showPrintButton={true}
            showComments={false}
            showSidebar={false}
            socialShare={{
                facebook: true,
                telegram: true,
                copy: true
            }}
        />
    );
};

export default PhotoDetailPage;
