import React from "react";
import UploadReleaseForm from "../components/UploadReleaseForm";

export default function UploadReleasePage() {
  return (
    <div className="bg-black w-full h-full flex flex-col">
      <div className="w-full">
        <UploadReleaseForm />
      </div>
    </div>
  );
}
