import { Form, Formik } from "formik";
import { Extensions, Messages } from "../../common/constants";
import * as Yup from "yup";
import { notify } from "../Notifications";
import { useMutation } from "react-query";
import { register } from "../../api/AuthAPI";
import router from "next/router";
import { NotificationType, Pages } from "../../common/types";

const imageProps = {
  src: undefined,
  defaultImageSrc: "/profile.jpg",
  size: 28,
  fileExtensions: Extensions.image,
  setFieldValue: () => notify(Messages.NOT_IMPLEMENTED),
};

const RegisterForm = () => {
  const { mutate } = useMutation("register", register, {
    onError: () => {
      notify("Can't register", NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "Subscribed successfully";
        notify(message, NotificationType.SUCCESS);
        router.replace(`/${Pages.Login}`);
      }
    },
  });

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .max(15, Messages.USERNAME)
          .min(5, Messages.USERNAME)
          .required(Messages.REQUIRED),
        email: Yup.string()
          .email(Messages.INVALID_EMAIL)
          .required(Messages.REQUIRED),
        password: Yup.string()
          .required(Messages.REQUIRED)
          .min(8, Messages.SHORT_PASWORD),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref("password"), null],
          Messages.PASSWORD_MISMATCH
        ),
      })}
      onSubmit={(value) => {
        mutate(value);
      }}
    >
      {({ values, errors, handleChange, handleBlur }) => {
        return (
          <Form className="flex flex-col justify-center  w-auto h-auto">
            <h1 className="text-xl font-bold not-italic text-grn">
              Welcome to universe !
            </h1>
            <h2 className="font-medium not-italic text-gry mt-5 mb-5">
              Create an account
            </h2>
            <div className=" p-12 bg-white rounded-md">
              <div className="flex items-start mb-5 flex-col w-64 h-16">
                <label className="mb-2 text-md font-bold">User Name</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  className="text-sm bg-drk w-full h-full text-white pl-2 rounded-md placeholder-gry p-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {errors.username ? (
                  <div className="text-rd text-sm">{errors.username}</div>
                ) : null}
              </div>
              <div className="flex items-start mb-5 flex-col w-64 h-16">
                <label className="mb-2 text-md font-bold">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="text-sm bg-drk w-full h-full text-white pl-2 rounded-md placeholder-gry p-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email ? (
                  <div className="text-rd text-sm">{errors.email}</div>
                ) : null}
              </div>
              <div className="flex items-start mb-5 flex-col w-64 h-16">
                <label className="mb-2 text-md font-bold">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="text-sm bg-drk w-full h-full text-white pl-2 rounded-md placeholder-gry p-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password ? (
                  <div className="text-rd text-sm">{errors.password}</div>
                ) : null}
              </div>
              <div className="flex items-start mb-10 flex-col w-64 h-16">
                <label className="mb-2 text-md font-bold">
                  Confirm your Password
                </label>
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Enter your password"
                  className="text-sm bg-drk w-full h-full text-white pl-2 rounded-md placeholder-gry p-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordConfirmation}
                />
                {errors.passwordConfirmation ? (
                  <div className="text-rd text-sm">
                    {errors.passwordConfirmation}
                  </div>
                ) : null}
              </div>
              <div className="justify-center"></div>
              <button
                type="submit"
                className="rounded bg-grn hover:bg-segrn font-normal cursor-pointer w-64 h-8 text-white"
              >
                Sign up
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
