import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, File, FileCode, ImageIcon } from 'lucide-react';
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
    if (!files || files.length === 0) return null;

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

                    <div className="flex-shrink-0 pl-4">
                        <a
                            href={file.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="block p-2 text-primary bg-primary/5 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
                        >
                            <Download size={18} />
                        </a>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default DocumentList;
