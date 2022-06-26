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

function Profile() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const userQuery = useQuery("user", () =>
    getUserById(id as string).then((res) => res.data)
  );

  const releasesQuery = useQuery("myReleases", () =>
    getUserReleases(id as string).then((res) => res.data)
  );

  const profileParams = (user: any, releases: any) => {
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        accountId: user.accountId,
      },
      releases,
      isMe: false,
    };
  };

  return userQuery.status === "error" || releasesQuery.status === "error" ? (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
    </div>
  ) : userQuery.status === "loading" || releasesQuery.status === "loading" ? (
    <div className="flex justify-center items-center bg-drk w-full h-full">
      <Spinner />
    </div>
  ) : (
    <div className="bg-drk w-full h-full ">
      <ProfileScreen {...profileParams(userQuery.data, releasesQuery.data)} />
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
