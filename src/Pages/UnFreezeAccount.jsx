import { useFormik } from "formik";
import Button from "../Components/Button/Button";
import Input from "../Components/Input/Input";
import * as Yup from "yup"
import { useState } from "react";
import { MailIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/config";
export default function UnFreezeAccount() {

    const [sucessMsg, setSucessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate=useNavigate()
const{values,errors,handleBlur,handleChange,handleSubmit,touched}=useFormik({
    initialValues:{
        email:""
    },
    onSubmit:submit,
    validationSchema:Yup.object({
        email: Yup.string().required("Email is required").email("Enter a valid email")
    })
})
async function submit() {
    setIsLoading(true)
    setErrorMsg("")
    setSucessMsg("")
    try {
        let {data}=await axios.patch(`${API_BASE_URL}/user/unFreezeProfile`,values)
        
        setSucessMsg(data?.message)
        localStorage.setItem("email",values.email)
            navigate("/verify-code/verifyCodeForReactive")
     
    } catch ({response}) {
        setErrorMsg(response?.data?.msg)

    }
    finally{
        setIsLoading(false)
    }
}
  return (
  <>
 <div className="w-full md:w-1/2 m-auto mt-10 shadow-md p-2">
<form  onSubmit={handleSubmit}>
<label htmlFor="email" className="">Enter your Email:</label>
<div className="relative">
          <MailIcon className="absolute left-3 top-3 text-gray-600 dark:text-gray-400" size={20} />
  <Input type={"email"} id={"email"} name={"email"} value={values.email} onChange={handleChange} onBlur={handleBlur}  />
  </div>
  {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

  {sucessMsg && <p className="text-green-500 text-center mt-2">{sucessMsg}</p>}
        {errorMsg && <p className="text-red-500 text-center mt-2">{errorMsg}</p>}
      
  <Button name={"Submit"} isLoading={isLoading}/>
</form>
 </div>
  
  </>
  )
}
