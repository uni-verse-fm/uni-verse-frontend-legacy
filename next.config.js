/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      `${process.env.NEXT_PUBLIC_MINIO_URL}`,
      `${process.env.NEXT_PUBLIC_MINIO_URL}/images`,
      `${process.env.NEXT_PUBLIC_MINIO_URL}/tracks`,
    ],
  },
  env: {
    STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    UNIVERSE_PRIVATE_KEY: process.env.UNIVERSE_PRIVATE_KEY,
    UNIVERSE_EMAIL: process.env.UNIVERSE_EMAIL,
    UNIVERSE_PASSWORD: process.env.UNIVERSE_PASSWORD,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    MINIO_URL: process.env.NEXT_PUBLIC_MINIO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

module.exports = nextConfig;
