import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Footer() {
 const {userToken}= useContext(AuthContext)
  return (
   <>
   {!userToken && (
  <section className="text-center px-6 bg-blue-600 text-white py-12 rounded-t-lg shadow-md dark:bg-blue-700 dark:text-gray-200">
    <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
    <p className="mt-2 text-lg">Create your profile and start receiving anonymous messages today!</p>
    <Link 
      to="/register" 
      className="inline-block mt-4 bg-white px-8 py-3 text-lg font-semibold text-blue-600 rounded-md hover:bg-gray-200 transition-all duration-300"
    >
      Sign Up Now
    </Link>
  </section>
)}

<footer className="text-center text-gray-400 bg-gray-900 py-4 text-sm dark:bg-gray-950">
  <p>
    © 2025 <span className="font-semibold text-white">WhisperBox</span> by{" "}
    <a
      href="https://github.com/yasminali72/whisperboxApp"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-500 transition-colors"
    >
      Yasmin Ali
    </a>{" "}
    – All rights reserved.
  </p>
</footer>


 </>
  )
}
