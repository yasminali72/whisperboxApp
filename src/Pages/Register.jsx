import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import Button from "../Components/Button/Button";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContext } from "../Context/AuthContext";
import { API_BASE_URL } from "../utils/config";
const clientId = "278077638982-fm5f5uhjlkvroac47m3r0v1gsv9q694r.apps.googleusercontent.com";

export default function Register() {
   const [sucessMsg, setSucessMsg] = useState("");
   const [errorMsg, setErrorMsg] = useState("");
const [isLoading, setIsLoading] = useState(false);
const {setUserToken}=useContext(AuthContext)
const navigate=useNavigate()
  const {values,errors,handleBlur,handleSubmit,handleChange,touched}=useFormik({
    initialValues:{
      "userName":"",
    "email":"",
    "password":"",
    "confirmationPassword":"",
    "gender":"",
    "phone":""
    },
    onSubmit:register,
    validationSchema:Yup.object({
      userName:Yup.string().required("User Name is requrie").min(3,"User name must be at least 3 characters").max(20,"User name must be less than 20 characters"),
      email:Yup.string().required("Email is required").email("Enter valid email"),
      password:Yup.string().required("password is requried").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"),
      confirmationPassword:Yup.string().required("confirmationPassword is requried").oneOf([Yup.ref("password")],"password and confirmationPassword is not matched"),
      phone:Yup.string().required("phone is required").matches(/^(002|\+2)?01[0125][0-9]{8}$/,"phone not valid"),
      gender:Yup.string().required("gender is required").oneOf(["female","male"],"Gender must be either Female or Male")
    })
  })
  async function register() {
    setIsLoading(true)
    await axios.post(`${API_BASE_URL}/auth/signup`,values).then(({data})=>{
setIsLoading(false)
setSucessMsg(data.message)
setErrorMsg("")
localStorage.setItem("email",data.data.user.email)
setTimeout(() => {
  navigate("/verify-code/confirm-email")
}, 1000); 
    }).catch(({response})=>{
      setIsLoading(false)
      setSucessMsg("")
setErrorMsg(response?.data.msg ||response?.data.validationResualt[0].message)
     
    })
    
  }
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 ">
  <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-16 w-16 bg-transparent rounded-md"
        src="/DALL·E_WhisperBox.webp"
        alt="Your Company"
      />
      <h2 className="mt-5 text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Sign Up
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
            UserName
          </label>
          <div className="mt-2">
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.userName}
              type="text"
              name="userName"
              id="userName"
              autoComplete="userName"
              className="block w-full rounded-md bg-white dark:bg-gray-700 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
            {touched.userName && errors.userName && <p className="text-red-500">{errors.userName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
            Email address
          </label>
          <div className="mt-2">
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              className="block w-full rounded-md bg-white dark:bg-gray-700 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
            {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
            Phone Number
          </label>
          <div className="mt-2">
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
              type="tel"
              name="phone"
              id="phone"
              autoComplete="phone"
              className="block w-full rounded-md bg-white dark:bg-gray-700 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
            {touched.phone && errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
            Gender
          </label>
          <div className="mt-2">
            <select
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.gender}
              name="gender"
              id="gender"
              className="block w-full rounded-md bg-white dark:bg-gray-700 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:outline-indigo-600"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {touched.gender && errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
            Password
          </label>
          <div className="mt-2">
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              className="block w-full rounded-md bg-white dark:bg-gray-700 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
            {touched.password && errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="confirmationPassword" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
            Confirmation Password
          </label>
          <div className="mt-2">
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmationPassword}
              type="password"
              name="confirmationPassword"
              id="confirmationPassword"
              autoComplete="current-password"
              className="block w-full rounded-md bg-white dark:bg-gray-700 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
            {touched.confirmationPassword && errors.confirmationPassword && <p className="text-red-500">{errors.confirmationPassword}</p>}
          </div>
        </div>

        <div>
          <Button name={'Sign up'} isLoading={isLoading} />
        </div>
        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
        {sucessMsg && <p className="text-green-500 text-center">{sucessMsg}</p>}
      </form>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">or continue with</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      <GoogleOAuthProvider clientId={clientId}>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async ({ credential }) => {
              if (!credential) {
                setErrorMsg("Google authentication failed.");
                return;
              }
              try {
                const { data } = await axios.post(`${API_BASE_URL}/auth/loginWithGoogle`, { credential });
                localStorage.setItem("token", data.data.token);
                setUserToken(data.data.token);
              } catch (error) {
                setErrorMsg("Google login failed. Please try again.");
              }
            }}
            onError={(error) => console.log(error)}
            theme="filled_blue"
            text="signup_with"
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  </div>
</div>

    </>
  );
}
