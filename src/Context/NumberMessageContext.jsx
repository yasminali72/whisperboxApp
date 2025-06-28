import { createContext, useState } from "react";

export const NumberMessageContext = createContext();

export default function NumberMessageContextProvider({ children }) {
  const [numberMessage, setNumberMessage] = useState(0);

  return (
    <NumberMessageContext.Provider value={{ numberMessage, setNumberMessage }}>
      {children}
    </NumberMessageContext.Provider>
  );
}
