import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        formats: ["image/avif", "image/webp"],
        contentDispositionType: "inline",
    },
};

export default nextConfig;

