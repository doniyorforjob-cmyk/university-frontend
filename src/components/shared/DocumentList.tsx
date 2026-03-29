import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, File as FileIcon, FileCode, ImageIcon, Eye as EyeIcon } from 'lucide-react';
import { saveAs } from 'file-saver';
import apiClient from '../../api/client';
import { DocumentFile } from '../../api/http/documents.http';

interface DocumentListProps {
    files: DocumentFile[];
}

const getFileIcon = (ext: string = '') => {
    const e = ext.toLowerCase();
    if (['pdf'].includes(e)) return <FileText className="text-red-500" />;
    if (['doc', 'docx'].includes(e)) return <FileText className="text-blue-500" />;
    if (['xls', 'xlsx'].includes(e)) return <FileCode className="text-green-600" />;
    if (['jpg', 'jpeg', 'png', 'svg', 'webp'].includes(e)) return <ImageIcon className="text-purple-500" />;
    return <FileIcon className="text-gray-400" />;
};

const formatSize = (bytes?: any) => {
    const b = Number(bytes);
    if (!b || isNaN(b) || b <= 0) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return parseFloat((b / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const DocumentList: React.FC<DocumentListProps> = ({ files }) => {
    if (!files || files.length === 0) return null;

    const handleDownload = async (e: React.MouseEvent, url: string, filename: string) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            // First attempt: try getting blob via apiClient (Axios handles baseURL and project-id nicely)
            const response = await apiClient.get(url, {
                responseType: 'blob',
                // Remove custom headers that might trigger CORS preflight on external asset servers
                headers: { 'project-id': undefined, 'Authorization': undefined }
            });
            saveAs(response.data, filename);
        } catch (apiError) {
            console.warn('apiClient download failed, trying native fetch:', apiError);
            try {
                // Second attempt: try plain native fetch (cleaner for direct file URLs)
                const res = await fetch(url, { mode: 'cors' });
                if (res.ok) {
                    const blob = await res.blob();
                    saveAs(blob, filename);
                    return;
                }
                throw new Error('Native fetch failed');
            } catch (fetchError) {
                console.error('All blob download attempts failed, using fallback:', fetchError);
                // Last Resort: Use a direct link. If it's a PDF/Image and CORS doesn't allow blob, 
                // the browser WILL open it in a new tab. We use target="_blank" to protect the current page.
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                document.body.appendChild(link);
                link.click();
                setTimeout(() => document.body.removeChild(link), 100);
            }
        }
    };

    return (
        <div className="flex flex-col gap-3 mt-8">
            {files.map((file, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100"
                >
                    <div className="flex items-center gap-4 overflow-hidden">
                        <div className="flex-shrink-0 p-2.5 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-white group-hover:text-primary group-hover:shadow-sm transition-all duration-300">
                            {getFileIcon(file.ext)}
                        </div>

                        <div className="flex flex-col min-w-0">
                            <h4 className="text-sm font-medium text-gray-700 truncate group-hover:text-gray-900 transition-colors">
                                {file.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span className="uppercase font-semibold tracking-wider">{file.ext}</span>
                                {file.size && (
                                    <>
                                        <span className="w-0.5 h-0.5 bg-gray-300 rounded-full" />
                                        <span>{formatSize(file.size)}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 pl-4">
                        {(() => {
                            const ext = (file.ext || '').toLowerCase().replace(/^\./, '').trim();
                            const isOffice = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext);
                            // Microsoft Viewer is often more reliable for docx/xlsx than Google's
                            const viewUrl = isOffice
                                ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(file.url)}`
                                : file.url;

                            return (
                                <a
                                    href={viewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 bg-primary rounded-full hover:opacity-90 transition-all duration-200 flex items-center justify-center shadow-sm text-white"
                                    title="Ko'rish"
                                >
                                    <EyeIcon size={17} className="text-white" />
                                </a>
                            );
                        })()}
                        <button
                            onClick={(e) => handleDownload(e, file.url, file.name)}
                            className="p-2 bg-primary rounded-full hover:opacity-90 transition-all duration-200 flex items-center justify-center shadow-sm text-white"
                            title="Yuklab olish"
                        >
                            <Download size={17} className="text-white" />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default DocumentList;
