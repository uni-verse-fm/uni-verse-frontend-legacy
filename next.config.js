/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "picsum.photos",
      "tuk-cdn.s3.amazonaws.com",
      "i.ibb.co",
      "www.pngall.com",
      "loremflickr.com",
      // TODO: to be replaced with dynamic value
      "localhost",
      "localhost:9000",
      "localhost:9000/images",
      "minio.vagahbond.com",
      "minio.vagahbond.com/images"
    ],
  },
  env: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    MINIO_URL: process.env.MINIO_URL,
    UNIVERSE_PRIVATE_KEY: process.env.UNIVERSE_PRIVATE_KEY,
    UNIVERSE_EMAIL: process.env.UNIVERSE_EMAIL,
    UNIVERSE_PASSWORD: process.env.UNIVERSE_PASSWORD,
  },
};

module.exports = nextConfig;
