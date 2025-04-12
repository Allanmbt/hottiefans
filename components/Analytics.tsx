// components/Analytics.tsx
"use client";

import Script from "next/script";

export function Analytics() {
    // 你已经部署的 Umami 实例信息
    const websiteId = "ab7ca02a-fa03-47ca-9f69-450b8813d82a";
    const umamiUrl = "https://umami-kappa-beryl.vercel.app";

    return (
        <Script
            async
            defer
            data-website-id={websiteId}
            src={`${umamiUrl}/script.js`}
            strategy="afterInteractive"
        />
    );
}