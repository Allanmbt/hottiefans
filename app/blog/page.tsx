"use client";

import { useState, useEffect, useCallback } from "react";
import { compareDesc } from "date-fns";
import { useInView } from "react-intersection-observer";
import { allBlogs } from "contentlayer/generated";
import { BlogCard } from "@/components/BlogCard";
import { AnimateIn } from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";
import { motion } from "framer-motion";
import { LoadingIndicator, NoMorePosts } from "@/components/LoadingIndicator";

// 每页显示的博客数量
const POSTS_PER_PAGE = 9;

export default function BlogPage() {
    // 按日期排序所有博客文章
    const sortedPosts = allBlogs.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date))
    );

    // 状态管理
    const [posts, setPosts] = useState(sortedPosts.slice(0, POSTS_PER_PAGE));
    const [pageIndex, setPageIndex] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [reachedEnd, setReachedEnd] = useState(sortedPosts.length <= POSTS_PER_PAGE);
    const [displayType, setDisplayType] = useState<"grid" | "list">("grid");

    // 使用 Intersection Observer 检测元素是否在视图中
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

    // 加载更多文章
    const loadMorePosts = useCallback(async () => {
        if (loadingMore || reachedEnd) return;

        setLoadingMore(true);

        // 模拟网络延迟，实际项目中可能不需要
        await new Promise(resolve => setTimeout(resolve, 400));

        const nextIndex = pageIndex + 1;
        const startIndex = pageIndex * POSTS_PER_PAGE;
        const endIndex = nextIndex * POSTS_PER_PAGE;

        // 检查是否还有更多文章
        if (startIndex >= sortedPosts.length) {
            setReachedEnd(true);
            setLoadingMore(false);
            return;
        }

        // 获取下一页的文章
        const nextPosts = sortedPosts.slice(startIndex, endIndex);

        // 更新状态
        setPosts(prev => [...prev, ...nextPosts]);
        setPageIndex(nextIndex);

        // 检查是否已加载所有文章
        if (endIndex >= sortedPosts.length) {
            setReachedEnd(true);
        }

        setLoadingMore(false);
    }, [loadingMore, reachedEnd, pageIndex, sortedPosts]);  // 添加 sortedPosts

    // 监听 inView 变化，自动加载更多文章
    useEffect(() => {
        if (inView && !loadingMore && !reachedEnd) {
            loadMorePosts();
        }
    }, [inView, loadMorePosts, loadingMore, reachedEnd]);

    // 文章项目容器的动画变体
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="container py-8 md:py-12">
            <AnimateIn className="mb-4">
                <Breadcrumb />
            </AnimateIn>

            <AnimateIn className="mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
                        <p className="text-muted-foreground max-w-2xl">
                            Bangkok Male Entertainment Guide- Number one source of adult places, places of ill resort, nightlife and sex venues in Bangkok with Insider info membership packages
                        </p>
                    </div>

                    {/* 可选：添加视图切换按钮 */}
                    <div className="flex items-center space-x-2 border rounded-md p-1 self-start md:self-auto">
                        <Button
                            variant={displayType === "grid" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setDisplayType("grid")}
                            className={displayType === "grid" ? "bg-brand hover:bg-brand/90" : ""}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                        </Button>
                        <Button
                            variant={displayType === "list" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setDisplayType("list")}
                            className={displayType === "list" ? "bg-brand hover:bg-brand/90" : ""}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                <line x1="3" y1="18" x2="3.01" y2="18"></line>
                            </svg>
                        </Button>
                    </div>
                </div>
            </AnimateIn>

            <AnimateIn delay={0.1}>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className={displayType === "grid"
                        ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                        : "flex flex-col space-y-4"
                    }
                >
                    {posts.map((post, index) => (
                        <motion.div key={`${post.slug}-${index}`} variants={item}>
                            <BlogCard
                                title={post.title}
                                description={post.description}
                                date={post.date}
                                slug={post.slug}
                                image={post.image}
                                layout={displayType === "list" ? "horizontal" : "vertical"}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* 无限滚动触发点 */}
                <div ref={ref} className="w-full h-16 flex items-center justify-center mt-8">
                    <LoadingIndicator isLoading={loadingMore} />
                </div>

                {/* 加载更多按钮 - 为用户提供显式控制 */}
                {!reachedEnd && !loadingMore && (
                    <div className="flex justify-center mt-6 mb-8">
                        <Button
                            onClick={loadMorePosts}
                            className="bg-brand hover:bg-brand/90 text-white"
                            size="lg"
                        >
                            <span>Load More Articles</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                                <path d="M12 5v14M5 12h14"></path>
                            </svg>
                        </Button>
                    </div>
                )}

                {/* 显示结束信息 */}
                {reachedEnd && <NoMorePosts />}
            </AnimateIn>
        </div>
    );
}