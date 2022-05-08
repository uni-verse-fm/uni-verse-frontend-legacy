/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "tuk-cdn.s3.amazonaws.com", "i.ibb.co", "www.pngall.com"],
  },
};

module.exports = nextConfig;
