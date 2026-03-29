import React, { useState } from 'react';
import { FiDownload, FiExternalLink } from 'react-icons/fi';

interface DownloadLinkProps {
  fileUrl?: string;
  contentToDownload?: string;
  fileName?: string;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  asLink?: boolean; // Agar true bo'lsa, oddiy <a> tegi sifatida ishlaydi
  onDownloadStart?: () => void;
  onDownloadComplete?: () => void;
  onError?: (error: Error) => void;
  disabled?: boolean;
}

/**
 * Qayta ishlatiladigan yuklab olish tugmasi komponenti
 * Fayllarni yuklab olish uchun ishlatiladi
 */
const DownloadLink: React.FC<DownloadLinkProps> = ({
  fileUrl,
  contentToDownload,
  fileName,
  label = 'Yuklab olish',
  icon,
  className = '',
  asLink = false,
  onDownloadStart,
  onDownloadComplete,
  onError,
  disabled
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (disabled || loading || (!fileUrl && !contentToDownload)) return;

    setLoading(true);
    onDownloadStart?.();

    try {
      let blob: Blob;

      if (contentToDownload) {
        // Agar matn berilgan bo'lsa, matndan Blob yaratish
        blob = new Blob([contentToDownload], { type: 'text/plain;charset=utf-8' });
      } else if (fileUrl) {
        // Agar URL berilgan bo'lsa, fetch orqali yuklash
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('Yuklab olish muvaffaqiyatsiz');
        blob = await response.blob();
      } else {
        throw new Error('Yuklab olish uchun manba topilmadi');
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      onDownloadComplete?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Noma\'lum xatolik');
      console.error('Yuklab olish xatosi:', error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const buttonContent = (
    <>
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Yuklanmoqda...
        </>
      ) : (
        <>
          {icon || <FiDownload />}
          {label}
        </>
      )}
    </>
  );

  if (asLink) {
    return (
      <a
        href={fileUrl} // asLink faqat URL bilan ishlaydi
        download={fileName}
        className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${className}`}
        aria-label={label}
      >
        {icon || <FiExternalLink />}
        {label}
      </a>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
      aria-label={label}
    >
      {buttonContent}
    </button>
  );
};

export default DownloadLink;