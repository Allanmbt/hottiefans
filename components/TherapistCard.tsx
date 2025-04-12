'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Girl } from '@/lib/supabase';

export type GirlCardProps = Partial<Girl> & {
    className?: string;
    onClick?: (id: string) => void;
    isFeatured?: boolean;
};

// 城市ID到城市名称的映射
const cityIdToName: Record<number, string> = {
    0: '曼谷',
    1: '芭提雅',
    2: '清迈',
};

export default function GirlCard({
    id,
    name,
    avatar,
    age,
    nationality = "🇹🇭",
    tags,
    browser_count = 0,
    min_price = 2500,
    className,
    onClick,
    isFeatured = true,
    badge,
    city_id = 0,
    language,
    experience,
}: GirlCardProps) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // 处理卡片点击
    const handleCardClick = () => {
        if (onClick && id) onClick(id);
    };

    // 处理标签滚动
    const handleTagsScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        setScrollPosition(target.scrollLeft);
        setCanScrollLeft(target.scrollLeft > 0);
        setCanScrollRight(target.scrollLeft < target.scrollWidth - target.clientWidth);
    };

    // 滚动标签到左边
    const scrollTagsLeft = (e: React.MouseEvent) => {
        e.stopPropagation();
        const tagsContainer = document.getElementById(`tags-container-${id}`);
        if (tagsContainer) {
            tagsContainer.scrollBy({ left: -100, behavior: 'smooth' });
        }
    };

    // 滚动标签到右边
    const scrollTagsRight = (e: React.MouseEvent) => {
        e.stopPropagation();
        const tagsContainer = document.getElementById(`tags-container-${id}`);
        if (tagsContainer) {
            tagsContainer.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };

    // 检查标签容器是否需要滚动按钮
    const checkTagsOverflow = (node: HTMLDivElement | null) => {
        if (node) {
            setCanScrollRight(node.scrollWidth > node.clientWidth);
        }
    };

    // 徽章样式
    const getBadgeStyle = () => {
        if (badge === 'new') {
            return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium';
        } else if (badge === 'top') {
            return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium';
        }
        return '';
    };

    // 从标签对象中提取中文标签
    const tagsArray = tags?.zh ? tags.zh.split(',').filter(tag => tag.trim() !== '') : [];

    // 获取城市名称
    const cityName = cityIdToName[city_id || 0] || '曼谷';

    // 女孩评分（暂时使用经验值作为评分）
    const rating = '4.8';

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Card
                className={cn(
                    "relative overflow-hidden rounded-xl border-0 bg-background shadow-md h-full",
                    isFeatured && "ring-1 ring-brand",
                    className
                )}
                onClick={handleCardClick}
            >
                {/* 头像区域 */}
                <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                        src={avatar?.url || "/images/girl.jpg"}
                        alt={name || ""}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-center transition-transform duration-500 ease-out hover:scale-105"
                        priority={isFeatured}
                        onError={(e) => {
                            // 图片加载失败时使用默认图片
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // 防止无限循环
                            target.src = "/images/girl.jpg";
                        }}
                    />

                    {/* 价格标签 */}
                    <div className="absolute top-3 left-3">
                        <Badge
                            className="text-xs bg-brand text-black font-semibold shadow-lg"
                        >
                            {min_price} ฿+
                        </Badge>
                    </div>

                    {/* Badge 标签 */}
                    {badge && (
                        <div className="absolute top-3 right-3">
                            <Badge
                                className={`text-xs font-semibold shadow-lg uppercase tracking-wider px-2 py-1 ${getBadgeStyle()}`}
                            >
                                {badge}
                            </Badge>
                        </div>
                    )}

                    {/* 渐变覆盖层 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* 底部信息区 */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="text-lg font-bold tracking-tight truncate max-w-[85%]">
                                {name}
                            </h3>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center space-x-2">
                                <span>{age} y.o.</span>
                                <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                                <span>{nationality}</span>
                            </div>

                            <div className="flex items-center">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                                <span>{rating}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 标签和数据区域 */}
                <div className="p-2 pt-2.5 pb-2.5 bg-background">
                    {/* 标签区域 - 可滚动 */}
                    <div className="relative h-8">
                        {/* 左滚动按钮 */}
                        {canScrollLeft && (
                            <button
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 backdrop-blur-sm rounded-full shadow-md"
                                onClick={scrollTagsLeft}
                            >
                                <ChevronLeft size={12} />
                            </button>
                        )}

                        {/* 标签滚动容器 */}
                        <div
                            id={`tags-container-${id}`}
                            className="flex overflow-x-auto pb-1 pt-1 scrollbar-hide snap-x h-full no-scrollbar"
                            onScroll={handleTagsScroll}
                            ref={checkTagsOverflow}
                        >
                            {tagsArray.map((tag, index) => (
                                <Badge
                                    key={`${id}-${tag}-${index}`}
                                    variant="outline"
                                    className="mr-1.5 whitespace-nowrap text-xs snap-start shadow-sm bg-muted hover:bg-brand/10 hover:text-brand"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* 右滚动按钮 */}
                        {canScrollRight && (
                            <button
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 backdrop-blur-sm rounded-full shadow-md"
                                onClick={scrollTagsRight}
                            >
                                <ChevronRight size={12} />
                            </button>
                        )}
                    </div>

                    {/* 显示城市和浏览量 */}
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center">
                            <MapPin size={14} className="mr-1" />
                            <span>{cityName}</span>
                        </div>
                        <div className="flex items-center">
                            <Eye size={14} className="mr-1" />
                            <span>{browser_count}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
} 