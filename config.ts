const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  minioUrl: getEnvironmentVariable("NEXT_PUBLIC_MINIO_URL"),
  stripePubKey: getEnvironmentVariable("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
  stripePrivKey: getEnvironmentVariable("STRIPE_SECRET_KEY"),
  universePrivKey: getEnvironmentVariable("NEXT_PUBLIC_UNIVERSE_PRIVATE_KEY"),
  maxFileSize: getEnvironmentVariable("NEXT_PUBLIC_MAX_FILE_SIZE"),
  maxImageSize: getEnvironmentVariable("NEXT_PUBLIC_MAX_IMAGE_SIZE"),
  univereEmail: getEnvironmentVariable("UNIVERSE_EMAIL"),
  universePassword: getEnvironmentVariable("UNIVERSE_PASSWORD"),
  apiUrl: getEnvironmentVariable("NEXT_PUBLIC_API_URL"),
};
