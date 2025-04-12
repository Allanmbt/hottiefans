// components/Footer.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Footer() {
    const [year, setYear] = useState("2024"); // 使用字符串默认值避免水合错误

    useEffect(() => {
        setYear(new Date().getFullYear().toString());
    }, []);

    return (
        <footer className="border-t">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose md:text-left">
                        © {year} FarangFun. All rights reserved.
                    </p>
                </div>
                {/* <div className="flex gap-4">
                    <Link
                        href="https://twitter.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary"
                    >
                        Twitter
                    </Link>
                    <Link
                        href="https://github.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary"
                    >
                        GitHub
                    </Link>
                </div> */}
            </div>
        </footer>
    );
}