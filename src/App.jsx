import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthContextProvider from "./Context/AuthContext";

import Routes from "./routes/Routes";
import ModeContextProvider from "./Context/ModeContext";

function App() {
  return (
    <>
      <AuthContextProvider>
          <ModeContextProvider>
          <Routes />
          <ToastContainer newestOnTop={true} />
          </ModeContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
