import React from "react";

export const UpdateCommandeContext = React.createContext({
  idCommande: "",

  setIdCommande: (value: string) => {},
});
