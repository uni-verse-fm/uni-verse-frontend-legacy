import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { getUserReleases } from "../api/ReleaseAPI";
import { Session } from "next-auth";
import ProfileScreen from "../components/ProfileScreen";
import { Messages } from "../common/constants";
import Spinner from "../components/Spinner";
import { adminLogin } from "../api/AdminAPI";
import { me } from "../api/AuthAPI";
import { ILogin } from "../common/types";
import { getUserResourcePack } from "../api/ResourcePackAPI";
import { getUserPlaylists } from "../api/PlaylistAPI";
import { artistHotTracks } from "../api/ViewsAPI";

function MyProfile(props) {
  const { data: session } = useSession();

  const meQuery = useQuery("me", () => me().then((res) => res.data), {
    enabled: Boolean(session?.user),
    initialData: { ...session.user },
  });

  const releasesQuery = useQuery(
    "my-releases",
    () => getUserReleases((session.user as any).id).then((res) => res.data),
    { initialData: props.releases, enabled: meQuery.status === "success" }
  );

  const playlistsQuery = useQuery(
    "my-playlists",
    () => getUserPlaylists((session.user as any).id).then((res) => res.data),
    { enabled: releasesQuery.status === "success" }
  );

  const resourcesPacksQuery = useQuery(
    "my-resource-packs",
    () => getUserResourcePack((session.user as any).id).then((res) => res.data),
    { enabled: releasesQuery.status === "success" }
  );

  const myHotTracks = useQuery(
    "my-hot-tracks",
    () => artistHotTracks((session.user as any).id).then((res) => res.data),
    { enabled: releasesQuery.status === "success" }
  );

  return meQuery.status === "error" ? (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
    </div>
  ) : meQuery.status === "loading" ||
    releasesQuery.status === "loading" ||
    myHotTracks.status === "loading" ||
    playlistsQuery.status === "loading" ||
    resourcesPacksQuery.status === "loading" ? (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <Spinner />
    </div>
  ) : session.user ? (
    <ProfileScreen
      user={{
        id: meQuery.data.id,
        username: meQuery.data.username,
        email: meQuery.data.email,
        stripeAccountId: meQuery.data.stripeAccountId,
        profilePicture: meQuery.data.profilePicture,
      }}
      releases={releasesQuery.data}
      hotTracks={myHotTracks.data}
      resourcesPacks={resourcesPacksQuery.data}
      playlists={playlistsQuery.data}
      isMe={true}
    />
  ) : (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <Spinner />
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams) {
  const session: Session = await getSession(context);
  const id = (session.user as any)?.id;
  const queryClient = new QueryClient();

  const payload: ILogin = {
    email: process.env.UNIVERSE_EMAIL,
    password: process.env.UNIVERSE_PASSWORD,
  };
  const adminRefreshToken = await adminLogin(payload).then(
    (response) => response.adminRefreshToken
  );
  await queryClient.prefetchQuery("me", me);

  await queryClient.prefetchQuery("my-releases", () => getUserReleases(id));

  await queryClient.prefetchQuery("my-playlists", () => getUserPlaylists(id));

  await queryClient.prefetchQuery("my-resource-packs", () =>
    getUserResourcePack(id)
  );

  await queryClient.prefetchQuery("my-hot-tracks", () => artistHotTracks(id));

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
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default MyProfile;
