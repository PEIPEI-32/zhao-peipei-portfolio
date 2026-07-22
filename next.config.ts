import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local development does not expose Cloudflare's ASSETS/IMAGES bindings.
    // Serve the already-compressed WebP art files directly instead of routing
    // them through the Worker image optimizer.
    unoptimized: true,
  },
};

export default nextConfig;
