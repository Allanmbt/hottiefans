"use client";

import { motion } from "framer-motion";

interface LoadingIndicatorProps {
  isLoading: boolean;
}

export function LoadingIndicator({ isLoading }: LoadingIndicatorProps) {
  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative w-16 h-5 mb-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-3 h-3 rounded-full bg-brand"
            initial={{ x: i * 20 }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            style={{ left: `${i * 20}%` }}
          />
        ))}
      </div>
      <motion.p
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading more articles...
      </motion.p>
    </div>
  );
}

// 导出一个没有结果的版本，显示"没有更多文章"的消息
export function NoMorePosts() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
      </div>
      <p className="text-muted-foreground text-sm font-medium">
        You&apos;ve reached the end of our articles
      </p>
      <p className="text-muted-foreground/60 text-xs mt-1">
        Check back soon for more content
      </p>
    </motion.div>
  );
}