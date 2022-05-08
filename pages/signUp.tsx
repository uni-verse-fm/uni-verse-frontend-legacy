import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload
} from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  // Static data
  const urlImage = "https://i.ibb.co/CQ0sg7L/pxlprostudio190106201.jpg";
  return (
    <div className="bg-black w-full h-full flex flex-col">
      <div className="text-center flex justify-center flex-col items-center w-full h-full ">
        <form
          onSubmit={(_: any) => console.log("NOT IMPLEMENTED")}
          className="flex justify-center rounded-md bg-wht w-auto h-auto"
        >
          <div className="m-10 ml-12 mr-12">
            <div className="mb-2 flex justify-center" >
						  <img src={urlImage} alt="" id="img" className=" md:mx-auto rounded w-28 h-28" />
					  </div>
					  <input type="file" accept="image/*" name="image-upload" className= " cursor:pointer hidden " id="input" onChange={(_: any) => console.log("NOT IMPLEMENTED")}/>
          
            <div className="cursor:pointer mb-6 text-grn text-sm">
              <label className="cursor:pointer" htmlFor="input">
                <FontAwesomeIcon
                  className="mr-4 text-grn bg-wht cursor:pointer"
                  icon={faUpload}
                />
						    Add a profile picture
					   </label>
            </div>
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
            <div className="justify-center">

					
       
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
