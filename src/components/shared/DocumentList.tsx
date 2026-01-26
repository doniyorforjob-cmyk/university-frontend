import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, File, FileCode, ImageIcon } from 'lucide-react';
import { DocumentFile } from '../../api/http/documents.http';
import { useTranslation } from 'react-i18next';

interface DocumentListProps {
    files: DocumentFile[];
}

const getFileIcon = (ext: string = '') => {
    const e = ext.toLowerCase();
    if (['pdf'].includes(e)) return <FileText className="text-red-500" />;
    if (['doc', 'docx'].includes(e)) return <FileText className="text-blue-500" />;
    if (['xls', 'xlsx'].includes(e)) return <FileCode className="text-green-600" />;
    if (['jpg', 'jpeg', 'png', 'svg', 'webp'].includes(e)) return <ImageIcon className="text-purple-500" />;
    return <File className="text-gray-400" />;
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
    const { t } = useTranslation('common');

    if (!files || files.length === 0) return null;

    return (
        <div className="grid grid-cols-1 gap-4 mt-8">
            {files.map((file, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-blue-100 transition-all duration-300"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-300">
                            {getFileIcon(file.ext)}
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-base font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                {file.name}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs font-medium text-gray-400 uppercase">
                                    {file.ext || 'FILE'}
                                </span>
                                {file.size && (
                                    <>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="text-xs text-gray-400">
                                            {formatSize(file.size)}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <a
                        href={file.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <Download size={18} />
                        <span className="hidden sm:inline text-sm font-medium">
                            {t('download', 'Yuklab olish')}
                        </span>
                    </a>
                </motion.div>
            ))}
        </div>
    );
};

export default DocumentList;
