"use client";

export interface IsLogged {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
}

import { createContext, useState } from "react";

export const LoginContext = createContext<{
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
}>({
  isLogged: false,
  setIsLogged: (isLogged: boolean) => {},
});

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </LoginContext.Provider>
  );
};
