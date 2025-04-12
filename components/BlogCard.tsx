import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogCardProps {
    title: string;
    description: string;
    date: string;
    lastUpdated?: string; // 添加最后更新时间
    slug: string;
    image?: string;
    layout?: "vertical" | "horizontal";
}

export function BlogCard({
    title,
    description,
    date,
    lastUpdated,
    slug,
    image,
    layout = "vertical"
}: BlogCardProps) {
    // 根据布局选择合适的类
    const isHorizontal = layout === "horizontal";

    // 判断是否有最后更新时间且与发布时间不同
    const hasUpdated = lastUpdated && lastUpdated !== date;

    return (
        <Link href={`/blog/${slug}`}>
            <Card className={`overflow-hidden transition-all hover:bg-muted/40 hover:shadow-md ${isHorizontal ? "flex flex-row" : ""
                }`}>
                {image && (
                    <div className={`relative ${isHorizontal ? "w-1/3 min-h-[180px] md:min-h-[220px]" : "w-full h-48"
                        } overflow-hidden`}>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            sizes={isHorizontal
                                ? "(max-width: 768px) 33vw, 250px"
                                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            }
                        />
                    </div>
                )}

                <div className={isHorizontal ? "flex-1" : ""}>
                    <CardHeader className={`p-4 pb-0 ${isHorizontal ? "md:pt-6" : ""}`}>
                        <CardTitle className={`line-clamp-2 ${isHorizontal ? "text-xl md:text-2xl md:mb-2" : "text-lg"
                            }`}>
                            {title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={`p-4 pt-2 ${isHorizontal ? "md:space-y-3" : ""}`}>
                        <p className={`line-clamp-2 text-sm text-muted-foreground ${isHorizontal ? "md:text-base md:leading-relaxed" : ""
                            }`}>
                            {description}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                {hasUpdated ? (
                                    <span title={`Published: ${formatDate(date)}`}>
                                        Updated: {formatDate(lastUpdated)}
                                    </span>
                                ) : (
                                    <span>{formatDate(date)}</span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </Link>
    );
}