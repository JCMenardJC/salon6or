import { createContext, useState, ReactElement } from "react";

/**
 * Définition de l'interface de nos props
 */
interface AuthContextProps {
  children: ReactElement;
}

/**
 * Définition de l'interface pour notre context
 */
export interface AuthContextInterface {
  savedToken: string | null;
  onAuthChange: (token: string | null) => void;
}

/**
 * Initialisation de notre context avec une première valeur (l'objet)
 */
export const AuthContext = createContext<AuthContextInterface>({
  savedToken: null,
  onAuthChange: (token: string | null) => {},
});

/**
 * Création de notre composant provider de context
 */
export const AuthContextProvider = ({ children }: AuthContextProps) => {
  /**
   * Mise en place de la logique interne de notre context
   * Cela permet de mettre à dispo une fonction pour mettre
   * à jour l'état de connection de notre utilisateur
   * et d'accéder au token via notre context
   */
  const [token, setToken] = useState<string | null>(null);

  const handleAuthChange = (token: string | null) => {
    setToken(token);
  };

  const contextValue = {
    savedToken: token,
    onAuthChange: handleAuthChange,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
