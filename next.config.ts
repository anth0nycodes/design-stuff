import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "animations.dev",
        pathname: "/**", // Allows all paths under this domain
      },
    ],
  },
};

export default nextConfig;
