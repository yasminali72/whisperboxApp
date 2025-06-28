import axios from "axios";
import { Delete, DeleteIcon, Loader, LoaderCircle, Pin, PinIcon, PinOff, Trash } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Bounce,toast } from "react-toastify";
import { toastConfig } from "../../utils/toastConfig";
import { API_BASE_URL } from "../../utils/config";
export default function Message({message,setNumOfAllMessages,setNumOfPinMessages,numOfPinMessages}) {
const {userToken}=useContext(AuthContext)
const [loadingDelete, setloadingDelete] = useState(false);
const [loadingPin, setLoadingPin] = useState(false);


async function deleteMsg(id) {
  await axios.delete(`${API_BASE_URL}/user/${id}`,{
    headers:{
      Authorization:`Bearer ${userToken}`
    }
  }).then(({data})=>{setNumOfAllMessages(data.data[0].messages.length); setloadingDelete(false);toast.success("Message deleted successfully!", toastConfig);}).catch((err)=>{
    setloadingDelete(false)
    console.log(err);
  })
  
}

async function pinMsg(id) {
  setLoadingPin(true)
  await axios.patch(`${API_BASE_URL}/user/pin-message/${id}`,{},{
    headers:{
      Authorization:`Bearer ${userToken}`
    }
  }).then(({data})=>{ setNumOfPinMessages(numOfPinMessages+1);setLoadingPin(false);toast.success("Message pinned successfully!", toastConfig);}).catch(({response})=>{
    setLoadingPin(false)
    toast.error("error", toastConfig)
   console.log(response);
  })
  
}

async function unPinMsg(id) {
  setLoadingPin(true)
  await axios.patch(`${API_BASE_URL}/user/unPin-message/${id}`,{},{
    headers:{
      Authorization:`Bearer ${userToken}`
    }
  }).then(({data})=>{ setNumOfPinMessages(numOfPinMessages-1);setLoadingPin(false);toast.success("Message un pinned successfully!", toastConfig);}).catch(({response})=>{
    setLoadingPin(false)
    toast.error("error",toastConfig)
   console.log(response);
  })
  
}

  return (
   <>
   
   <div 
  key={message._id} 
  className="border-2 my-2 p-4 border-gray-300 dark:border-gray-700 
             rounded-md shadow-lg hover:shadow-xl transition 
             bg-white dark:bg-gray-900 relative">

  {/* زر التثبيت */}
  <button 
    className="absolute top-3 right-3 hover:cursor-pointer transition-all duration-200 focus:outline-none" 
    onClick={() => (message.pin ? unPinMsg(message._id) : pinMsg(message._id))}
  >
    {!loadingPin ? (
      message.pin ? (
        <Pin className="w-6 h-6 text-yellow-500 hover:scale-105" />
      ) : (
        <PinOff className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-yellow-500 hover:scale-105" />
      )
    ) : (
      <Loader className="w-6 h-6 text-gray-400 dark:text-gray-500 animate-spin opacity-50 cursor-not-allowed" />
    )}
  </button>

  {/* محتوى الرسالة */}
  <h1 className="text-blue-600 dark:text-blue-400 font-semibold break-words pr-5 max-w-full">
    {message.message}
  </h1>
  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
    {new Date(message.createdAt).toLocaleString()}
  </p>

  {/* زر الحذف */}
  <button 
    className="absolute bottom-3 right-3 text-gray-500 dark:text-gray-400 
               hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 
               hover:cursor-pointer focus:outline-none"
    onClick={() => { deleteMsg(message._id); setloadingDelete(true); }}
  >
    {!loadingDelete ? (
      <Trash className="w-6 h-6 hover:scale-105" />
    ) : (
      <Loader className="w-6 h-6 text-gray-400 dark:text-gray-500 animate-spin opacity-50 cursor-not-allowed" />
    )}
  </button>
</div>

</>
  )
}
