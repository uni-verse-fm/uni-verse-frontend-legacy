import React from "react";

function SignUp() {
  return (
    <div className="bg-black w-full h-full flex flex-col">
      <div className="text-center flex justify-center flex-col items-center w-full h-full ">
        <div className="-mt-28 mb-5">
          <h1 className="text-xl font-bold not-italic text-grn "> Welcome !</h1>
        </div>
        <form
          onSubmit={(_: any) => console.log("NOT IMPLEMENTED")}
          className="flex justify-center rounded-md bg-wht w-auto h-auto"
        >
          <div className="m-10">
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
            <div className="flex items-start mb-16 flex-col w-64 h-16">
              <label className="mb-2 text-sm">Confirm your Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="text-sm bg-black w-full h-full text-wht pl-2 rounded-md placeholder-gry"
              />
            </div>
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
