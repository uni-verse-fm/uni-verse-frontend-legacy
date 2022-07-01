/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "minio.vagahbond.com",
      `${process.env.NEXT_PUBLIC_MINIO_URL}`,
      `${process.env.NEXT_PUBLIC_MINIO_URL}/images`,
      `${process.env.NEXT_PUBLIC_MINIO_URL}/tracks`,
    ],
  },
};

module.exports = nextConfig;
