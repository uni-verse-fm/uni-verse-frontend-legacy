import React from "react";
import ArtistRelease from "../components/ArtistRelease";

import { useRouter } from "next/router";
import { getSession, GetSessionParams } from "next-auth/react";
import { Session } from "next-auth";
import { adminLogin } from "../api/AdminAPI";
import { ILogin } from "../common/types";
import { serverRuntimeConfig } from "../config";

function UserRelease() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden p-10">
      <div className="text-start justify-start items-start w-full h-full ">
        <h1 className="text-xl font-bold not-italic text-grn ml-10 mb-5">
          Release
        </h1>
        <ArtistRelease
          index={id}
          handleClosePlaylistContent="{handleClosePlaylistContent}"
          enableChange="false"
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams) {
  const session: Session = await getSession(context);

  const payload: ILogin = {
    email: serverRuntimeConfig.UNIVERSE_EMAIL,
    password: serverRuntimeConfig.UNIVERSE_PASSWORD,
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
