import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Bell, Cake, DeleteIcon, EyeOff, Flag, Lock, Mail, MessageCircle, Moon, Palette, Phone,  Sun,  Trash2,  UserRoundPen,  UserX,  VenusAndMarsIcon } from "lucide-react";
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toastConfig";
import { ModeContext } from "../Context/ModeContext";
import { API_BASE_URL } from "../utils/config";

export default function Settings() {
  const [user, setUser] = useState(null);
  const { userToken ,setUserToken} = useContext(AuthContext);
  const {darkMode, setDarkMode} = useContext(ModeContext);



useEffect(()=>{
  getUser()
},[])
async function getUser() {
  await axios
    .get(`${API_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then(({ data }) => {
      setUser(data?.data.user);
   
      
    })
    .catch(({ response }) => {
      if (response.data?.msg == "TokenExpiredError: jwt expired") {
        setUserToken("");
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
}
async function deleteAllMessages() {
  await axios
    .patch(
      `${API_BASE_URL}/user/all-messages`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    .then(({ data }) => {
      
      toast.success(`${data.message}`, toastConfig);
    })
    .catch(({response}) => {
      console.log(response);
   toast.error(`${response.data.msg}`,toastConfig)
    });
}

async function deleteAccount() {
  try {
    let {data}=await axios.delete(`${API_BASE_URL}/user/profile`,{
      headers:{
        Authorization:`Bearer ${userToken}`
      }

    }
  )
  console.log(data);
  toast.success(`${data.message}`,toastConfig)
  localStorage.removeItem("token")
  setTimeout(() => {
    setUserToken("")
  }, 500);
  } catch (error) {
    console.log(error);
  }
}
  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <div className="container mx-auto p-6 max-w-2xl">
  <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Settings</h1>

  {/* Account Settings */}
  <section className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 max-w-lg mx-auto">
    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Account Settings</h2>
    <div className="space-y-3">
      {[
        { to: `/settings/userName/${user?.userName}`, icon: <UserRoundPen className="text-blue-500" />, text: "Change Username" },
        { to: `/settings/DOB/${user?.DOB}`, icon: <Cake className="text-pink-500" />, text: "Change Date Of Birth" },
        { to: `/settings/gender/${user?.gender}`, icon: <VenusAndMarsIcon className="text-purple-500" />, text: "Change Gender" },
        { to: "/update-phone", icon: <Phone className="text-green-500" />, text: "Update Phone" },
        { to: `/settings/email/${user?.email}`, icon: <Mail className="text-yellow-500" />, text: "Update Email" },
        { to: "/change-password", icon: <Lock className="text-red-500" />, text: "Change Password" },
      ].map(({ to, icon, text }, index) => (
        <Link key={index} to={to} className="flex items-center justify-between p-3 rounded-lg border dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer">
          <span className="flex items-center gap-3">
            {icon} {text}
          </span>
        </Link>
      ))}
    </div>
  </section>

  {/* Privacy Settings */}
  <section className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 max-w-lg mx-auto">
    <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Privacy Settings</h2>
    {[
      { icon: <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />, text: "Who can send me messages?" },
      { icon: <EyeOff className="w-5 h-5 mr-2 text-red-500" />, text: "Allow Anonymous Messages" },
      { icon: <UserX className="w-5 h-5 mr-2 text-gray-600" />, text: "Block Users" },
    ].map(({ icon, text }, index) => (
      <button key={index} className="flex items-center w-full text-left p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition rounded-md cursor-pointer">
        {icon} {text}
      </button>
    ))}
  </section>

  {/* Message Management */}
  <section className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 max-w-lg mx-auto">
    <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Message Management</h2>
    {[
      { icon: <Bell className="w-5 h-5 mr-2 text-blue-500" />, text: "Enable Notifications" },
      { icon: <Trash2 className="w-5 h-5 mr-2 text-red-500" />, text: "Delete All Messages", onClick: deleteAllMessages },
      { icon: <Flag className="w-5 h-5 mr-2 text-yellow-500" />, text: "Report Messages" },
    ].map(({ icon, text, onClick }, index) => (
      <button key={index} onClick={onClick} className="flex items-center w-full text-left p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition rounded-md cursor-pointer">
        {icon} {text}
      </button>
    ))}
  </section>

  {/* Appearance Settings */}
  <section className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 max-w-lg mx-auto">
    <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Appearance</h2>
    <button onClick={() => setDarkMode(!darkMode)} className="flex items-center w-full text-left p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition rounded-md cursor-pointer">
    {darkMode ? (
  <div className="flex items-center space-x-2">
    <Sun className="w-5 h-5 text-yellow-500" />
    <p >Light Mode</p>
  </div>
) : (
  <div className="flex items-center space-x-2">
    <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
    <p >Dark Mode</p>
  </div>
)}
    </button>
    
  </section>

{/* delete account */}
<section className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 max-w-lg mx-auto">
    <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Delete Account</h2>
    <button onClick={deleteAccount} className="flex items-center w-full text-left p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition rounded-md cursor-pointer"><Trash2 className="text-red-500 mr-2 w-5 h-5"/> Delete Account</button>
  </section>
</div>


    </>
  );
}
