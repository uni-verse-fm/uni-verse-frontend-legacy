import { useRouter } from "next/router";
import React from "react";
import useConnect from "../common/providers/ConnectProvider";

function Login() {
  const [connected, setConnected] = useConnect();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setConnected(true);
    router.push("/");
  };

  return (
    <div className="bg-black w-full h-full flex flex-col">
      <div className="text-center flex justify-center flex-col items-center w-full h-full ">
        <div className="-mt-28">
          <h1 className="text-xl font-bold not-italic text-grn ">
            {" "}
            Welcome back !
          </h1>
          <h2 className="font-medium not-italic text-gry mt-5 mb-5">
            {" "}
            Sign in to your account to continue{" "}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center rounded-md bg-wht w-auto h-auto"
        >
          <div className="m-10">
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
            <div className="mt-5 mb-5 -ml-24 text-sm font-normal text-grn">
              <a href="#">Forgot your password ?</a>
            </div>
            <input
              className="rounded bg-grn font-normal cursor-pointer w-64 h-8 text-wht"
              type="submit"
              value="Sign in"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
