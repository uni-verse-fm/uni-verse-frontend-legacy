export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  minioUrl: process.env.NEXT_PUBLIC_MINIO_URL,
  stripePubKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  maxFileSize: process.env.NEXT_PUBLIC_MAX_FILE_SIZE,
  maxImageSize: process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE,
  universePrivKey: process.env.NEXT_PUBLIC_UNIVERSE_PRIVATE_KEY,
};

Object.keys(config).forEach((k) => {
  if (!config[k]) {
    throw new Error(`Couldn't find environment variable: ${k}`);
  }
});
