import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { homeApi } from '../../services/homeService';
import DetailTemplate, { DetailMeta } from '@/components/templates/DetailTemplate';
import { useTranslation } from 'react-i18next';
import EmptyState from '@/components/shared/EmptyState';
import { PhotoIcon } from '@heroicons/react/24/outline';
import PageSkeleton from '@/components/shared/PageSkeleton';

const PhotoDetailPage: React.FC = () => {
    const { t, i18n } = useTranslation(['common', 'pages']);
    const { id } = useParams<{ id: string }>();
    const { setSidebarType } = useGlobalLayout();
    const [photoItem, setPhotoItem] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhotoDetail = async () => {
            setError(null);
            setPhotoItem(null);
            if (!id) {
                setError(t('common:notFound'));
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const data = await homeApi.getPhotoDetailById(id, i18n.language);
                if (data) {
                    setPhotoItem(data);
                    setError(null);
                } else {
                    setError(t('common:notFound'));
                }
            } catch (err) {
                setError(t('common:errorLoading'));
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotoDetail();

        setSidebarType('systems'); // Or 'media' if available?
        return () => {
            setSidebarType(undefined);
        };
    }, [id, setSidebarType, t, i18n.language]);

    if (loading) {
        return <PageSkeleton type="news" />;
    }

    if (error || !photoItem) {
        return (
            <div className="bg-gray-50 min-h-screen pt-10">
                <EmptyState
                    resourceKey="photos"
                    icon={<PhotoIcon className="w-16 h-16 text-gray-400" />}
                    message={error || undefined}
                />
            </div>
        );
    }

    const meta: DetailMeta = {
        publishDate: photoItem.published_at || photoItem.created_at,
        author: photoItem.fields?.author || t('common:pressService', "Axborot xizmati"),
        category: t('pages:photoGallery', "Fotogalereya") as string,
        views: photoItem.views || 0
    };

    // Extract images
    // API returns 'cover-image' often, but we should check all common variations
    const heroImageRaw =
        photoItem.fields?.['cover-image'] ||
        photoItem.fields?.cover_image ||
        photoItem.fields?.image ||
        photoItem['cover-image'] ||
        photoItem.cover_image ||
        photoItem.image;

    // Helper to extract URL (similar to other transformers)
    const getUrl = (img: any) => {
        if (!img) return '';
        // If it sends full object with url/path
        if (typeof img === 'object' && !Array.isArray(img)) {
            return img.url || img.path || img.thumbnail_url || '';
        }
        if (Array.isArray(img)) {
            const first = img[0];
            if (typeof first === 'string') return first;
            return first?.url || first?.path || first?.thumbnail_url || '';
        }
        return img; // string
    }

    const heroImageUrlRaw = getUrl(heroImageRaw);
    // Ensure we use getImageUrl util to prepend base URL if needed
    // But we need to import it or implement simple check.
    // The previous code didn't import getImageUrl? 
    // Wait, PhotoDetail didn't import getImageUrl.
    // Let's just do a simple check or try to import it.
    // For now simple check:
    const getFullUrl = (path: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const apiBase = process.env.REACT_APP_API_BASE_URL || 'https://new.namdtu.uz';
        const baseUrl = apiBase.replace(/\/api\/?$/, '');
        return `${baseUrl}${path.startsWith('/') ? path : '/' + path}`;
    };

    const heroImageUrl = getFullUrl(heroImageUrlRaw);

    // Map gallery
    const galleryRaw = photoItem.fields?.gallery || photoItem.gallery || [];
    const gallery = Array.isArray(galleryRaw) ? galleryRaw.map((img: any) => ({
        src: getFullUrl(getUrl(img)),
        alt: photoItem.fields?.title || photoItem.title || 'Gallery Image'
    })) : [];

    // Combine hero image into gallery if needed? DetailTemplate combines them.
    // User wants grid.

    return (
        <DetailTemplate
            title={photoItem.fields?.title || photoItem.title}
            contentType="news"
            heroImage={heroImageUrl}
            heroImageAlt={photoItem.fields?.title || photoItem.title}
            gallery={gallery}
            galleryLayout="grid" // Max 4 items grid
            content={photoItem.fields?.description || photoItem.fields?.content || photoItem.description}
            meta={meta}
            breadcrumbs={[
                { label: t('common:home', 'Bosh sahifa'), href: '/' },
                { label: t('common:media', 'Media'), href: '#' },
                { label: t('pages:photoGallery', 'Fotogalereya'), href: '#' }
            ]}
            showMeta={true}
            showSocialShare={true}
            showPrintButton={true}
            showComments={false}
            showSidebar={false}
        />
    );
};

export default PhotoDetailPage;
