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

import { getResourcePacks } from "../api/ResourcePackAPI";

import { getUserPlaylists } from "../api/PlaylistAPI";

type ProfileParams = {
  user: {
    id: string;
    username: string;
    email: string;
    profilePicture?: string;
    accountId?: string;
  };
  releases: any;
  playlists: any;
  isMe: false;
  resourcesPacks: any;
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

  const RessourcePacksQuery = useQuery("getResourcePacks", () =>
    getResourcePacks().then((res) => {
      console.log("getResourcePacks");
      console.log(res.data);
      return res.data;
    })
  );
  const playlistsQuery = useQuery(
    `playlists-${id}`,
    () => getUserPlaylists(id as string).then((res) => res.data),
    { enabled: releasesQuery.status === "success" }
  );

  const profileParams = (
    user: any,
    releases: any,
    playlists: any,
    resourcesPacks: any
  ): ProfileParams => {
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        accountId: user.accountId,
      },
      releases,
      playlists,
      isMe: false,
      resourcesPacks,
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

          RessourcePacksQuery.data,
          playlistsQuery.data
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
