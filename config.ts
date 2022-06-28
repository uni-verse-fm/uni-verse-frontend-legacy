import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const getPublicEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = publicRuntimeConfig[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

const getPrivateEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = serverRuntimeConfig[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  apiUrl: getPublicEnvironmentVariable("API_URL"),
  minioUrl: getPublicEnvironmentVariable("MINIO_URL"),
  stripePubKey: getPublicEnvironmentVariable("UNIVERSE_PUBLIC_KEY"),
  stripePrivKey: getPublicEnvironmentVariable("STRIPE_SECRET_KEY"),
  maxFileSize: getPublicEnvironmentVariable("MAX_FILE_SIZE"),
  maxImageSize: getPublicEnvironmentVariable("MAX_IMAGE_SIZE"),
  universePrivKey: getPrivateEnvironmentVariable("UNIVERSE_ADMIN_PRIVATE_KEY"),
  univereEmail: getPrivateEnvironmentVariable("UNIVERSE_EMAIL"),
  universePassword: getPrivateEnvironmentVariable("UNIVERSE_PASSWORD"),
};
