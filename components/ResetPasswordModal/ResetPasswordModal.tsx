
import { Form, Formik } from "formik";
import { Messages } from "../../common/constants";
import * as Yup from "yup";
import { NotificationType } from "../../common/types";
import { notify } from "../Notifications";

const ResetPasswordModal = (props) => {
  return (
    props.showModal && (
      <div
      className={`[config]="{ignoreBackdropClick: true, keyboard: false}" absolute justify-center items-center  h-auto bg-wht -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2  ${
        props.small ? "w-auto" : "w-auto"
      }  rounded-md`}
    >
      <Formik
      initialValues={{
        OldPassword: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={Yup.object().shape({
        OldPassword: Yup.string()
        .required(Messages.REQUIRED)
        .min(8, Messages.SHORT_PASWORD),
        password: Yup.string()
          .required(Messages.REQUIRED)
          .min(8, Messages.SHORT_PASWORD),
        passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            Messages.PASSWORD_MISMATCH
        ),
      })}
      onSubmit={(value, { setSubmitting }) => {
      
      }}
    >
      {({ values, errors, handleChange, handleBlur }) => {
        return (
          <Form>
            <div className="flex justify-center rounded-md bg-white w-auto h-auto">
              <div className="mb-6 mr-10 ml-10 mt-5">
              <div className="flex items-start mb-5 flex-col w-auto h-auto">
              <label className="text-xl font-bold not-italic text-grn">Reset password </label>
              </div>
                <div className="flex items-start mb-5 flex-col w-64 h-16">

                  <label className="mb-2 text-sm">Old password</label>
                    <input
                      id="OldPassword"
                      name="OldPassword"
                      type="password"
                      placeholder="Enter your old Password"
                      className="text-sm bg-drk w-full h-16 text-white pl-2 rounded-md placeholder-gry p-2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.OldPassword}
                    />
                    {errors.password ? (
                     <div className="text-rd text-sm">{errors.password}</div>
                   ) : null}
                </div>

                <div className="flex items-start mb-5 flex-col w-64 h-16">
                <label className="mb-2 text-sm">New password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your new Password"
                  className="text-sm bg-drk w-full h-full text-white pl-2 rounded-md placeholder-gry p-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password ? (
                  <div className="text-rd text-sm">{errors.password}</div>
                ) : null}
              </div>

              <div className="flex items-start mb-7 flex-col w-64 h-16">
                <label className="mb-2 text-sm">Confirm your password</label>
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Confirm your password"
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

                <div className="flex items-start flex-row w-64">
                    <input
                      className=" rounded-sm bg-grn font-normal cursor-pointer h-7 w-28 text-wht"
                      type="submit"
                      value="Submit"
                    ></input>
                    <button
                      className="ml-8 rounded-sm bg-grn font-normal cursor-pointer h-7 w-28 text-wht "
                      onClick={props.handleCloseDialog}
                    >
                      Cancel
                    </button>
                  </div>
               


                   



            
            
               
              
               
            </div>
            </div>
          </Form>
        );
      }}
    </Formik>
    </div>
    )
  );
};

export default ResetPasswordModal;
