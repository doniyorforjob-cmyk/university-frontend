import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { getDocumentBySlug, getAllDocuments, DocumentEntry } from '@/api/http/documents.http';
import DetailTemplate from '@/components/templates/DetailTemplate';
import DocumentList from '@/components/shared/DocumentList';
import PageSkeleton from '@/components/shared/PageSkeleton';
import EmptyState from '@/components/shared/EmptyState';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import DocumentCard from '@/components/shared/DocumentCard';

const DocumentsPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { locale } = useLocale();
    const { t } = useTranslation('common');
    const { setSidebarType, setBreadcrumbsData } = useGlobalLayout();

    const [document, setDocument] = useState<DocumentEntry | null>(null);
    const [allDocuments, setAllDocuments] = useState<DocumentEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setSidebarType('info');

        const fetchContent = async () => {
            setLoading(true);
            try {
                if (slug) {
                    const data = await getDocumentBySlug(slug, locale);
                    setDocument(data);
                } else {
                    const data = await getAllDocuments(locale);
                    setAllDocuments(data);
                }
            } catch (err) {
                console.error('Error fetching content:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();

        return () => {
            setSidebarType(undefined);
            setBreadcrumbsData(undefined);
        };
    }, [slug, locale, setSidebarType, setBreadcrumbsData]);

    // Update global breadcrumbs when data is loaded
    useEffect(() => {
        if (!loading) {
            const breadItems = [
                { label: t('home', 'Bosh sahifa'), href: `/${locale}` },
                { label: t('documents', 'Hujjatlar'), href: slug ? `/${locale}/documents` : undefined }
            ];

            if (slug && document) {
                breadItems.push({ label: document.title, href: undefined });
            }

            setBreadcrumbsData(breadItems);
        }
    }, [loading, slug, document, locale, t, setBreadcrumbsData]);

    if (loading) {
        return <PageSkeleton />;
    }

    if (!slug) {
        // LIST VIEW (ALL DOCUMENTS)
        return (
            <DetailTemplate
                title={t('documents', 'Hujjatlar')}
                contentType="info"
                showSidebar={false}
            >
                {allDocuments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {allDocuments.map((doc) => (
                            <DocumentCard
                                key={doc.id}
                                title={doc.title}
                                slug={doc.slug}
                                filesCount={doc.files.length}
                                publishDate={doc.publishDate}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState resourceKey="info" className="mt-8" />
                )}
            </DetailTemplate>
        );
    }

    if (!document) {
        return (
            <DetailTemplate
                title={t('documents', 'Hujjatlar')}
                contentType="info"
                showSidebar={false}
            >
                <EmptyState resourceKey="info" className="mt-8" />
            </DetailTemplate>
        );
    }

    // DETAIL VIEW (SINGLE DOCUMENT COLLECTION)
    return (
        <DetailTemplate
            title={document.title}
            contentType="info"
            content={document.description}
            meta={{
                publishDate: document.publishDate
            }}
            showSidebar={false}
        >
            <div className="mt-8">
                <DocumentList files={document.files} />
            </div>
        </DetailTemplate>
    );
};

export default DocumentsPage;
