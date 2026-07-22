import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGitHubPages && repositoryName ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
  basePath,
  assetPrefix: basePath || undefined,
  typescript: {
    // The portfolio route is static; Cloudflare-only example modules are not
    // part of the GitHub Pages bundle and have no types in the Pages runner.
    ignoreBuildErrors: isGitHubPages,
  },
  images: {
    // Local development does not expose Cloudflare's ASSETS/IMAGES bindings.
    // Serve the already-compressed WebP art files directly instead of routing
    // them through the Worker image optimizer.
    unoptimized: true,
  },
};

export default nextConfig;
