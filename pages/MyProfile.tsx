import React from "react";
import { useQuery } from "react-query";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { getUserReleases } from "../api/ReleaseAPI";
import { Session } from "next-auth";
import ProfileScreen from "../components/ProfileScreen";
import { Messages } from "../common/constants";
import Spinner from "../components/Spinner";

function MyProfile(props) {
  const { data: session } = useSession();

  const { status, data } = useQuery(
    "myReleases",
    () => getUserReleases((session.user as any).id),
    { initialData: props.releases, enabled: Boolean(session) }
  );

  return status === "error" ? (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
    </div>
  ) : status === "loading" ? (
    <div className="flex justify-center items-center  bg-drk w-full h-full">
      <Spinner />
    </div>
  ) : session.user ? (
    <div className="bg-drk w-full h-full">
      <ProfileScreen
        user={{
          id: (session.user as any).id,
          username: (session.user as any).username,
          email: (session.user as any).email,
          accountId: (session.user as any).accountId,
        }}
        releases={data}
        isMe={true}
      />{" "}
    </div>
  ) : (
    <></>
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

export default MyProfile;
