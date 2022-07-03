import React from "react";
import ArtistRelease from "../components/ArtistRelease";

import { useRouter } from "next/router";
import { getSession, GetSessionParams } from "next-auth/react";
import { Session } from "next-auth";
import { adminLogin } from "../api/AdminAPI";
import { ILogin } from "../common/types";
import { useQuery } from "react-query";
import { getReleaseById } from "../api/ReleaseAPI";
import Spinner from "../components/Spinner";
import { Messages } from "../common/constants";

function UserRelease() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { status, data } = useQuery(
    `release-${id}`,
    () => getReleaseById(id as string).then((res) => res.data),
    { enabled: Boolean(!!id) }
  );
  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden p-10">
      <div className="text-start justify-start items-start w-full h-full ">
        <h1 className="text-xl font-bold not-italic text-grn  mb-5 mt-10">
          Release
        </h1>
        <div className="Global bg-grey w-full h-full flex flex-col">
          {status === "loading" ? (
            <div className="flex justify-center items-center mt-10">
              <Spinner />
            </div>
          ) : status === "error" ? (
            <div className="flex justify-center items-center mt-10">
              <h1 className="text-rd whitespace-nowrap">
                {Messages.ERROR_LOAD}
              </h1>
            </div>
          ) : (
            <ArtistRelease release={data} />
          )}
        </div>
      </div>
    </div>
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

export default UserRelease;
