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
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET, // Expõe o NEXTAUTH_SECRET para o Next.js
  },
};

export default nextConfig;
