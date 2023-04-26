import { useContext, useEffect } from "react";
import { UContext } from "../../context/userContext";
import "./compteUser.css";

export default function CompteUsers(props: {
  TOKEN: string;
  setPage: (value: string) => void;
  logout: () => void;
}) {
  const { user } = useContext(UContext);
  const { logout } = props;
  console.log(user);

  return (
    <div className="container-fluid">
      <h1>* Bienvenu-e {user?.prenom} *</h1>
      <div className="container ">
        <div className="cadre container-fluid text-center">
          <div className="container">
            <div className="row ">
              <div className="datas">
                <div>Nom : {user?.nom}</div>
                <div>Prénom : {user?.prenom}</div>
                <div>Adresse : {user?.adresse}</div>
                <div>
                  Code Postal : {user?.codepostal}
                  <br />
                  Ville : {user?.ville}
                </div>
                <div>Téléphone : {"0" + user?.telephone}</div>
                <div>Email : {user?.email}</div>
                <div className="mt-3  p-3 row"></div>
                <button
                  onClick={(e) => logout()}
                  className="btn border rounded-0"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
