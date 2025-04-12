import "@/app/globals.css";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@/components/Analytics";
import { Montserrat, Inter } from "next/font/google";

// 只保留两种更常用的字体，减少构建失败的风险
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap" // 添加display:swap提高加载性能
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap" // 添加display:swap提高加载性能
});

// 移除Space_Grotesk字体，它导致了构建错误

export const metadata: Metadata = constructMetadata({
  title: "HottieFans｜曼谷高端外围 & 上门服务平台",
  description: "HottieFans 致力于打造泰国曼谷顶级外围与上门服务平台，汇聚颜值与气质并存的精选女神，尊享私密奢华体验。100%真人认证，安全保密，专属高端客户的品质之选。",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${inter.variable}`}>
      <body className={`${inter.className} overflow-y-scroll`}>
        <ThemeProvider disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* 网站跟踪调用 */}
        <Analytics />
      </body>
    </html>
  );
}