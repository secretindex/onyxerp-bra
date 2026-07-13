"use client";

export interface App {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  url: string;
}

import { createContext, useState } from "react";

export const AppsContext = createContext<{
  apps: {name: string, description: string};
  setApps: (apps: {name: string, description: string}) => void;
}>({
  apps: {name: "", description: ""},
  setApps: (apps: {name: string, description: string}) => {},
});

export const AppsProvider = ({ children }: { children: React.ReactNode }) => {
  const [apps, setApps] = useState<{name: string, description: string}>({name: "", description: ""});
  return (
    <AppsContext.Provider value={{ apps, setApps }}>
      {children}
    </AppsContext.Provider>
  );
};
