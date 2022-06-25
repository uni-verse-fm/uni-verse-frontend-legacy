export const MAX_FILE_SIZE = process.env.NEXT_PUBLIC_MAX_FILE_SIZE
  ? Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE)
  : 10_000_000;
export const MAX_IMAGE_SIZE = process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE
  ? Number(process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE)
  : 3_000_000;

export const BASE_API =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const MOCK_BASE_API =
  "https://6276b27f2f94a1d706062d0f.mockapi.io/api/v2";

export const Extensions = {
  image: {
    extensions: ["PNG", "JPG", "GIF"],
    accept: "image/*",
  },
  audio: {
    extensions: ["MP3", "WAV", "FLAC"],
    accept: "audio/*",
  },
};

export const Messages = {
  TITLE: "Must be 15 characters or less",
  DESCRIPTION: "Must be at least 5 characters or less",
  USERNAME: "Must be 15 characters or less",
  INVALID_EMAIL: "Invalid email format",
  NO_PASSWORD: "No password provided.",
  SHORT_PASWORD: "Password must be at least 8 characters",
  REQUIRED: "Required",
  NO_FILE: "No file uploaded",
  LARGE_FILE_LIST: "One or more files are too large",
  LARGE_FILE: "File is too large",
  NOT_IMPLEMENTED: "Not implemented",
  ERROR_LOAD: "Sorry we couldn't load the data",
  FILE_NAME_DUPLICATE: "file name already exists",
  TITLE_DUPLICATE: "title already exists",
  PASSWORD_MISMATCH: "Passwords must match",
  EMPTY_PLAYLISTS: "You have no playlists",
  EMPTY_RELEASES: "You have no releases",
  EMPTY_TRACKS: "You have no tracks",
  DISCONNECTED: "Disconnected",
  UNAUTHORIZED: "Unauthorized please login",
  DONATION_ERROR: "Sorry the donation couldn't be done",
  PURCHASE_ERROR: "Sorry the purchase couldn't be done",
  DONATION_SUCCESS: "Thank you for your support",
  PURCHASE_SUCCESS: "Thank you for your purchase",
  EMPTY_FUZZY_RESULT: "No results with those specifications",
};

export const trackSource = `${process.env.MINIO_URL || "http://localhost:9000"}/tracks/`;

export const imageSource = `${process.env.MINIO_URL || "http://localhost:9000"}/images/`;
