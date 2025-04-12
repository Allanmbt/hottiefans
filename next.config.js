const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'hmiidswyonnutgbljyws.supabase.co'
        ],
    },
};

module.exports = withContentlayer(nextConfig);