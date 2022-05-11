import { AxiosError } from "axios";
import router from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { me } from "../api/AuthAPI";
import { Messages } from "../common/constants";
import { NotificationType, notify } from "../components/Notifications";
import UploadReleaseForm from "../components/UploadReleaseForm";

export default function UploadResourcePackPage() {
  const { status, data } = useQuery("me", () => me().then((res) => res.data), {
    onSuccess: (res) => {
      if (res.status === 401) {
        notify("Playlists bay from success");
        router.replace("/login");
      }
    },
    onError: (error: AxiosError) => {
      if (error.response.status === 401) {
        notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
        router.replace("/login");
      }
    },
  });

  return (
    <div className="bg-black w-full h-full flex flex-col">
      <div className="w-full">
        <UploadReleaseForm />
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const response = await me();
//   if (response.status === 401) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//     };
//   }
//   if (response.status === 404) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/404",
//       },
//     };
//   }
//   return { props: { data: response.data } };
// }
