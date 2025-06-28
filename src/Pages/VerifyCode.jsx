import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Button from "../Components/Button/Button";
import { API_BASE_URL } from "../utils/config";
export default function VerifyCode() {
  const { type } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [sucessMsg, setSucessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        email: localStorage.getItem("email") ,
        code: "",
        otp: "",
      },
      onSubmit: verifyCode,
      validationSchema: Yup.object().shape(
        type == "confirm-email" || "verifyCodeForReactive"
          ? {
              code: Yup.string()
                .required("code is required")
                .length(4, "please enter 4 numbers"),
              email: Yup.string()
                .required("Email is required")
                .email("Enter valid email"),
            }
          : {
            otp: Yup.string()
              .required("code is required")
              .length(6, "please enter 6 numbers"),
            email: Yup.string()
              .required("Email is required")
              .email("Enter valid email"),
          }
      ),
    });
  async function verifyCode() {
    setIsLoading(true);
    console.log(type);
    console.log(values.email);
    try {
      let data;
      if (type == "confirm-email") {
        data = await axios.patch(
          `${API_BASE_URL}/auth/confirm-email`,
          {
            email: values.email,
            code: values.code,
          }
        );
      } else if (type == "verifyCode") {
        data = await axios.patch(
          `${API_BASE_URL}/user/verifyCode`,
          {
            email: values.email,
            otp: values.otp,
          }
        );
      }
      else if (type == "verifyCodeForReactive") {
        data = await axios.patch(
          `${API_BASE_URL}/user/reActiveProfile`,
          {
            email: values.email,
            otp: values.code,
          }
        );
      }
      console.log(data);
      setIsLoading(false);
      setErrorMsg("");
      setSucessMsg(data.data.message);
      
      setTimeout(() => {
        if (type == "confirm-email") {
          navigate("/login");localStorage.removeItem("email");
        } else if (type == "verifyCode") {
          navigate("/reset-password");
        }else if (type=="verifyCodeForReactive") {
          navigate("/login");localStorage.removeItem("email");

        }
      }, 500);
    } catch ({ response }) {
      setIsLoading(false);
      setErrorMsg(response.data.msg);
      console.log(response);
    }
  }
  return (
    <>
      <Helmet>
        <title>{type}</title>
      </Helmet>

      <div className="flex items-center justify-center min-h-screen p-4  dark:bg-gray-900">
  <div className="w-full sm:max-w-sm bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
    <form className="space-y-6 w-full" onSubmit={handleSubmit}>
      <p className="text-gray-800 dark:text-white font-semibold text-lg capitalize text-center">
        {type}
      </p>

      {/* Input Field */}
      <div>
        <input
          name={type === "verifyCode" ? "otp" : "code"}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.code || values.otp}
          type="text"
          placeholder="Enter verification code"
          className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm"
        />
      </div>

      {/* Error & Success Messages */}
      {(touched.code || touched.otp) && (errors.code || errors.otp || errors.email) && (
        <p className="text-red-500 text-center text-sm">{errors.code || errors.otp || errors.email}</p>
      )}
      {errorMsg && <p className="text-red-500 text-center text-sm">{errorMsg}</p>}
      {sucessMsg && <p className="text-green-500 text-center text-sm">{sucessMsg}</p>}

      {/* Submit Button */}
      <Button
        name="Submit"
        isLoading={isLoading}
      />
    </form>
  </div>
</div>


    </>
  );
}
