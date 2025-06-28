import axios from "axios";
import { useFormik } from "formik";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import Button from "../Components/Button/Button";
import { Bounce, toast } from "react-toastify";
import { toastConfig } from "../utils/toastConfig";
import { ModeContext } from "../Context/ModeContext";
import { API_BASE_URL } from "../utils/config";
export default function SendMessage() {
  const { userId,userName } = useParams();

const [isLoading, setIsLoading] = useState(false);


  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        recipientId: userId,
        message: "",
      },
      onSubmit: sendMessage,
      validationSchema: Yup.object({
        message: Yup.string().required("enter your message").min(5).max(50000),
        recipientId: Yup.string().required(),
      }),
    });

  async function sendMessage() {
    setIsLoading(true)
    await axios
      .post(`${API_BASE_URL}/message`, values)
      .then(({data}) => {
        setIsLoading(false)
        toast.success("Your message has been sent successfully", toastConfig);
   values.message=""
      })
      .catch(({ response }) => {
        setIsLoading(false)
        toast.error(response.data.msg,toastConfig)
      });
  }
  return (
    <>
    <div className="mt-10 flex flex-col items-center justify-center px-4">
  <div className="w-full max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <label htmlFor="sendMessage" className="text-lg font-semibold capitalize block text-gray-900 dark:text-gray-200">
        Send Message to {userName}
      </label>
      <textarea
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.message}
        name="message"
        id="sendMessage"
        cols="30"
        rows="5"
        className="border p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        placeholder="Type your message..."
      ></textarea>
      {touched.message && errors.message && (
        <p className="text-red-500 text-center">{errors.message}</p>
      )}

      <Button name={'Send'} isLoading={isLoading} /> </form>
  </div>
</div>

    </>
  );
}
