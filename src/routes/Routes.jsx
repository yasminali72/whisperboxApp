import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NotFound from "../Pages/NotFound";
import ProdectAuthRoute from "../Components/ProdectAuthRoute/ProdectAuthRoute";
import ProdectedRoute from "../Components/ProdectedRoute/ProdectedRoute";
import ConfirmEmail from "../Pages/VerifyCode.jsx";
import Profile from "../Pages/Profile";
import Settings from "../Pages/Settings";
import SendMessage from "../Pages/SendMessage";
import UpdateProfile from "../Components/UpdateProfile/UpdateProfile";
import UpdatePhone from "../Pages/UpdatePhone";
import ChangePassword from "../Pages/ChangePassword.jsx";
import ForgetPassword from "../Pages/ForgetPassword";
import VerifyCode from "../Pages/VerifyCode.jsx";
import ResetPassword from "../Pages/ResetPassword.jsx";
import Error from "../Pages/Error.jsx";
import UnFreezeAccount from "../Pages/UnFreezeAccount.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "profile",
        element: (
          <ProdectedRoute>
            <Profile />
          </ProdectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProdectedRoute>
            <Settings />
          </ProdectedRoute>
        ),
      },
      ,
      {
        path: "settings/:felidName/:value",
        element: (
          <ProdectedRoute>
            <UpdateProfile />
          </ProdectedRoute>
        ),
      },
      {
        path: "update-phone",
        element: (
          <ProdectedRoute>
            <UpdatePhone />
          </ProdectedRoute>
        ),
      },
      {
        path: "change-password",
        element: (
          <ProdectedRoute>
            <ChangePassword />
          </ProdectedRoute>
        ),
      },
      { path: "send-message/:userId/:userName", element: <SendMessage /> },

      {
        path: "login",
        element: (
          <ProdectAuthRoute>
            <Login />
          </ProdectAuthRoute>
        ),
      },
      {
        path: "forget-password",
        element: (
          <ProdectAuthRoute>
            <ForgetPassword />
          </ProdectAuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProdectAuthRoute>
            <Register />
          </ProdectAuthRoute>
        ),
      }, 
      {
        path: "verify-code/:type",
        element: (
          <ProdectAuthRoute>
            <VerifyCode />
          </ProdectAuthRoute>
        ),
      },
      {
        path: "reset-password",
        element: (
          <ProdectAuthRoute>
            <ResetPassword />
          </ProdectAuthRoute>
        ),
      },
      {
        path: "unfreeze-account",
        element: (
          <ProdectAuthRoute>
            <UnFreezeAccount />
          </ProdectAuthRoute>
        ),
      },
      
    ],errorElement:<Error/>
  },
  { path: "*", element: <NotFound /> },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
