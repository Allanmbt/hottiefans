"use client";

import Link from 'next/link';
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

interface LogoProps {
    className?: string;
}

export function Logo({ className = '' }: LogoProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // 仅在客户端挂载后处理
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Link href="/" className={`flex items-center ${className}`}>
            <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
            >
                <div className="font-bold flex items-center text-xl md:text-2xl tracking-tight">
                    <span
                        className="bg-gradient-to-r from-[#FFB900] to-[#FFC940] bg-clip-text text-transparent relative"
                        style={{
                            textShadow: "0px 0px 8px rgba(255, 185, 0, 0.3)",
                            fontFamily: "sans-serif",
                            fontWeight: "900",
                            letterSpacing: "-0.02em"
                        }}
                    >
                        HOTTIE
                    </span>
                    <span
                        className="relative"
                        style={{
                            fontWeight: "800",
                            letterSpacing: "-0.02em"
                        }}
                    >
                        <span className="absolute -inset-1 -z-10 blur-lg opacity-20 bg-gradient-to-r from-[#FFB900] to-[#FFC940] rounded-lg"></span>
                        <span className={`${mounted && resolvedTheme === 'dark' ? "text-white" : "text-black"}`}>FANS</span>
                    </span>
                </div>
                <div className="h-0.5 bg-gradient-to-r from-[#FFB900] to-[#FFC940] w-full absolute bottom-0 left-0 opacity-30 rounded-full"></div>
            </motion.div>
        </Link>
    );
}