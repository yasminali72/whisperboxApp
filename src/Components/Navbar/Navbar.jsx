import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Moon, Sun, User2 } from "lucide-react";
import { ModeContext } from "../../Context/ModeContext";
import { API_BASE_URL } from "../../utils/config";
import axios from "axios";
import { NumberMessageContext } from "../../Context/NumberMessageContext";

export default function Navbar() {
  const { userToken, setUserToken } = useContext(AuthContext);
  const { numberMessage, setNumberMessage } = useContext(NumberMessageContext);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ModeContext);

  const [user, setUser] = useState();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  async function getUser() {
    await axios
      .get(`${API_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(({ data }) => {
        setUser(data.data.user);
        setNumberMessage(data.data.numberOfAllMessages);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }
  return (
    <>
      <nav className="bg-gray-100 dark:bg-gray-900 shadow-md">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block size-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>

            {/* شعار الموقع */}
            <div className="flex flex-1 justify-center sm:items-stretch sm:justify-start">
              <Link to={"/"} className="flex shrink-0 items-center space-x-2">
                <img
                  className="w-9 h-9 rounded-md"
                  src="/DALL·E_WhisperBox.webp"
                  alt="logo"
                />
                <span className="text-xl font-bold dark:text-white">
                  WhisperBox
                </span>
              </Link>
            </div>

            {/* المستخدم مسجل الدخول */}
            {userToken && (
              <div className="absolute hidden inset-y-0 right-0 sm:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* زر الإشعارات */}
                <button className="relative rounded-full bg-gray-800 p-1 text-gray-400 dark:text-gray-300 hover:text-white">
                  <span className="sr-only">View notifications</span>

                  {/* Notification Icon */}
                  <svg
                    className="size-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>

                  {/* Notification Count Badge */}
                  {numberMessage > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white shadow">
                      {numberMessage > 99 ? "+99" : numberMessage}
                    </span>
                  )}
                </button>

                <div className="relative ml-3">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="relative flex rounded-full bg-gray-800 text-sm hover:cursor-pointer"
                  >
                    <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase">
                      {user?.userName ? (
                        user.userName.charAt(0)
                      ) : (
                        <User2 className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {showMenu && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white dark:bg-gray-800 py-1 ring-1 shadow-lg ring-black/5"
                    >
                      <Link
                        to={"/profile"}
                        onClick={() => setShowMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        Your Profile
                      </Link>
                      <Link
                        to={"/settings"}
                        onClick={() => setShowMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          setUserToken("");
                          setShowMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!userToken && (
              <div className="hidden sm:flex">
                <Link
                  to={"/login"}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md mr-2 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="px-4 py-2 bg-blue-600 text-white dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-400"
                >
                  Get Started
                </Link>
              </div>
            )}
            {userToken && (
              <button
                onClick={() => navigate("/profile")}
                className="relative flex sm:hidden rounded-full bg-gray-800 text-sm hover:cursor-pointer"
              >
                <img
                  className="size-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-2 cursor-pointer"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 mr-2 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 mr-2 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {mobileMenu && !userToken && (
          <div className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 flex flex-col">
              <Link
                to={"/login"}
                onClick={() => setMobileMenu(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                onClick={() => setMobileMenu(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
        {mobileMenu && userToken && (
          <div className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 flex flex-col">
              <Link
                to={"/profile"}
                onClick={() => setMobileMenu(false)}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Your Profile
              </Link>
              <Link
                to={"/settings"}
                onClick={() => setMobileMenu(false)}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  setUserToken("");
                  setMobileMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
