
export const MAX_FILE_SIZE = 2000000;
export const MAX_IMAGE_SIZE = 2000000;

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
    REQUIRED: "Required",
    NO_FILE: "No file uploaded",
    LARGE_FILE_LIST: "One or more files are too large",
    LARGE_FILE: "File is too large",
    NOT_IMPLEMENTED: "Not implemented",
};

export enum Pages {
  Home = " ",
  UploadRelease = "UploadRelease",
  UploadResourcePack = "UploadResourcePack",
}
  