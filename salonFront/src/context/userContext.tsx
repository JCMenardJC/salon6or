import { TUser } from "../types/user.type";
import { createContext, useState, ReactElement } from "react";
export const UserInit = {
  id: 0,
  prenom: "",
  nom: "",
  pseudo: "",
  email: "",
  password: "",
  confirmPassword: "",
  telephone: "",
  adresse: "",
  ville: "",
  codepostal: "",
  admin: false,
} as TUser;

interface UserContextProps {
  children: ReactElement;
}

export interface UserContextInterface {
  user: TUser;
  setUser: (value: TUser) => void;
}

export const UContext = createContext<UserContextInterface>({
  user: UserInit,
  setUser: (user: TUser) => {},
});

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<TUser | null>(null);

  const handleUserChange = (user: TUser | null) => {
    setUser(user);
  };

  const contextValue = {
    user: user,
    setUser: handleUserChange,
  };

  return <UContext.Provider value={contextValue}>{children}</UContext.Provider>;
};
