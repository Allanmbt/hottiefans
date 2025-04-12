"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
    className?: string;
    homeElement?: React.ReactNode;
    separator?: React.ReactNode;
    containerClasses?: string;
    listClasses?: string;
    activeItemClasses?: string;
    capitalizeLinks?: boolean;
}

export function Breadcrumb({
    className = "",
    homeElement = "Home",
    separator = <ChevronRight className="w-4 h-4" />,
    containerClasses = "flex",
    listClasses = "flex items-center space-x-1 text-sm",
    activeItemClasses = "",
    capitalizeLinks = true,
}: BreadcrumbProps) {
    const paths = usePathname();
    const pathNames = paths.split('/').filter((path) => path);

    // Custom names for routes
    const getDisplayName = (path: string) => {
        const routeMap: Record<string, string> = {
            'blog': 'Blog',
            'bangkok': 'Bangkok',
            'about': 'About',
            // Add more route mappings as needed
        };

        return routeMap[path] || path;
    };

    return (
        <nav aria-label="breadcrumb" className={`${containerClasses} ${className}`}>
            <ol className={listClasses}>
                {/* Home 永远是主题色 */}
                <li className="breadcrumb-item text-brand">
                    <Link href="/">
                        {homeElement}
                    </Link>
                </li>

                {pathNames.length > 0 && (
                    <li className="breadcrumb-separator">{separator}</li>
                )}

                {pathNames.map((name, index) => {
                    const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathNames.length - 1;
                    const displayName = getDisplayName(name);

                    // 是否为博文页面 - 检查URL结构或slug
                    const isBlogPost = pathNames[0] === 'blog' && pathNames.length > 1 && index > 0;

                    // 设置适当的CSS类
                    let itemClass = "breadcrumb-item";

                    // 如果是博文页面的目录部分，使用主色调
                    if (isBlogPost && !isLast) {
                        itemClass = "breadcrumb-item text-brand";
                    }
                    // 如果是目录页面的最后一项，使用普通样式
                    else if (isLast && pathNames.length === 1) {
                        itemClass = "breadcrumb-item";
                    }
                    // 如果是博文页面的最后一项，使用普通样式
                    else if (isLast && isBlogPost) {
                        itemClass = "breadcrumb-item";
                    }
                    // 如果是博文页面的第一层目录(blog)，使用主色调
                    else if (pathNames[0] === 'blog' && index === 0) {
                        itemClass = "breadcrumb-item text-brand";
                    }

                    return (
                        <li key={routeTo} className="flex items-center">
                            {isLast ? (
                                <span className={itemClass}>
                                    {capitalizeLinks
                                        ? displayName.charAt(0).toUpperCase() + displayName.slice(1).toLowerCase()
                                        : displayName}
                                </span>
                            ) : (
                                <>
                                    <Link href={routeTo} className={itemClass}>
                                        {capitalizeLinks
                                            ? displayName.charAt(0).toUpperCase() + displayName.slice(1).toLowerCase()
                                            : displayName}
                                    </Link>
                                    <span className="breadcrumb-separator mx-2">{separator}</span>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}