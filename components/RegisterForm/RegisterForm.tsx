import { Form, Formik } from "formik";
import { Extensions, Messages, Pages } from "../../common/constants";
import * as Yup from "yup";
import UploadImageDisplayer from "../UploadImageDisplayer";
import { NotificationType, notify } from "../Notifications";
import { useMutation } from "react-query";
import { register } from "../../api/AuthAPI";
import router from "next/router";

const imageProps = {
  src: undefined,
  defaultImageSrc: "https://i.ibb.co/CQ0sg7L/pxlprostudio190106201.jpg",
  size: 100,
  fileExtensions: Extensions.image,
  setFieldValue: () => notify(Messages.NOT_IMPLEMENTED),
};

export interface IRegister {
  username: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { mutate, isLoading } = useMutation("register", register, {
    onError: (error) => {
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
          <Form className="flex justify-center rounded-md bg-white w-auto h-auto">
            <div className="m-10 ml-12 mr-12">
              <UploadImageDisplayer {...imageProps} />
              <div className="flex items-start mb-5 flex-col w-64 h-16">
                <label className="mb-2 text-sm">User Name</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  className="text-sm bg-black w-full h-full text-white pl-2 rounded-md placeholder-gry"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {errors.username ? (
                  <div className="text-rd text-sm">{errors.username}</div>
                ) : null}
              </div>
              <div className="flex items-start mb-5 flex-col w-64 h-16">
                <label className="mb-2 text-sm">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="text-sm bg-black w-full h-full text-white pl-2 rounded-md placeholder-gry"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email ? (
                  <div className="text-rd text-sm">{errors.email}</div>
                ) : null}
              </div>
              <div className="flex items-start mb-5 flex-col w-64 h-16">
                <label className="mb-2 text-sm">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="text-sm bg-black w-full h-full text-white pl-2 rounded-md placeholder-gry"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password ? (
                  <div className="text-rd text-sm">{errors.password}</div>
                ) : null}
              </div>
              <div className="flex items-start mb-10 flex-col w-64 h-16">
                <label className="mb-2 text-sm">Confirm your Password</label>
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Enter your password"
                  className="text-sm bg-black w-full h-full text-white pl-2 rounded-md placeholder-gry"
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
                className="rounded bg-grn font-normal cursor-pointer w-64 h-8 text-white  "
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
