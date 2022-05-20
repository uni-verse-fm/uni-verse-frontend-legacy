import React from "react";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="bg-drk w-full h-full flex flex-col">
      <div className="text-center flex justify-center flex-col items-center w-full h-full ">
        <div className="-mt-28">
          <h1 className="text-xl font-bold not-italic text-grn ">
            Welcome back !
          </h1>
          <h2 className="font-medium not-italic text-gry mt-5 mb-5">
            Sign in to your account to continue
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
export default Login;
