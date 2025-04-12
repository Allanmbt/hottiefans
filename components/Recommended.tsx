import Link from "next/link";
import Image from "next/image";
import { Blog } from "contentlayer/generated";
import { formatDate } from "@/lib/utils";

interface RecommendedProps {
    posts: Blog[];
    currentPostSlug: string;
}

export function Recommended({ posts, currentPostSlug }: RecommendedProps) {
    // Filter out the current post and get up to 3 recommended posts
    const recommendedPosts = posts
        .filter((post) => post.slug !== currentPostSlug)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    if (!recommendedPosts.length) return null;

    return (
        <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-4">Recommended Posts</h2>
            <div className="grid gap-4 md:grid-cols-3">
                {recommendedPosts.map((post) => (
                    // components/Recommended.tsx 修改示例
                    <Link key={post.slug} href={post.url} className="block group">
                        <div className="p-4 h-full rounded-lg border bg-card transition-colors group-hover:bg-muted/40">
                            {post.image && (
                                <div className="relative w-full h-32 mb-3 overflow-hidden rounded">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            )}
                            <h3 className="font-medium line-clamp-2 mb-2 group-hover:underline">
                                {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {post.description}
                            </p>
                            <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}