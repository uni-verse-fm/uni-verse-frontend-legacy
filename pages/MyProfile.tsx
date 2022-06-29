import React from "react";
import { useQuery } from "react-query";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { getUserReleases } from "../api/ReleaseAPI";
import { Session } from "next-auth";
import ProfileScreen from "../components/ProfileScreen";
import { Messages } from "../common/constants";
import Spinner from "../components/Spinner";
import { adminLogin } from "../api/AdminAPI";
import { me } from "../api/AuthAPI";
import { ILogin } from "../common/types";
import { getUserPlaylists } from "../api/PlaylistAPI";

function MyProfile(props) {
  const { data: session } = useSession();

  const releasesQuery = useQuery(
    "myReleases",
    () => getUserReleases((session.user as any).id),
    { initialData: props.releases, enabled: Boolean(session?.user) }
  );

  const playlistsQuery = useQuery(
    "myPlaylists",
    () => getUserPlaylists((session.user as any).id),
    { enabled: Boolean(session?.user) }
  );

  const meQuery = useQuery(
    "me",
    () => me().then((res) => res.data),

    {
      enabled: Boolean(session?.user),
      initialData: { ...session.user },
    }
  );

  return "error" in
    [releasesQuery.status, playlistsQuery.status, meQuery.status] ? (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
    </div>
  ) : "loading" in
    [releasesQuery.status, playlistsQuery.status, meQuery.status] ? (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <Spinner />
    </div>
  ) : (
    <ProfileScreen
      user={{
        id: meQuery.data.id,
        username: meQuery.data.username,
        email: meQuery.data.email,
        accountId: meQuery.data.accountId,
        profilePicture: meQuery.data.profilePicture,
      }}
      releases={releasesQuery.data}
      playlists={playlistsQuery.data}
      isMe={true}
    />
  );
}

export async function getServerSideProps(context: GetSessionParams) {
  const session: Session = await getSession(context);
  const payload: ILogin = {
    email: process.env.UNIVERSE_EMAIL,
    password: process.env.UNIVERSE_PASSWORD,
  };
  const adminRefreshToken = await adminLogin(payload).then(
    (response) => response.adminRefreshToken
  );
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
      adminRefreshToken,
    },
  };
}

export default MyProfile;
