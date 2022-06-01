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
      "localhost:9000",
    ],
  },
  env: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
};

module.exports = nextConfig;
