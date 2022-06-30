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
    { enabled: Boolean(id) }
  );

  const playlistsQuery = useQuery(
    `playlists-${id}`,
    () => getUserPlaylists(id as string).then((res) => res.data),
    { enabled: Boolean(id) }
  );

  const profileParams = (
    user: any,
    releases: any,
    playlists: any
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
    };
  };

  return "error" in
    [userQuery.status, releasesQuery.status, playlistsQuery.status] ? (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
    </div>
  ) : "loading" in
    [userQuery.status, releasesQuery.status, playlistsQuery.status] ? (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <Spinner />
    </div>
  ) : (
    <div className="bg-drk w-full h-full ">
      <ProfileScreen
        {...profileParams(
          userQuery.data,
          releasesQuery.data,
          playlistsQuery.data
        )}
      />
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
