import React, { useState } from "react";
import Input from "../Components/Input/Input";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Button from "../Components/Button/Button";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { API_BASE_URL } from "../utils/config";
export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [sucessMsg, setSucessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate=useNavigate()
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      onSubmit: forgetPassword,
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Email is required")
          .email("Enter valid email"),
      }),
    });

  async function forgetPassword() {
    setErrorMsg("");
    setSucessMsg("");
    setIsLoading(true);
    try {
      let { data } = await axios.patch(
        `${API_BASE_URL}/user/forgetPassword`,
        values
      );
console.log(data);
      setIsLoading(false);

      setSucessMsg(data.message);
      localStorage.setItem("email",values.email)
      navigate("/verify-code/verifyCode")

    } catch ({ response }) {
      setIsLoading(false);

      setErrorMsg(
        response.data.msg || response.data.validationResualt[0].message
      );
    }
  }
  return (
  <>
  
  
  <Helmet><title>Forget Password</title></Helmet>    
  <div className="mt-20 p-6 md:w-2/3 lg:w-1/2 mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
  <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">
    Forget Password
  </h2>

  <form onSubmit={handleSubmit} className="space-y-4">
    {/* Email Field */}
    <div>
      <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
        Email
      </label>
      <div className="relative">
        <MdEmail className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" size={20} />
        <Input
          type="text"
          id="email"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>
      {touched.email && errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
      )}
    </div>

    {/* Success & Error Messages */}
    {sucessMsg && (
      <p className="text-green-600 dark:text-green-400 font-semibold text-center mt-2 capitalize">
        {sucessMsg}
      </p>
    )}
    {errorMsg && (
      <p className="text-red-500 dark:text-red-400 font-semibold text-center mt-2 capitalize">
        {errorMsg}
      </p>
    )}

    {/* Submit Button */}
    <Button
      name="Send Code"
      isLoading={isLoading}
      className="w-full bg-indigo-600 dark:bg-indigo-700 text-white py-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-800 transition duration-300"
    />
  </form>
</div>

  </>
  
  );
}
