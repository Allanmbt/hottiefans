import { allBlogs } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://farangfun.com";

    // 创建博客文章的URL数组
    const blogPosts = allBlogs.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.lastUpdated || post.date,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // 核心页面
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: "daily" as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date().toISOString(),
            changeFrequency: "daily" as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        },
    ];

    return [...staticPages, ...blogPosts];
}