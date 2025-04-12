"use client";

import { useTheme } from "next-themes";
import Giscus from "@giscus/react";

export function GiscusComments() {
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === "dark" ? "dark" : "light";

    return (
        <div className="mt-10 pt-10 border-t">
            <Giscus
                id="comments"
                repo="Allanmbt/farangfun-blog"
                repoId="R_kgDOOTcmnw"
                category="Announcements"
                categoryId="DIC_kwDOOTcmn84Cov_f"
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={theme}
                lang="en"
                loading="lazy"
            />
        </div>
    );
}