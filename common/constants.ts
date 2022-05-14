export const MAX_FILE_SIZE = 2000000;
export const MAX_IMAGE_SIZE = 2000000;

export const BASE_API = "http://localhost:3000/api/v2";

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

export const urlImage = "https://i.ibb.co/K984Tcf/Play-List-img.png";

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
  PASSWORD_MISMATCH: "Passwords must match",
  EMPTY_PLAYLIST: "You have no playlist",
  DISCONNECTED: "Disconnected",
  UNAUTHORIZED: "Unauthorized please login",
  DONATION_ERROR: "Sorry the donation couldn't be done",
  PURCHASE_ERROR: "Sorry the purchase couldn't be done",
  DONATION_SUCCESS: "Thank you for your support",
  PURCHASE_SUCCESS: "Thank you for your purchase"
};

export enum Pages {
  Home = " ",
  UploadRelease = "UploadRelease",
  UploadResourcePack = "UploadResourcePack",
  Login = "Login",
  SignUp = "SignUp",
}

export enum Endoints {
  Auth = "/auth",
  Users = "/users",
  Releases = "/releases",
  ResourcePacks = "/resource-packs",
  Playlists = "/playlists",
  Comments = "/comments",
  Payments = "/payments",
}
