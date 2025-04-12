"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface SocialShareProps {
    url: string;
    title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
    // 准备分享数据
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    // 分享链接
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    const redditUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;

    // 打开分享对话框
    const handleShare = (shareUrl: string) => {
        window.open(shareUrl, "_blank", "width=600,height=400");
    };

    return (
        <div className="flex space-x-2 items-center">
            <span className="text-sm text-muted-foreground">Share:</span>

            {/* Twitter */}
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleShare(twitterUrl)}
                aria-label="Share on Twitter"
            >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" />
                </svg>
            </Button>

            {/* Facebook */}
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleShare(facebookUrl)}
                aria-label="Share on Facebook"
            >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                </svg>
            </Button>

            {/* LinkedIn */}
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleShare(linkedinUrl)}
                aria-label="Share on LinkedIn"
            >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" />
                    <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" />
                    <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" />
                </svg>
            </Button>

            {/* Reddit */}
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleShare(redditUrl)}
                aria-label="Share on Reddit"
            >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M11 14.9291C9.28001 14.9291 7.89999 16.3091 7.89999 18.0891H11H12H15.12C15.12 16.3091 13.73 14.9291 12 14.9291H11Z" fill="white" />
                    <path d="M17.1199 11.3701C16.6599 10.9001 16.1299 10.8701 15.7499 10.8701C15.4299 10.8701 15.1099 10.9001 14.7399 11.0401C14.3999 11.1601 14.1199 11.3001 13.8699 11.4501C13.8699 11.4501 13.8699 11.4501 13.8699 11.4501C13.5999 11.6201 13.3599 11.8001 13.1599 11.9601C12.7799 12.2601 12.4299 12.5701 12.0499 12.8701C11.6699 12.5601 11.3199 12.2601 10.9499 11.9601C10.7499 11.8001 10.5099 11.6201 10.2399 11.4501C10.2099 11.4301 10.1799 11.4101 10.1499 11.3901C9.91989 11.2501 9.65989 11.1201 9.34989 11.0201C8.99989 10.9001 8.67989 10.8601 8.36989 10.8601C7.97989 10.8601 7.45989 10.9101 6.99989 11.3801C6.52989 11.8401 6.21989 12.4801 6.21989 13.1801C6.21989 13.8701 6.53989 14.5101 7.02989 14.9901C7.49989 15.4601 8.15989 15.7701 8.85989 15.7701C9.24989 15.7701 9.60989 15.7001 9.97989 15.5601C10.3399 15.4301 10.6199 15.2601 10.8099 15.1401C10.8099 15.1401 10.8099 15.1401 10.8099 15.1401C11.0799 14.9601 11.3199 14.7701 11.5199 14.6201C11.8199 14.3801 12.0699 14.1401 12.3099 13.9401C12.6399 14.1401 12.8899 14.3801 13.1699 14.6201C13.3699 14.7701 13.6099 14.9601 13.8799 15.1401C13.8799 15.1401 13.8799 15.1401 13.8799 15.1401C14.0399 15.2401 14.2799 15.3901 14.5999 15.5201C14.9699 15.6601 15.3299 15.7401 15.7199 15.7401C16.4199 15.7401 17.0799 15.4301 17.5499 14.9601C18.0399 14.4801 18.3599 13.8401 18.3599 13.1501C18.4099 12.4801 18.0999 11.8401 17.1199 11.3701Z" fill="white" />
                    <path d="M9.42993 14.0003C8.85993 14.0003 8.39993 13.5403 8.39993 12.9803C8.39993 12.4103 8.85993 11.9503 9.42993 11.9503C10.0099 11.9503 10.4599 12.4103 10.4599 12.9803C10.4699 13.5403 9.99993 14.0003 9.42993 14.0003Z" />
                    <path d="M14.6001 14.0003C14.0301 14.0003 13.5701 13.5403 13.5701 12.9803C13.5701 12.4103 14.0301 11.9503 14.6001 11.9503C15.1701 11.9503 15.6401 12.4103 15.6401 12.9803C15.6301 13.5403 15.1701 14.0003 14.6001 14.0003Z" />
                    <path d="M16.8 8.15039C17.4627 8.15039 18 7.61305 18 6.95039C18 6.28773 17.4627 5.75039 16.8 5.75039C16.1373 5.75039 15.6 6.28773 15.6 6.95039C15.6 7.61305 16.1373 8.15039 16.8 8.15039Z" fill="white" />
                </svg>
            </Button>
        </div>
    );
}