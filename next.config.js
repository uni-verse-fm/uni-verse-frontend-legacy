/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      process.env.MINIO_URL || "http://localhost:9000",
      `${process.env.MINIO_URL || "http://localhost:9000"}/images`,
      `${process.env.MINIO_URL || "http://localhost:9000"}/tracks`,
    ],
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    MINIO_URL: process.env.MINIO_URL,
    UNIVERSE_PRIVATE_KEY: process.env.UNIVERSE_PRIVATE_KEY,
    UNIVERSE_EMAIL: process.env.UNIVERSE_EMAIL,
    UNIVERSE_PASSWORD: process.env.UNIVERSE_PASSWORD,
  },
};

module.exports = nextConfig;
