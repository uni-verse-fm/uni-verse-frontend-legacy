import { getSession, useSession } from "next-auth/react";
import React from "react";
import { Messages } from "../common/constants";
import Spinner from "../components/Spinner";
import UploadReleaseForm from "../components/UploadReleaseForm";

export default function UploadReleasePage() {
  const { data: session, status } = useSession();
  return (
    <div className="bg-drk w-full h-full flex flex-col">
      <div className="w-full">
        {status === "unauthenticated" ? (
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
          </div>
        ) : status === "loading" ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner />
          </div>
        ) : (
          <UploadReleaseForm myId={session.userId} />
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
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
