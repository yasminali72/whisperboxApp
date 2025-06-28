import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Button from "../Components/Button/Button";
import { Helmet } from "react-helmet";
import Input from "../Components/Input/Input";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/config";

export default function ChangePassword() {
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
const navigate=useNavigate()
  const {handleBlur,handleChange,handleSubmit,values,errors,touched} = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmationPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old password is required"),
      newPassword: Yup.string()
        .required("New password is required")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "At least 8 characters, one uppercase, one lowercase, and one number"
        ),
      confirmationPassword: Yup.string()
        .required("Confirmation is required")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
    }),
    onSubmit: changePassword
  });

  async function changePassword() {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const { data } = await axios.patch(
        `${API_BASE_URL}/user/updatePassword`,
       values,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      setSuccessMessage("Password changed successfully!");
navigate("/")

    } catch (error) {
      setErrorMessage("Failed to change password. Try again.");
    }

    setIsLoading(false);
  }

  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>

      <div className="container mx-auto p-6 max-w-md shadow-md mt-5 dark:bg-gray-800 dark:text-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-center">Change Password</h1>

        <form onSubmit={handleSubmit}>
          {/* Old Password */}
          <label htmlFor="oldPassword" className="block mb-2 font-semibold">
            Old Password
          </label>
          <Input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={values.oldPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.oldPassword && errors.oldPassword && (
            <p className="text-red-500 mb-2">{errors.oldPassword}</p>
          )}

          {/* New Password */}
          <label htmlFor="newPassword" className="block mb-2 font-semibold">
            New Password
          </label>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.newPassword && errors.newPassword && (
            <p className="text-red-500 mb-2">{errors.newPassword}</p>
          )}

          {/* Confirm Password */}
          <label htmlFor="confirmationPassword" className="block mb-2 font-semibold">
            Confirm Password
          </label>
          <Input
            type="password"
            id="confirmationPassword"
            name="confirmationPassword"
            
            value={values.confirmationPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmationPassword && errors.confirmationPassword && (
            <p className="text-red-500 mb-2">{errors.confirmationPassword}</p>
          )}

          {/* Success & Error Messages */}
          {successMessage && <p className="text-green-500 mb-2 text-center" >{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mb-2 text-center">{errorMessage}</p>}

          {/* Submit Button */}
          <Button name="Change Password" isLoading={isLoading} />
        </form>
      </div>
    </>
  );
}

