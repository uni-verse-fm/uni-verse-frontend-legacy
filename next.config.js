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
    JWT_SECRET: process.env.JWT_SECRET,
    UNIVERSE_EMAIL: process.env.UNIVERSE_EMAIL,
    UNIVERSE_PASSWORD: process.env.UNIVERSE_PASSWORD,
    GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
    GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
    GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    UNIVERSE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    MINIO_URL: process.env.NEXT_PUBLIC_MINIO_URL,
    UNIVERSE_PRIVATE_KEY: process.env.NEXT_PUBLIC_UNIVERSE_PRIVATE_KEY,
  },
};

module.exports = nextConfig;
