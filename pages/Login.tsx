import React from "react";
import { signIn } from "next-auth/react";
import LoginForm from "../components/LoginForm";
import { notify } from "../components/Notifications";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faSpotify } from "@fortawesome/free-brands-svg-icons";
import { ILogin, NotificationType } from "../common/types";

export default function Login() {
  const router = useRouter();

  const signInRequest = async (values: ILogin, setSubmitting) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    });
    if (res?.error) {
      notify(`Can't login: ${res.error}`, NotificationType.ERROR);
    }

    if (res?.ok) {
      setSubmitting(false);
      notify("Authenticated successfully", NotificationType.SUCCESS);
      router.replace("/");
    }

    setSubmitting(false);
  };

  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden">
      <div className="text-center flex justify-center flex-col items-center w-full h-full ">
        <div className="-mt-28">
          <h1 className="text-xl font-bold not-italic text-grn ">
            Welcome back !
          </h1>
          <h2 className="font-medium not-italic text-gry mt-5 mb-5">
            Sign in to your account to continue
          </h2>
        </div>
        <div className="flex w-auto h-auto">
          <button
            className="font-bold rounded-md bg-white w-auto h-auto m-2 p-2"
            onClick={() => signIn("spotify")}
          >
            <FontAwesomeIcon icon={faSpotify} className="text-grn fa-xl pr-2" />
            <span>Spotify login</span>
          </button>
          <button
            className="font-bold rounded-md bg-white w-auto h-auto m-2 p-2"
            onClick={() => signIn("google")}
          >
            <FontAwesomeIcon icon={faGoogle} className="text-rd fa-xl pr-2 " />
            <span>Google login</span>
          </button>
        </div>

        <LoginForm signIn={signInRequest} />
      </div>
    </div>
  );
}
