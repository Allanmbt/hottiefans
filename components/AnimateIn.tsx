"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimateInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
}

export function AnimateIn({
    children,
    className = "",
    delay = 0,
    direction = "up",
    duration = 0.5,
}: AnimateInProps) {
    const directions = {
        up: { y: 15 },
        down: { y: -15 },
        left: { x: 15 },
        right: { x: -15 },
    };

    const initial = { opacity: 0, ...directions[direction] };

    return (
        <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}