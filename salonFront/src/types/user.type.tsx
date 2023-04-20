export type TUser = {
  id: number;
  prenom: string;
  nom: string;
  email: string | null;
  password: string;
  passwordConfirmed: string;
  telephone: string;
  adresse: string;
  ville: string;
  codepostal: string;
  admin: boolean;
} | null;
