import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['training-app-aws-bucket.s3.us-east-1.amazonaws.com'],
  },
};

export default nextConfig;
