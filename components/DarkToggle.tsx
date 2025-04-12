// components/DarkToggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DarkToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // 仅在客户端挂载后处理
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // 如果未挂载，显示占位符以避免布局偏移
    if (!mounted) {
        return <div className="w-5 h-5"></div>;
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 dark:text-gray-300 dark:hover:text-white text-black hover:text-brand transition-colors"
            aria-label="Toggle dark mode"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
}