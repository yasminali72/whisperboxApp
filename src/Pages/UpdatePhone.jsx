import  { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import Button from '../Components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/config';

export default function UpdatePhone() {
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

const navigate=useNavigate()
  const {handleSubmit,handleBlur,handleChange,values,errors,touched} = useFormik({
    initialValues: { newPhone: '' },
    validationSchema: Yup.object({
      newPhone: Yup.string()
        .required("Phone is required")
        .matches(/^(002|\+2)?01[0125][0-9]{8}$/, "Phone number is not valid"),
    }),
    onSubmit:updatePhone});

   async function updatePhone() {
      setIsLoading(true);
      setSuccessMessage("");
setErrorMessage("")
      try {
        const { data } = await axios.patch(
          `${API_BASE_URL}/user/updatePhone`,
          values,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        console.log(data);
        setSuccessMessage("Phone number updated successfully!");
        setTimeout(() => {
          navigate("/profile")
        }, 1000);
      } catch ({response}) {
        setSuccessMessage("")
        setErrorMessage(response.data.msg)
        console.error("Error updating phone:", response);
      }

      setIsLoading(false);
  
    }
  return (
    <>
      <Helmet>
        <title>Update Phone</title>
      </Helmet>
      <div className="container mx-auto mt-5 p-6 max-w-md bg-gray-50 dark:bg-gray-900 dark:text-gray-100 shadow-md rounded-lg">
  <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
    Update Phone
  </h1>

  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="phone" className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Phone
      </label>
      <input
        type="text"
        id="phone"
        name="newPhone"
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        value={values.newPhone}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.newPhone && errors.newPhone && (
        <p className="text-red-500 text-sm mt-1">{errors.newPhone}</p>
      )}
    </div>

    {/* رسائل النجاح والخطأ */}
    {successMessage && (
      <p className="text-green-500 text-center font-semibold">{successMessage}</p>
    )}
    {errorMessage && (
      <p className="text-red-500 text-center font-semibold">{errorMessage}</p>
    )}

    <Button name="Update your phone" isLoading={isLoading} />
  </form>
</div>

    </>
  );
}



