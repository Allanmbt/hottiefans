// components/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({
    children,
    // 删除 props 中的以下属性，以避免与 layout.tsx 中的属性冲突
    attribute,
    defaultTheme,
    enableSystem,
    ...props
}: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}