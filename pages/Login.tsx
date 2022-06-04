import React from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import LoginForm from "../components/LoginForm";
import { NotificationType, notify } from "../components/Notifications";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const signInRequest = async (values, setSubmitting) => {
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
        <LoginForm signIn={signInRequest} />
      </div>
    </div>
  );
}
