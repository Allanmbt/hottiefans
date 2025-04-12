import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    // 如果不想让谷歌爬虫检索网站，将allow设置为false
    return {
        rules: {
            userAgent: "*",
            disallow: ["/"], // 禁止所有爬虫爬取网站
            // allow: "/", // 当你准备好被索引时，改为这行
        },
        sitemap: "https://farangfun.com/sitemap.xml",
    };
}