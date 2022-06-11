import React from "react";
import RegisterForm from "../components/RegisterForm";

function SignUp() {
  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden ">
      <div className="text-center flex justify-center flex-col items-center w-full h-full ">
        <RegisterForm />
      </div>
    </div>
  );
}

export default SignUp;
