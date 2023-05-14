import { useContext, useEffect, useState } from "react";
import { UContext } from "../../context/userContext";
import "./compteUser.css";
import AdminUsers from "./admin/admin.users";
import { TUser } from "../../types/user.type";
import TableauPresations from "../prestations/prestations";
import CommandeListe from "../commandeList/commandeList";

export default function CompteUsers(props: {
  TOKEN: string;
  setPage: (value: string) => void;
  logout: () => void;
}) {
  const [page, setPage] = useState<string>("compte");
  const { user } = useContext(UContext);
  const { logout } = props;

  const [users, setUsers] = useState<TUser[]>([]);

  const baseUrl = "http://localhost:3000/users/users";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    },
  };

  useEffect(() => {
    fetch(baseUrl, options)
      .then((response) => response.json())
      .then((donnee) => setUsers(donnee))

      .catch((erreur) => `${erreur}`);
  }, []);

  const test = users?.map((data: TUser, i: number) => (
    <tr>
      <th scope="row">{data?.id}</th>
      <td>{data?.prenom}</td>
      <td>{data?.nom}</td>
      <td>{data?.email}</td>
      <td>{data?.telephone}</td>
      <td>{data?.adresse}</td>
      <td>{data?.codepostal}</td>
      <td>{data?.ville}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger m-1"
          onClick={async function deletePost() {
            await fetch(`http://localhost:3000/produits/${data?.id}`, {
              method: "DELETE",
            });
          }}
        >
          Supprimer
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="container-fluid">
      <h1>Bienvenu-e {user?.prenom}</h1>
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
      {user?.admin === true && <AdminUsers /* setPage={setPage} */ />}
      <CommandeListe />
      {user?.admin === true && <TableauPresations />}
    </div>
  );
}
