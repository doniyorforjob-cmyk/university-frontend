import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage'; // Assuming relative path or use alias

interface ImageViewerProps {
    isOpen: boolean;
    onClose: () => void;
    images: { src: string; alt?: string }[];
    currentIndex: number;
    onNext: () => void;
    onPrev: () => void;
    setCurrentIndex?: (index: number) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
    isOpen,
    onClose,
    images,
    currentIndex,
    onNext,
    onPrev,
    setCurrentIndex
}) => {
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;

        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'ArrowRight') {
            onNext();
        } else if (e.key === 'ArrowLeft') {
            onPrev();
        }
    }, [isOpen, onClose, onNext, onPrev]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        // Prevent scrolling when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen || images.length === 0) return null;

    const currentImage = images[currentIndex];

    return (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center backdrop-blur-sm">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 p-2 bg-black/50 rounded-full"
            >
                <X size={32} />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50 p-3 bg-black/50 rounded-full hover:bg-black/70"
                    >
                        <ChevronLeft size={40} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50 p-3 bg-black/50 rounded-full hover:bg-black/70"
                    >
                        <ChevronRight size={40} />
                    </button>
                </>
            )}

            {/* Main Image Container */}
            <div
                className="relative w-full h-full flex items-center justify-center p-4 md:p-10"
                onClick={onClose}
                role="button"
                tabIndex={0}
                aria-label="Close lightbox"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        onClose();
                    }
                }}
            >
                <div
                    className="relative max-w-full max-h-full"
                    onClick={(e) => e.stopPropagation()}
                    role="presentation"
                >
                    <OptimizedImage
                        src={currentImage.src}
                        alt={currentImage.alt || `Gallery Image ${currentIndex + 1}`}
                        className="max-w-[90vw] max-h-[90vh] object-contain rounded-md shadow-2xl"
                    />
                    {/* Caption/Counter */}
                    <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white/90 font-medium">
                        {currentImage.alt && <p className="mb-1 text-lg">{currentImage.alt}</p>}
                        <span className="text-sm opacity-75">{currentIndex + 1} / {images.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageViewer;
