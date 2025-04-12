"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HeadphonesIcon,
    Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from '@/components/Logo';
import { CustomerServiceDialog } from './CustomerServiceDialog';

const languages = [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
];

export function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(true);
    const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('zh');

    // 处理滚动事件以在滚动时向导航栏添加背景
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        // 初始调用一次
        if (typeof window !== 'undefined') {
            handleScroll();
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 路由变化时关闭客服弹窗
    useEffect(() => {
        setIsCustomerServiceOpen(false);
    }, [pathname]);

    // 当客服弹窗打开时防止body滚动
    useEffect(() => {
        if (isCustomerServiceOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isCustomerServiceOpen]);

    // 设置语言
    const changeLanguage = (code: string) => {
        setCurrentLanguage(code);
        // 这里可以添加实际的语言切换逻辑
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                ? 'dark:bg-[#1D1C19]/95 bg-white/95 backdrop-blur-md shadow-md'
                : 'bg-transparent'
                }`}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo Component */}
                        <Logo className="h-9" />

                        {/* 右侧项目 */}
                        <div className="flex items-center gap-3">
                            {/* 客服按钮 */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-brand/10 rounded-full"
                                onClick={() => setIsCustomerServiceOpen(true)}
                            >
                                <HeadphonesIcon size={20} className="text-brand" />
                            </Button>

                            {/* 语言切换 */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="hover:bg-brand/10 rounded-full">
                                        <Globe size={20} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="dark:bg-[#1D1C19] border-brand"
                                >
                                    {languages.map((lang) => (
                                        <DropdownMenuItem
                                            key={lang.code}
                                            className={`${currentLanguage === lang.code ? "text-brand" : ""} hover:bg-brand/10`}
                                            onClick={() => changeLanguage(lang.code)}
                                        >
                                            {lang.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>

            {/* 客服联系弹出层 */}
            <CustomerServiceDialog 
                isOpen={isCustomerServiceOpen} 
                onClose={() => setIsCustomerServiceOpen(false)}
            />

            {/* 防止内容被导航栏遮挡的间隔 */}
            <div className="h-16"></div>
        </>
    );
}