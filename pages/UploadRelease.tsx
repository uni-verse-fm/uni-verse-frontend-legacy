import React from "react";
import { useQuery } from "react-query";
import { reactQueryResponseHandler } from "../api/APIUtils";
import { me } from "../api/AuthAPI";
import useConnect from "../common/providers/ConnectProvider";
import UploadReleaseForm from "../components/UploadReleaseForm";

export default function UploadReleasePage() {
  const [connect, setConnect] = useConnect();
  const { status, data } = useQuery(
    "me",
    () => me().then((res) => res.data),
    reactQueryResponseHandler(setConnect)
  );
  return (
    <div className="bg-black w-full h-full flex flex-col">
      <div className="w-full">
        <UploadReleaseForm />
        <h2>{JSON.stringify(data)}</h2>
      </div>
    </div>
  );
}
