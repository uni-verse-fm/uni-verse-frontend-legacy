import React from "react";

import { useRouter } from "next/router";
import { getSession, GetSessionParams } from "next-auth/react";
import { Session } from "next-auth";
import { adminLogin } from "../api/AdminAPI";
import { ILogin } from "../common/types";
import ResourcePack from "../components/ResourcePack";
import { useQuery } from "react-query";
import { getResourcePackById } from "../api/ResourcePackAPI";
import Spinner from "../components/Spinner";
import { Messages } from "../common/constants";
import { getSumDonations, isOwnerProduct } from "../api/TransactionAPI";

function UserResourcePack() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { status, data } = useQuery(
    `resourcePack-${id}`,
    () => getResourcePackById(id as string).then((res) => res.data),
    { enabled: Boolean(!!id) }
  );

  const boughtQuery = useQuery(
    `bought-pack-${id}`,
    () => isOwnerProduct(data.productId as string).then((res) => res),
    {
      enabled: Boolean(
        !!id && status === "success" && data?.accessType == "paid"
      ),
    }
  );

  const donatedQuery = useQuery(
    `donated-pack-${id}`,
    () => getSumDonations(id as string).then((res) => res.data),
    {
      enabled: Boolean(
        !!id && status === "success" && data?.accessType == "donation"
      ),
    }
  );

  const allowDownloads =
    status === "success" &&
    ((donatedQuery.status === "success" &&
      parseInt(donatedQuery.data) > data.amount) ||
      (boughtQuery.status === "success" && boughtQuery.data) ||
      data.accessType === "free");

  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden p-10">
      <div className="text-start justify-start items-start w-full h-full ">
        <h1 className="text-xl font-bold not-italic text-grn  mb-5 mt-10">
          ResourcePack
        </h1>
        <div className="Global bg-grey w-full h-full flex flex-col">
          {status === "loading" || status === "idle" ? (
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
            <ResourcePack resourcePack={data} download={allowDownloads} />
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

export default UserResourcePack;
