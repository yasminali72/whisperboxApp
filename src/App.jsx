import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthContextProvider from "./Context/AuthContext";

import Routes from "./routes/Routes";
import ModeContextProvider from "./Context/ModeContext";
import NumberMessageContextProvider from "./Context/NumberMessageContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <ModeContextProvider>
          <NumberMessageContextProvider>
            <Routes />
            <ToastContainer newestOnTop={true} />
          </NumberMessageContextProvider>
        </ModeContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
