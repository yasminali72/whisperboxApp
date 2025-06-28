import React, { useState } from 'react'
import Input from '../Components/Input/Input'
import Button from '../Components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { Lock } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/config';
export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [sucessMsg, setSucessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate=useNavigate()
    const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
      useFormik({
        initialValues: {
          email:localStorage.getItem("email"),
          newPassword:"",
          confirmationPassword:""
        },
        onSubmit: resetPassword,
        validationSchema: Yup.object({
          email: Yup.string()
            .required("Email is required")
            .email("Enter valid email"),
            newPassword:Yup.string().required("password is requried").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"),
            confirmationPassword:Yup.string().required("confirmationPassword is requried").oneOf([Yup.ref("newPassword")],"password and confirmationPassword is not matched"),
            

        }),
      });
  
    async function resetPassword() {
      setErrorMsg("");
      setSucessMsg("");
      setIsLoading(true);
      try {
        let {data} = await axios.patch(
          `${API_BASE_URL}/user/resetPassword`,
          values
        );
  console.log(data);
        setIsLoading(false);
  
        setSucessMsg(data.message);
        localStorage.removeItem("email")
        setTimeout(() => {
            navigate("/login")
        }, 1000);
  
      } catch ({response}) {
        setIsLoading(false);
        setErrorMsg(
          response.data.msg || response.data.validationResualt[0].message
        );
      }
    }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
  <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">
    Reset Password
  </h2>

  <form action="" onSubmit={handleSubmit} className="space-y-4">
    
    {/* New Password Field */}
    <div>
      <label htmlFor="newPassword" className="block text-gray-700 dark:text-gray-300 font-medium">
        New Password
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" size={20} />
        <Input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.newPassword}
          name="newPassword"
          id="newPassword"
          type="password"
          className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 
                     text-gray-900 dark:text-gray-200 placeholder:text-gray-400 
                     dark:placeholder-gray-500 focus:outline-2 focus:outline-indigo-600 
                     dark:focus:outline-indigo-400"
        />
      </div>
      {touched.newPassword && errors.newPassword && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.newPassword}</p>
      )}
    </div>

    {/* Confirm Password Field */}
    <div>
      <label htmlFor="confirmationPassword" className="block text-gray-700 dark:text-gray-300 font-medium">
        Confirm Password
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" size={20} />
        <Input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.confirmationPassword}
          name="confirmationPassword"
          id="confirmationPassword"
          type="password"
          className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 
                     text-gray-900 dark:text-gray-200 placeholder:text-gray-400 
                     dark:placeholder-gray-500 focus:outline-2 focus:outline-indigo-600 
                     dark:focus:outline-indigo-400"
        />
      </div>
      {touched.confirmationPassword && errors.confirmationPassword && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.confirmationPassword}</p>
      )}
    </div>

    {/* Email Error */}
    {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>}

    {/* Success Message */}
    {sucessMsg && (
      <p className="text-green-600 dark:text-green-400 font-semibold text-center mt-2 capitalize">
        {sucessMsg}
      </p>
    )}

    {/* Error Message */}
    {errorMsg && (
      <p className="text-red-500 dark:text-red-400 font-semibold text-center mt-2 capitalize">
        {errorMsg}
      </p>
    )}

    {/* Submit Button */}
    <Button name="Reset Password" isLoading={isLoading} />
  </form>
</div>

  
  
  )
}
