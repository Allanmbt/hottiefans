'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, X, Maximize, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GallerySliderProps {
  items: {
    id: string;
    url: string;
    type: 'image' | 'video';
    thumbnail?: string;
  }[];
  className?: string;
  onBack?: () => void;
}

export function GallerySlider({ items, className, onBack }: GallerySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // 默认不播放
  const [isSwipeable, setIsSwipeable] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [previousDirection, setPreviousDirection] = useState<'left' | 'right' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // 处理左右导航
  const goToPrevious = () => {
    // 暂停当前视频
    pauseCurrentVideo();
    
    // 保存上一次的方向
    setPreviousDirection(swipeDirection);
    setSwipeDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    // 暂停当前视频
    pauseCurrentVideo();
    
    // 保存上一次的方向
    setPreviousDirection(swipeDirection);
    setSwipeDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  // 暂停当前视频
  const pauseCurrentVideo = () => {
    const currentItem = items[currentIndex];
    if (currentItem?.type === 'video' && videoRefs.current[currentItem.id]) {
      const video = videoRefs.current[currentItem.id];
      if (video) {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  // 处理选择缩略图
  const handleThumbnailClick = (index: number) => {
    // 暂停当前视频
    pauseCurrentVideo();
    
    // 保存上一次的方向
    setPreviousDirection(swipeDirection);
    
    if (index > currentIndex) {
      setSwipeDirection('left');
    } else if (index < currentIndex) {
      setSwipeDirection('right');
    }
    setCurrentIndex(index);
  };

  // 处理全屏切换
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 处理图片点击
  const handleImageClick = () => {
    toggleFullscreen();
  };

  // 处理视频播放/暂停
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    const currentItem = items[currentIndex];
    if (currentItem.type === 'video' && videoRefs.current[currentItem.id]) {
      const video = videoRefs.current[currentItem.id];
      if (video) {
        if (video.paused) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      }
    }
  };

  // 监听键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === ' ') {
        togglePlay();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isFullscreen]);

  // 当切换索引时，暂停所有视频
  useEffect(() => {
    // 暂停所有视频
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.pause();
      }
    });

    // 重置播放状态
    setIsPlaying(false);

    // 允许短暂延迟后滑动，防止误触
    setIsSwipeable(false);
    const timer = setTimeout(() => {
      setIsSwipeable(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [currentIndex, items]);

  // 触摸滑动处理
  const onTouchStart = (e: React.TouchEvent) => {
    // 如果是在缩略图区域触摸，不处理滑动
    if (thumbnailsRef.current && thumbnailsRef.current.contains(e.target as Node)) {
      return;
    }
    
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // 如果是在缩略图区域触摸，不处理滑动
    if (thumbnailsRef.current && thumbnailsRef.current.contains(e.target as Node)) {
      return;
    }
    
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    // 如果是在缩略图区域触摸，不处理滑动
    if (thumbnailsRef.current && thumbnailsRef.current.contains(document.activeElement)) {
      return;
    }
    
    if (!touchStart || !touchEnd || !isSwipeable) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // 视频元素引用回调
  const videoRef = (id: string) => (element: HTMLVideoElement) => {
    videoRefs.current[id] = element;
  };

  if (items.length === 0) {
    return <div className={cn("flex items-center justify-center min-h-[300px]", className)}>没有图片或视频</div>;
  }

  const currentItem = items[currentIndex];
  const isVideo = currentItem.type === 'video';

  // 修正的滑动动画，确保方向切换时不会反向
  const slideVariants = {
    enter: (direction: 'left' | 'right' | null) => {
      return {
        x: direction === 'left' ? "100%" : "-100%",
        opacity: 1
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right' | null) => {
      return {
        x: direction === 'left' ? "-100%" : "100%",
        opacity: 1
      };
    }
  };

  return (
    <div 
      className={cn(
        "relative",
        isFullscreen ? "fixed inset-0 z-50 bg-black" : "",
        className
      )}
      ref={sliderRef}
    >
      {/* 返回按钮 */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-6 z-50 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
      )}

      {/* 全屏按钮 */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-50 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 transition-colors"
      >
        {isFullscreen ? <X className="h-5 w-5 text-white" /> : <Maximize className="h-5 w-5 text-white" />}
      </button>

      {/* 主要内容区域 */}
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden bg-black",
          isFullscreen && "aspect-auto h-full"
        )}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false} mode="wait" custom={swipeDirection}>
          <motion.div
            key={currentIndex}
            custom={swipeDirection}
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full"
          >
            {isVideo ? (
              <div className="relative w-full h-full flex items-center justify-center" onClick={togglePlay}>
                <video
                  ref={videoRef(currentItem.id)}
                  src={currentItem.url}
                  className={cn(
                    "max-h-full max-w-full object-contain",
                    isFullscreen && "w-full h-full object-contain"
                  )}
                  playsInline
                  loop
                  poster={currentItem.thumbnail}
                >
                </video>
                
                {/* 视频控制按钮 - 播放/暂停按钮在中央 */}
                <button 
                  onClick={(e) => togglePlay(e)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                </button>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center" onClick={handleImageClick}>
                <Image 
                  src={currentItem.url} 
                  alt={`Gallery image ${currentIndex + 1}`}
                  className={cn(
                    "object-contain",
                    isFullscreen && "w-full h-full object-contain"
                  )}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={currentIndex < 3}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 缩略图和个人信息区域 - 覆盖相册底部并圆角显示 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/60 to-transparent pt-16 pb-4 pl-2 -mt-28">
        {/* 缩略图导航 */}
        <div 
          ref={thumbnailsRef}
          className="px-4 mb-1"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <div className="flex overflow-x-auto scrollbar-hide gap-3">
            {items.map((item, index) => (
              <div 
              key={item.id}
              className={`relative flex-shrink-0 cursor-pointer w-24 h-24 rounded-lg overflow-hidden ${
                index === currentIndex 
                  ? '!border-2 !border-[#FFB900] !border-solid' 
                  : 'opacity-70'
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
                {item.type === 'video' && item.thumbnail ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.thumbnail}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-1.5">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                ) : item.type === 'video' ? (
                  <div className="relative w-full h-full bg-gray-900">
                    {item.url && (
                      <Image 
                        src={item.url.replace(/\.(mp4|mov|avi|wmv)$/i, '.jpg')}
                        alt={`Video thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={(e) => {
                          // 如果缩略图加载失败，使用占位符
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-1.5">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 