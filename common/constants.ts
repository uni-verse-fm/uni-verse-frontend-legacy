import { config } from "../config";

export const MAX_FILE_SIZE = Number(config.maxFileSize);
export const MAX_IMAGE_SIZE = Number(config.maxImageSize);

export const BASE_API = config.apiUrl;

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
  EMPTY_RESOURCE_PACKS: "No resourcePack to display",
  EMPTY_RESOURCES: "You have no resources",
  DISCONNECTED: "Disconnected",
  UNAUTHORIZED: "Unauthorized please login",
  DONATION_ERROR: "Sorry the donation couldn't be done",
  PURCHASE_ERROR: "Sorry the purchase couldn't be done",
  DONATION_SUCCESS: "Thank you for your support",
  PURCHASE_SUCCESS: "Thank you for your purchase",
  EMPTY_FUZZY_RESULT: "No results with those specifications",
  EMPTY_COMMENTS: "No comments",
};

export const headers = {
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": BASE_API,
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, Authorization, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Set-Cookie",
};

export const trackSource = `${config.minioUrl}/tracks/`;

export const previewSource = `${config.minioUrl}/previews/`;

export const imageSource = `${config.minioUrl}/images/`;
