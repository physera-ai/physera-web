import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.38",
    "192.168.0.200",
  ]
  /* config options here */
};

export default nextConfig;
