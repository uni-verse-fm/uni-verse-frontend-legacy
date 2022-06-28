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
  apiUrl: getEnvironmentVariable("API_URL"),
  minioUrl: getEnvironmentVariable("MINIO_URL"),
  stripePubKey: getEnvironmentVariable("UNIVERSE_PUBLIC_KEY"),
  stripePrivKey: getEnvironmentVariable("STRIPE_SECRET_KEY"),
  universePrivKey: getEnvironmentVariable("UNIVERSE_ADMIN_PRIVATE_KEY"),
  maxFileSize: getEnvironmentVariable("NEXT_PUBLIC_MAX_FILE_SIZE"),
  maxImageSize: getEnvironmentVariable("NEXT_PUBLIC_MAX_IMAGE_SIZE"),
  univereEmail: getEnvironmentVariable("UNIVERSE_EMAIL"),
  universePassword: getEnvironmentVariable("UNIVERSE_PASSWORD"),
};
