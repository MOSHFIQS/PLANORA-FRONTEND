import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com","muniquipllc.com","i.ibb.co.com","lh3.googleusercontent.com","lh3.googleusercontent.com"],
  },
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb", // <-- increase limit here
      // allowedOrigins?: ["https://yourdomain.com"] // optional
    },
  },
};

export default nextConfig;