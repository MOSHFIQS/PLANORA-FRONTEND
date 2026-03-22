import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.ibb.co", "i.ibb.co.com","pub-0d12fc4043a5424095ae70c1f637df76.r2.dev"],
  },
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // <-- increase limit here
      // allowedOrigins?: ["https://yourdomain.com"] // optional
    },
  },
};

export default nextConfig;