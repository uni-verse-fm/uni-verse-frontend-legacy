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
    () => getUserReleases(session.userId as string),
    { initialData: props.releases }
  );

  const profileParams = (session: Session, releases: any) => {
    return {
      user: {
        id: session.userId as string,
        username: (session.user as any).username,
        email: session.email as string,
        accountId: (session.user as any).accountId,
      },
      releases,
      isMe: true,
    };
  };

  return status === "error" ? (
    <div className="flex justify-center items-center mt-10">
      <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
    </div>
  ) : status === "loading" ? (
    <div className="flex justify-center items-center mt-10">
      <Spinner />
    </div>
  ) : (
    <ProfileScreen {...profileParams(session, data)} />
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
