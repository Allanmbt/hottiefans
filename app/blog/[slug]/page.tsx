import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Metadata } from "next";
import { format } from "date-fns";
import { constructMetadata, generateBlogJsonLd } from "@/lib/seo";
import { Recommended } from "@/components/Recommended";
import { MDXContent } from "@/components/MDXContent";
import { AnimateIn } from "@/components/AnimateIn";
import { BlogHeader } from "@/components/BlogHeader";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { SocialShare } from "@/components/SocialShare"; // 这是我们将创建的社交分享组件

interface BlogPostProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return allBlogs.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: BlogPostProps): Promise<Metadata> {
    const post = allBlogs.find((post) => post.slug === params.slug);
    if (!post) return {};

    return constructMetadata({
        title: `${post.title} | HottieFans`,
        description: post.description,
        url: `https://hottie.fans/blog/${post.slug}`,
        ogImage: post.image || "/images/og-image.jpg",
        publishDate: post.date,
        lastUpdated: post.lastUpdated,
    });
}

export default function BlogPost({ params }: BlogPostProps) {
    const post = allBlogs.find((post) => post.slug === params.slug);

    if (!post) {
        notFound();
    }

    // 处理标签
    let tags: string[] = [];
    if (post.tags) {
        if (Array.isArray(post.tags)) {
            tags = post.tags;
        }
    }

    // JSON-LD
    const jsonLd = generateBlogJsonLd({
        ...post,
        dateModified: post.lastUpdated || post.date
    });

    const hasUpdated = post.lastUpdated && post.lastUpdated !== post.date;

    const formattedLastUpdated = hasUpdated && post.lastUpdated
        ? format(new Date(post.lastUpdated), "MMMM d, yyyy")
        : null;

    // 当前文章URL (用于社交分享)
    const articleUrl = `https://hottie.fans/blog/${post.slug}`;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* 博客头部 */}
            <BlogHeader
                title={post.title}
                image={post.image}
                date={post.date}
                lastUpdated={post.lastUpdated || undefined}
                author={post.author || "FarangFun"}
            />

            <article className="container py-8 md:py-12 max-w-3xl mx-auto">
                {hasUpdated && (
                    <AnimateIn className="mb-6">
                        <div className="text-sm text-muted-foreground">
                            Last updated on {formattedLastUpdated}
                        </div>
                    </AnimateIn>
                )}

                <AnimateIn delay={0.1} className="prose dark:prose-invert max-w-none">
                    <MDXContent code={post.body.code} />
                </AnimateIn>

                <AnimateIn delay={0.2}>
                    <div className="flex items-center justify-between flex-wrap gap-4 mt-8 pt-8 border-t">
                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-muted-foreground">
                                Published on {format(new Date(post.date), "MMMM d, yyyy")}
                            </p>
                        </div>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-xs rounded-md bg-muted">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </AnimateIn>

                {/* 再次添加社交分享图标 (文章底部) */}
                <AnimateIn delay={0.25} className="mt-8">
                    <div className="flex justify-end">
                        <SocialShare url={articleUrl} title={post.title} />
                    </div>
                </AnimateIn>

                <AnimateIn delay={0.3}>
                    <Recommended posts={allBlogs} currentPostSlug={post.slug} />
                </AnimateIn>
            </article>

            {/* 返回顶部按钮 */}
            <ScrollToTopButton />
        </>
    );
}