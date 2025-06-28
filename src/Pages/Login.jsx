import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../Context/AuthContext";
import Button from "../Components/Button/Button";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Input from "../Components/Input/Input";
import { MdEmail } from "react-icons/md";
import { Lock, MailIcon } from "lucide-react";
import { API_BASE_URL } from "../utils/config";

const clientId = "278077638982-fm5f5uhjlkvroac47m3r0v1gsv9q694r.apps.googleusercontent.com";

export default function Login() {
  const [sucessMsg, setSucessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const[isFreezed,setIsFreezed]=useState(false)
  const navigate = useNavigate();
  const { setUserToken } = useContext(AuthContext);

  const { values, errors, handleBlur, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required").email("Enter a valid email"),
      password: Yup.string()
        .required("Password is required")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Minimum eight characters, at least one uppercase letter, one lowercase letter, and one number"),
    }),
  });

  async function login() {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, values);
      localStorage.setItem("token", data.data.token);
      setUserToken(data.data.token);
      setSucessMsg(data.message);
      setErrorMsg("");
    } catch ({response}) {
      console.log(response);
      setErrorMsg(response?.data?.msg || "Login failed");
      setSucessMsg("");
      if (response?.data?.msg==="profile is freezed") {
        setIsFreezed(true)
      }
    }finally{
      setIsLoading(false);
    }
   
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12  ">
  <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 shadow-xl rounded-lg">
    <div className="flex flex-col items-center">
      <img className="h-16 w-16 mb-4" src="/DALL·E_WhisperBox.webp" alt="App Logo" />
      <h2 className="mt-5 text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
        Sign in to your account
      </h2>
    </div>

    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
          Email address
        </label>
        <div className="relative">
          <MailIcon className="absolute left-3 top-3 text-gray-600 dark:text-gray-400" size={20} />
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 w-full"
          />
          {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-gray-300">
            Password
          </label>
          <Link to={"/forget-password"} className="text-sm text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-600 dark:text-gray-400" size={20} />
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 w-full"
          />
          {touched.password && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
      </div>

      <div className="mt-4">
        <Button name={"Login"} isLoading={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition" />
        {sucessMsg && <p className="text-green-500 text-center mt-2">{sucessMsg}</p>}
        {errorMsg && <p className="text-red-500 text-center mt-2">{errorMsg}</p>}
        {isFreezed &&<p> Do you want to reactivate your account? <Link to={"/unfreeze-account"} className="text-blue-400">Reactive</Link></p>}
      </div>
    </form>

    <div>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        <span className="px-3 text-gray-600 dark:text-gray-400 text-sm">or continue with</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      </div>
      <GoogleOAuthProvider clientId={clientId}>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async ({ credential }) => {
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
            text="continue_with"
          />
        </div>
      </GoogleOAuthProvider>
    </div>

    <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-400">
      Not a member?{" "}
      <Link to={"/register"} className="font-medium text-indigo-600 hover:text-indigo-500">
        Sign up
      </Link>
    </p>
  </div>
</div>


    </>
  );
}

