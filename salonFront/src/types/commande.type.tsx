import { Tproduit } from "./produit.type";
import { TUser } from "./user.type";

export type TCommande = {
  id: number;
  prix_total: string;
  payee: boolean;
  livree: boolean;
  produits: Tproduit[];
  user: TUser;
};
