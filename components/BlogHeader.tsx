"use client";

import { AnimateIn } from "@/components/AnimateIn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useTheme } from "next-themes";
import { Breadcrumb } from "@/components/Breadcrumb";

interface BlogHeaderProps {
  title: string;
  image?: string;
  date: string;
  lastUpdated?: string; // 使用可选属性
  author?: string;
}

export function BlogHeader({ title, image, date, lastUpdated, author }: BlogHeaderProps) {
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const { resolvedTheme } = useTheme();

  // 监听滚动事件，用于控制背景模糊效果的强度
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const opacity = Math.min(scrollTop / 200, 0.7); // 最大模糊度
      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 如果没有提供图片，则使用默认图片
  const headerImage = image || "/images/incallpro-homepage.webp";

  return (
    <div className="relative w-full overflow-hidden">
      {/* 固定高度的头部区域 */}
      <div className="h-[50vh] md:h-[60vh] relative flex items-center justify-center">
        {/* 背景图层 */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={headerImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* 渐变叠加层 - 底部黑色渐变，无论亮暗模式都使用黑色作为基础 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
          {/* 顶部黑色渐变叠加层 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-40"></div>
          {/* 整体暗色叠加层 - 在亮色模式下也使用深色背景确保文字可读性 */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
          {/* 动态模糊效果 - 随滚动变化 */}
          <div
            className="absolute inset-0 backdrop-blur-md transition-opacity duration-300"
            style={{ opacity: scrollOpacity }}
          ></div>
        </div>

        {/* 内容容器 */}
        <div className="container relative z-10 px-4 md:px-6 mt-16">
          <AnimateIn className="text-center max-w-4xl mx-auto">
            {/* 在这里放入面包屑 */}
            <div className="mb-4 flex justify-center">
              <Breadcrumb />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
              {title}
            </h1>
          </AnimateIn>
        </div>
      </div>
    </div>
  );
}