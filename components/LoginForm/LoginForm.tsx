import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { Messages } from "../../common/constants";
import * as Yup from "yup";
import { NotificationType, notify } from "../Notifications";
import { login } from "../../api/AuthAPI";
import { useMutation } from "react-query";
import useConnect from "../../common/providers/ConnectProvider";

export interface ILogin {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [connect, setConnect] = useConnect();
  const router = useRouter();

  const { mutate, isLoading } = useMutation("login", login, {
    onError: (error) => {
      notify("Can't login", NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "Authenticated successfully";
        notify(message, NotificationType.SUCCESS);
        setConnect(true);
        router.back();
        // router.replace("/");
      }
    },
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(Messages.INVALID_EMAIL)
          .required(Messages.REQUIRED),
        password: Yup.string()
          .required(Messages.REQUIRED)
          .min(8, Messages.SHORT_PASWORD),
      })}
      onSubmit={(value: ILogin) => {
        mutate(value);
      }}
    >
      {({ values, errors, handleChange, handleBlur }) => {
        return (
          <Form>
            <div className="flex justify-center rounded-md bg-white w-auto h-auto">
              <div className="m-10">
                <div className="flex items-start mb-5 flex-col w-64 h-16">
                  <label className="mb-2 text-sm">Email</label>
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
                  <label className="mb-2 text-sm">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="text-sm bg-drk w-full h-16 text-white pl-2 rounded-md placeholder-gry p-2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password ? (
                    <div className="text-rd text-sm">{errors.password}</div>
                  ) : null}
                </div>
                <div className="mt-5 mb-5 -ml-24 text-sm font-normal text-grn">
                  <a href="#">Forgot your password ?</a>
                </div>
                <button
                  type="submit"
                  className="rounded bg-grn font-normal cursor-pointer w-64 h-8 text-white  "
                >
                  Login
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
