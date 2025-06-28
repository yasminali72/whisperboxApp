import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { CalendarDays, User, Phone, Lock } from "lucide-react";
import Input from "../Input/Input";
import { API_BASE_URL } from "../../utils/config";
export default function UpdateProfile() {
  const { felidName, value } = useParams();
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [sucessMsg, setSucessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const validations = {
    userName: Yup.string()
      .required("User Name is requrie")
      .min(3, "User name must be at least 3 characters")
      .max(20, "User name must be less than 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter valid email"),
    password: Yup.string()
      .required("password is requried")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      ),
    confirmationPassword: Yup.string()
      .required("confirmationPassword is requried")
      .oneOf(
        [Yup.ref("password")],
        "password and confirmationPassword is not matched"
      ),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(002|\+2)?01[0125][0-9]{8}$/, "phone not valid"),
    gender: Yup.string()
      .required("gender is required")
      .oneOf(["female", "male"], "Gender must be either female or male"),
    DOB: Yup.date()
      .typeError("Invalid date format, please use YYYY-MM-DD")
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth cannot be in the future"),
  };
  const { values, errors, handleBlur, handleSubmit, handleChange, touched } =
    useFormik({
      initialValues: {
        [felidName]: value,
      },
      onSubmit: update,
      validationSchema: Yup.object().shape(
        felidName && validations[felidName]
          ? { [felidName]: validations[felidName] }
          : {}
      ),
    });

  async function update() {
    console.log("hi");
    setIsLoading(true);
    try {
      let { data } = await axios.patch(
        `${API_BASE_URL}/user/updateProfile`,
        values,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(data);
      setErrorMsg("");
      setSucessMsg(data.message);

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch ({ response }) {
      console.log(response);
      setSucessMsg("");
      setErrorMsg(
        response.data.msg || response.data.validationResualt[0].message
      );
    } finally {
      setIsLoading(false);
    }
  }
  const getIcon = (name) => {
    switch (name) {
      case "DOB":
        return <CalendarDays className="absolute left-3 top-3 text-gray-500" size={20} />;
      case "phone":
        return <Phone className="absolute left-3 top-3 text-gray-500" size={20} />;
      case "password":
      case "confirmationPassword":
        return <Lock className="absolute left-3 top-3 text-gray-500" size={20} />;
      default:
        return <User className="absolute left-3 top-3 text-gray-500" size={20} />;
    }
  };
  return (
    <>
      <div className="container mx-auto p-6 max-w-md bg-white shadow-lg rounded-lg mt-10 dark:bg-gray-800 dark:text-gray-100 ">
      <h1 className="text-3xl font-bold mb-6 text-center ">
        Update  {felidName}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor={felidName} className="block text-lg font-semibold  mb-2">
            {felidName}
          </label>
          <div className="relative">
            {getIcon(felidName)}
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={
                felidName === "DOB"
                  ? values[felidName] !== "undefined"
                    ? new Date(values[felidName]).toISOString().split("T")[0]
                    : ""
                  : values[felidName]
              }
              type={felidName === "DOB" ? "date" : "text"}
              name={felidName}
              id={felidName}
            />
          </div>
          {touched[felidName] && errors[felidName] && (
            <p className="text-red-500 text-sm mt-1">{errors[felidName]}</p>
          )}
        </div>
        {sucessMsg && <p className="text-green-600 font-semibold text-center mt-2">{sucessMsg}</p>}
        {errorMsg && <p className="text-red-500 font-semibold text-center mt-2">{errorMsg}</p>}
        <Button 
        isLoading={isLoading}
        name={"update "+felidName}
          type="submit"
         
        >
         
        </Button>

        
      </form>
    </div>
    </>
  );
}
