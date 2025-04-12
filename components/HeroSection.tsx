// components/HeroSection.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function HeroSection() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleScroll = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <div className="relative h-screen w-full flex flex-col justify-center">
            {/* 背景图 */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/incallpro-homepage.webp')" }}
            >
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* 内容区 */}
            <div className="container relative z-10 mx-auto px-4 md:px-6 text-white">
                <div className="max-w-3xl">
                    <div className="text-brand uppercase font-accent tracking-widest mb-4 font-bold">
                        Bangkok&apos;s Finest Erotic Massage
                    </div>
                    <h1 className="font-heading text-6xl md:text-8xl font-extrabold mb-6 leading-tight tracking-tight">
                        Tailored <br />
                        <span className="bg-gradient-to-r from-brand to-pink-400 text-transparent bg-clip-text">
                            for You
                        </span>
                    </h1>
                    <p className="text-xl md:text-xl mb-8 max-w-xl font-bold">
                        Experience Bangkok&apos;s premier sensual massage in a modern luxury setting. IncallPro offers smart booking, tailored treatments, and stunning private suites. Enjoy a personalized journey of pleasure with our certified therapists.
                    </p>

                    {/* 社交媒体图标 */}
                    {isMounted && (
                        <div className="flex space-x-4 mt-8">
                            <a href="#" className="bg-black/30 hover:bg-brand rounded-full p-3 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                                </svg>
                            </a>
                            {/* 其他社交媒体图标 */}
                        </div>
                    )}

                    {/* 向下滚动按钮 */}
                    {isMounted && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                            <button
                                className="animate-bounce bg-white/10 p-2 rounded-full"
                                onClick={handleScroll}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}