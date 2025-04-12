'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play, Pause, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSwipeable } from 'react-swipeable';

export interface MediaItem {
    id: string;
    type: 'image' | 'video';
    url: string;
    alt?: string;
    thumbnail?: string;
}

interface TherapistGalleryProps {
    media: MediaItem[];
    className?: string;
}

export const TherapistGallery = ({ media, className }: TherapistGalleryProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);
    const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({});
    const [touchStart, setTouchStart] = useState(0);
    const thumbnailsRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<Record<string, HTMLVideoElement>>({});

    const currentMedia = media[currentIndex];

    // Handle video play/pause
    const togglePlay = (id: string, event?: React.MouseEvent) => {
        event?.stopPropagation();

        const video = videoRefs.current[id];
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(prev => ({ ...prev, [id]: true }));
        } else {
            video.pause();
            setIsPlaying(prev => ({ ...prev, [id]: false }));
        }
    };

    // Stop all videos when changing slides or closing lightbox
    const stopAllVideos = () => {
        Object.values(videoRefs.current).forEach(video => {
            if (video && !video.paused) {
                video.pause();
            }
        });
        setIsPlaying({});
    };

    // Navigate through gallery
    const navigate = (direction: 'prev' | 'next', event?: React.MouseEvent) => {
        event?.stopPropagation();
        stopAllVideos();

        if (direction === 'prev') {
            setCurrentIndex(prev => (prev > 0 ? prev - 1 : media.length - 1));
        } else {
            setCurrentIndex(prev => (prev < media.length - 1 ? prev + 1 : 0));
        }
    };

    // Handle thumbnail click
    const handleThumbnailClick = (index: number) => {
        if (index === currentIndex) return;
        stopAllVideos();
        setCurrentIndex(index);
    };

    // Scroll thumbnails when current index changes
    useEffect(() => {
        if (thumbnailsRef.current && media.length > 4) {
            const containerWidth = thumbnailsRef.current.offsetWidth;
            const thumbnailWidth = containerWidth / 4; // Show ~4 thumbnails at once
            const scrollPosition = (currentIndex - 1) * thumbnailWidth;

            thumbnailsRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth',
            });
        }
    }, [currentIndex, media.length]);

    // Touch swipe handlers
    const handlers = useSwipeable({
        onSwipedLeft: () => navigate('next'),
        onSwipedRight: () => navigate('prev'),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    // Lightbox handlers
    const openLightbox = () => {
        stopAllVideos();
        setShowLightbox(true);
    };

    const closeLightbox = (event?: React.MouseEvent) => {
        event?.stopPropagation();
        stopAllVideos();
        setShowLightbox(false);
    };

    return (
        <div className={cn("w-full", className)}>
            {/* Main Gallery */}
            <div className="relative rounded-xl overflow-hidden aspect-[3/4] md:aspect-[4/3] mb-3">
                <div
                    className="w-full h-full cursor-pointer relative"
                    onClick={openLightbox}
                    {...handlers}
                >
                    {currentMedia.type === 'image' ? (
                        <Image
                            src={currentMedia.url}
                            alt={currentMedia.alt || "Therapist photo"}
                            fill
                            priority
                            className="object-cover"
                        />
                    ) : (
                        <div className="relative w-full h-full">
                            <video
                                ref={(el) => {
                                    if (el) videoRefs.current[currentMedia.id] = el;
                                }}
                                src={currentMedia.url}
                                poster={currentMedia.thumbnail}
                                className="w-full h-full object-cover"
                                controls={false}
                                playsInline
                                muted
                            />
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black/30"
                                onClick={(e) => togglePlay(currentMedia.id, e)}
                            >
                                {isPlaying[currentMedia.id] ? (
                                    <Pause className="w-16 h-16 text-white opacity-80" />
                                ) : (
                                    <Play className="w-16 h-16 text-white opacity-80" />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate('prev', e);
                        }}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate('next', e);
                        }}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>

                    <div className="absolute bottom-3 right-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5"
                            onClick={(e) => {
                                e.stopPropagation();
                                openLightbox();
                            }}
                        >
                            <Maximize className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Thumbnails */}
            <div
                className="flex space-x-2 overflow-x-auto scrollbar-none py-1"
                ref={thumbnailsRef}
            >
                {media.map((item, index) => (
                    <div
                        key={item.id}
                        className={cn(
                            "flex-shrink-0 relative cursor-pointer rounded-md overflow-hidden w-16 h-16 md:w-20 md:h-20 border-2",
                            currentIndex === index ? "border-primary" : "border-transparent"
                        )}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        {item.type === 'image' ? (
                            <Image
                                src={item.url}
                                alt={item.alt || `Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <>
                                <Image
                                    src={item.thumbnail || item.url}
                                    alt={item.alt || `Video thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <Play className="w-6 h-6 text-white" />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {showLightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-[90%] max-w-7xl max-h-[90vh] overflow-hidden rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                            {...handlers}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={closeLightbox}
                                className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                            >
                                <X className="h-5 w-5" />
                            </Button>

                            <div className="relative w-full h-full">
                                {currentMedia.type === 'image' ? (
                                    <div className="relative w-full" style={{ height: 'calc(90vh - 100px)' }}>
                                        <Image
                                            src={currentMedia.url}
                                            alt={currentMedia.alt || "Therapist photo"}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-full" style={{ height: 'calc(90vh - 100px)' }}>
                                        <video
                                            ref={(el) => {
                                                if (el) videoRefs.current[`lightbox-${currentMedia.id}`] = el;
                                            }}
                                            src={currentMedia.url}
                                            poster={currentMedia.thumbnail}
                                            className="w-full h-full object-contain"
                                            controls
                                            playsInline
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="absolute left-2 top-1/2 -translate-y-1/2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                                    onClick={(e) => navigate('prev', e)}
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                            </div>

                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                                    onClick={(e) => navigate('next', e)}
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </div>

                            {/* Lightbox Thumbnails */}
                            <div className="absolute bottom-4 left-0 right-0">
                                <div className="flex justify-center space-x-2 px-4">
                                    {media.map((item, index) => (
                                        <div
                                            key={`lightbox-${item.id}`}
                                            className={cn(
                                                "w-12 h-12 rounded-md overflow-hidden cursor-pointer border-2",
                                                currentIndex === index ? "border-primary" : "border-white/30"
                                            )}
                                            onClick={() => handleThumbnailClick(index)}
                                        >
                                            {item.type === 'image' ? (
                                                <Image
                                                    src={item.url}
                                                    alt={item.alt || `Thumbnail ${index + 1}`}
                                                    width={48}
                                                    height={48}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={item.thumbnail || item.url}
                                                        alt={`Video thumbnail ${index + 1}`}
                                                        width={48}
                                                        height={48}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                        <Play className="w-4 h-4 text-white" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TherapistGallery; 