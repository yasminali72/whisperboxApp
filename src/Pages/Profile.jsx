import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Loader, Loader2, LoaderCircle } from "lucide-react";
import Message from "../Components/Message/Message";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../Components/Loading/Loading";
import { toastConfig } from "../utils/toastConfig";
import {
  Copy,
  Trash2,
  Calendar,
  Phone,
  Mail,
  User,
  Share2,
} from "lucide-react";
import { API_BASE_URL } from "../utils/config";
import { NumberMessageContext } from "../Context/NumberMessageContext";

export default function Profile() {
  const { userToken, setUserToken } = useContext(AuthContext);
  const { numberMessage, setNumberMessage } = useContext(NumberMessageContext);
  const [refreshMessages, setRefreshMessages] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState([]);

  const [numOfAllMessages, setNumOfAllMessages] = useState(0);
  const [numOfPinMessages, setNumOfPinMessages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getUser();
  }, [numOfAllMessages, numOfPinMessages, refreshMessages]);

  async function getUser() {
    await axios
      .get(`${API_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(({ data }) => {
        setUser(data.data.user);
        setMessages(data.data.messages);
        setNumOfAllMessages(data.data.numberOfAllMessages);
        setNumOfPinMessages(data.data.numberOfPinMessage);
        setNumberMessage(data.data.numberOfAllMessages);
        setRefreshMessages(false);
      })
      .catch(({ response }) => {
        console.log(response);
        if (
          response.data?.msg == "TokenExpiredError: jwt expired" ||
          "In-valid credentials"
        ) {
          setUserToken("");
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }
  async function deleteAllMessages() {
    setIsLoading(true);
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
        setNumOfAllMessages(0);
        setIsLoading(false);
        toast.success(`${data.message}`, toastConfig);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title className="capitalize">{user.userName}</title>
      </Helmet>
      <div className="max-w-md mx-auto p-6 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-xl mt-10 text-gray-900 dark:text-gray-100">
        <div className="flex items-center space-x-6">
          <img
            src={user.image?.secure_url || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md"
          />
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />{" "}
              {user.userName}
            </h2>
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />{" "}
              {user.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />{" "}
              {user.phone}
            </p>
            <p className="flex items-center gap-2">⚧ {user.gender}</p>
            <p className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />{" "}
              {new Date(user.DOB).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm text-center">
          <p className="font-medium flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />{" "}
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button
          className="mt-5 w-full py-2 bg-indigo-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all duration-300 shadow-md"
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/send-message/${user._id}/${user.userName}`
            );
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          <Share2 className="w-5 h-5" /> Share Your Profile
        </button>

        {copied && (
          <p className="text-center bg-gray-800 text-white p-2 rounded-md mt-2 transition-opacity duration-300 shadow-md flex items-center justify-center gap-2">
            <Copy className="w-5 h-5 text-green-400" /> User ID copied!
          </p>
        )}
      </div>

      <div className="mt-10 p-4 bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            {numOfAllMessages > 0
              ? `Messages (${numOfAllMessages})`
              : "No messages"}
          </h1>
          {numOfAllMessages > 0 && (
            <>
              <div className="flex justify-between items-center gap-2">
                <button onClick={() => setRefreshMessages(true)}>
                  <Loader className={`${refreshMessages?"  animate-spin":""} cursor-pointer` }/>
                </button>

                <button
                  type="reset"
                  className={`flex items-center px-3 py-2 text-white font-medium rounded-lg transition-all gap-2 cursor-pointer ${
                    isLoading || numOfAllMessages === 0
                      ? "bg-red-300 opacity-50"
                      : "bg-red-500 hover:bg-red-600 shadow-md"
                  }`}
                  onClick={deleteAllMessages}
                  disabled={isLoading || numOfAllMessages === 0}
                >
                  <Trash2 className="w-5 h-5" /> Delete All{" "}
                  {isLoading && <LoaderCircle className="animate-spin ml-2" />}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {messages
            ?.slice()
            .sort((a, b) =>
              a.pin === b.pin
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : b.pin - a.pin
            )
            .map((message, index) => (
              <Message
                key={index}
                message={message}
                setNumOfAllMessages={setNumOfAllMessages}
                setNumOfPinMessages={setNumOfPinMessages}
                numOfPinMessages={numOfPinMessages}
              />
            ))}
        </div>
      </div>
    </>
  );
}
