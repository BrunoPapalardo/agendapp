import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Aceita qualquer host externo
      },
    ],
  },
};

export default nextConfig;
