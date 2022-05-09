import React from "react";
import UploadImageDisplayer from "../components/UploadImageDisplayer";
import { Extensions, Messages } from "../common/constants";
import { notify } from "../components/Notifications";

const imageProps = {
  src: undefined,
  defaultImageSrc: "https://i.ibb.co/CQ0sg7L/pxlprostudio190106201.jpg",
  size: 100,
  fileExtensions: Extensions.image,
  setFieldValue: () => notify(Messages.NOT_IMPLEMENTED),
};

function SignUp() {
  // Static data
  return (
    <div className="bg-black w-full h-full flex flex-col">
      <div className="text-center flex justify-center flex-col items-center w-full h-full ">
        <form
          onSubmit={(_: any) => console.log("NOT IMPLEMENTED")}
          className="flex justify-center rounded-md bg-wht w-auto h-auto"
        >
          <div className="m-10 ml-12 mr-12">
            <UploadImageDisplayer {...imageProps} />
            <div className="flex items-start mb-5 flex-col w-64 h-16">
              <label className="mb-2 text-sm">User Name</label>
              <input
                type="email"
                placeholder="Enter your name"
                className="text-sm bg-black w-full h-full text-wht pl-2 rounded-md placeholder-gry"
              />
            </div>
            <div className="flex items-start mb-5 flex-col w-64 h-16">
              <label className="mb-2 text-sm">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="text-sm bg-black w-full h-full text-wht pl-2 rounded-md placeholder-gry"
              />
            </div>
            <div className="flex items-start mb-5 flex-col w-64 h-16">
              <label className="mb-2 text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="text-sm bg-black w-full h-full text-wht pl-2 rounded-md placeholder-gry"
              />
            </div>
            <div className="flex items-start mb-10 flex-col w-64 h-16">
              <label className="mb-2 text-sm">Confirm your Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="text-sm bg-black w-full h-full text-wht pl-2 rounded-md placeholder-gry"
              />
            </div>
            <div className="justify-center"></div>
            <input
              className="rounded bg-grn font-normal cursor-pointer w-64 h-8 text-wht"
              type="submit"
              value="Sign up"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
