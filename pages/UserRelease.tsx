import React from "react";
import ArtistRelease from "../components/ArtistRelease";

import { useRouter } from "next/router";
import { getSession, GetSessionParams } from "next-auth/react";

function UserRelease() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden">
      <div className="text-start  justify-start items-start w-full h-full ">
        <h1 className="text-xl font-bold not-italic text-grn ml-10 mb-5 mt-16 ">
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
  const session = await getSession(context);

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
export default UserRelease;
