import React from "react";
import RegisterForm from "../components/RegisterForm";

function SignUp() {
  return (
    <div className="bg-black w-full h-full flex flex-col">
      <div className="text-center flex justify-center flex-col items-center w-full h-full ">
        <RegisterForm />
      </div>
    </div>
  );
}

export default SignUp;
