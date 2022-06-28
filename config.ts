import getConfig from "next/config";

export const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable =
    publicRuntimeConfig[environmentVariable];
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
  stripePubKey: getEnvironmentVariable("STRIPE_PUBLIC_KEY"),
  maxFileSize: getEnvironmentVariable("MAX_FILE_SIZE"),
  maxImageSize: getEnvironmentVariable("MAX_IMAGE_SIZE"),
  universePrivKey: getEnvironmentVariable("UNIVERSE_PRIVATE_KEY"),
};
