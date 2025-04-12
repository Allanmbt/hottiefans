// components/ScrollButton.tsx
"use client";

import React from 'react';

export function ScrollButton() {
    return (
        <button
            className="animate-bounce bg-white/10 p-2 rounded-full"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
        </button>
    );
}