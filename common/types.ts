import { string } from "yup/lib/locale";

export interface IUsersList {
  data: IFeat[];
  onClick: (item: IFeat) => void;
}

export interface ITrack {
  file: File;
  title: string;
  feats: IFeat[];
}

export interface IFeat {
  id: string;
  username: string;
  email: string;
}

export interface ITracksTable {
  tracks: ITrack[];
  handleTrackTitleChange: (
    track: ITrack,
    index: number
  ) => (event: any) => void;
  handleAddFeat: (track: ITrack, index: number) => (feat: IFeat) => void;
  handleDeleteFeat: (track: ITrack, index: number) => (index: number) => void;
  handleTrackFileNameChange: (
    track: ITrack,
    index: number
  ) => (event: any) => void;
  handleDeleteFile: (index: number) => () => void;
  handleDragEnd;
}

export interface IFeatChange {
  handleAddFeat: (feat: IFeat) => void;
  handleDeleteFeat: (index: number) => void;
  track: ITrack;
}

export interface IResource {
  file: File;
  previewFile?: File;
  title: string;
}

export interface IResourcesTable {
  resources: IResource[];
  handleResourceTitleChange: (
    resource: IResource,
    index: number
  ) => (event: any) => void;
  handleResourceFileNameChange: (
    resource: IResource,
    index: number
  ) => (event: any) => void;
  handlePreviewFileChange: (
    resource: IResource,
    index: number
  ) => (previewFile: File) => void;
  handleDeleteFile: (index: number) => () => void;
  handleDragEnd;
}

export interface UniVerseError {
  statusCode?: number;
  message?: string;
}

export interface ICreateRelease {
  title: string;
  description: string;
  resources: IResource[];
  image: File;
  accessType: AccessType;
  amount?: number;
}

export enum FileType {
  Image = "image",
  Resource = "resource",
}

export enum AccessType {
  Free = "free",
  Paid = "paid",
  Donation = "donation",
}

export interface ICreateRelease {
  title: string;
  description: string;
  coverUrl: string;
  feats?: string[];
  tracks: ITrack[];
}

export interface UniVerseError {
  statusCode?: number;
  message?: string;
}

export interface ICreateResource {
  title: string;
  description: string;
  image: any;
  feats?: string[];
  resources: IResource[];
  accessType: AccessType;
  amount: number;
}

export interface IPlaylist {
  title: string;
}

export interface IUpdatePayload {
  id: string;
  data: object;
}

export interface IUpdatePlaylistdata {
  title: string;
}

export interface SideMenuEntryProps {
  title: string;
  icon: any;
  onClick?: (event: any) => void;
  pageName?: Pages;
  nbNotif?: number;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
}

export interface IProfileScreen {
  user: {
    id: string;
    username: string;
    email: string;
    accountId?: string;
    image?: string;
  };
  releases: any;
  isMe?: boolean;
}

export interface ICreateComment {
  contentId: string;
  isPositive: Boolean;
  content: string,
  typeOfContent: string;
}

export type IReaderTimeLine = {
  duration: number;
  playerTime: number;
  onSlide: (value: number) => any;
};



export type Track = { fileName: string; author: any; id?: string } & ITrack;

export const enum SourceType {
  Playlist,
  Release,
  Track,
  Preview,
  Random,
}

export enum NotificationType {
  ERROR = "error",
  SUCCESS = "success",
  PROMISE = "promise",
  DEFAULT = "default",
}

export interface IDefilingText {
  value: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginForm {
  signIn: any;
}

export interface IPlaylist {
  title: string;
}

export interface IUpdatePlaylistTrack {
  trackId: string;
  action: string;
}

export enum Pages {
  Home = " ",
  UploadRelease = "UploadRelease",
  UploadResourcePack = "UploadResourcePack",
  Login = "Login",
  SignUp = "SignUp",
  Profile = "Profile",
  UserPlaylist = "UserPlaylist",
  UserRelease = "UserRelease",
  Track = "Track",
  MyProfile = "MyProfile",
}

export enum Endoints {
  Auth = "/auth",
  Users = "/users",
  Releases = "/releases",
  ResourcePacks = "/resource-packs",
  Playlists = "/playlists",
  Comments = "/comments",
  Payments = "/payments",
  Tracks = "/tracks",
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  PlaylistPlay = "PLAY_PLAYLIST",
  ReleasePlay = "PLAY_RELEASE",
  TrackPlay = "PLAY_TRACK",
  RandomPlay = "PLAY_RANDOM",
}

export type PlayerType = {
  className?: string;
  tracks: Track[];
  trackIndex?: number;
};
