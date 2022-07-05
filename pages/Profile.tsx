import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getUserById } from "../api/UserAPI";
import { getSession, GetSessionParams } from "next-auth/react";
import ProfileScreen from "../components/ProfileScreen";
import { Session } from "next-auth";
import Spinner from "../components/Spinner";
import { Messages } from "../common/constants";
import { getUserReleases } from "../api/ReleaseAPI";

import { getUserResourcePack } from "../api/ResourcePackAPI";

import { getUserPlaylists } from "../api/PlaylistAPI";
import { artistHotTracks } from "../api/ViewsAPI";

type ProfileParams = {
  user: {
    id: string;
    username: string;
    email: string;
    profilePicture?: string;
    stripeAccountId?: string;
  };
  releases: any[];
  playlists: any[];
  hotTracks: any[];
  isMe: false;
  resourcesPacks: any[];
};
function Profile() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const userQuery = useQuery(
    `user-${id}`,
    () => getUserById(id as string).then((res) => res.data),
    { enabled: Boolean(id) }
  );

  const releasesQuery = useQuery(
    `releases-${id}`,
    () => getUserReleases(id as string).then((res) => res.data),
    { enabled: userQuery.status === "success" }
  );

  const RessourcePacksQuery = useQuery(
    `resource-pack-${id}`,
    () => getUserResourcePack(id as string).then((res) => res.data),
    { enabled: releasesQuery.status === "success" }
  );

  const hotTracks = useQuery(
    `hot-tracks-${id}`,
    () => artistHotTracks(id as string).then((res) => res.data),
    { enabled: RessourcePacksQuery.status === "success" }
  );

  const playlistsQuery = useQuery(
    `playlists-${id}`,
    () => getUserPlaylists(id as string).then((res) => res.data),
    { enabled: hotTracks.status === "success" }
  );

  const profileParams = (
    user: any,
    releases: any[],
    playlists: any[],
    resourcesPacks: any[],
    hotTracks: any[]
  ): ProfileParams => {
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        stripeAccountId: user.stripeAccountId,
      },
      releases,
      playlists,
      isMe: false,
      resourcesPacks,
      hotTracks,
    };
  };

  return "error" === playlistsQuery.status ? (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
    </div>
  ) : "loading" === playlistsQuery.status ? (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <Spinner />
    </div>
  ) : "success" === playlistsQuery.status ? (
    <div className="bg-drk w-full h-full ">
      <ProfileScreen
        {...profileParams(
          userQuery.data,
          releasesQuery.data,
          playlistsQuery.data,
          RessourcePacksQuery.data,
          hotTracks.data
        )}
      />
    </div>
  ) : (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <Spinner />
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams) {
  const session: Session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Profile;
