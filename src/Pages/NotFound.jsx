import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen text-2xl font-bold text-gray-700 dark:text-gray-200 gap-4 bg-gray-100 dark:bg-gray-900">
  <p className="flex items-center">Oops! Page Not Found</p>
  <Link
    to={"/"}
    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 mt-2 shadow-md"
  >
    <ArrowLeft size={20} strokeWidth={2} className="mr-2" /> Back to Home
  </Link>
</div>


    </>
  );
}





