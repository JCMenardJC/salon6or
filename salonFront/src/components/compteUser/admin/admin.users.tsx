import { useContext, useEffect, useState } from "react";
import { TUser } from "../../../types/user.type";
import { UContext, UserInit } from "../../../context/userContext";
import { AuthContext } from "../../../context/authContext";
import { table } from "console";
import UpUser from "./updateUser";

function AdminUsers(/* setPage: any, setUpdateProd: any */) {
  const { user, setUser } = useContext(UContext);
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
      .then((donnee) => {
        console.log(donnee);

        setUsers(donnee);
      })

      .catch((erreur) => `${erreur}`);
  }, []);
  console.log(users);

  const handleDelete = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user!.id !== id));
  };

  const test = users?.map((clients: TUser, i: number) => (
    <tr key={clients?.id}>
      <th scope="row">{clients?.id}</th>
      <td>{clients?.prenom}</td>
      <td>{clients?.nom}</td>
      <td>{clients?.email}</td>
      <td>{clients?.telephone}</td>
      <td>{clients?.adresse}</td>
      <td>{clients?.codepostal}</td>
      <td>{clients?.ville}</td>
      <td>
        <button
          type="button"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#modalEdit"
        >
          Editer
        </button>
        <UpUser clients={clients} />
        <button
          type="button"
          className="btn btn-danger m-1"
          onClick={async () => {
            await fetch(`http://localhost:3000/users/${clients?.id}`, {
              method: "DELETE",
            });
            handleDelete(clients!.id);
            alert("utilisateur supprimé");
          }}
        >
          Supprimer
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="mt-2">
      <div className="card rounded-0">
        <div className="card-header">Listing clientel</div>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-sm">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Prénom</th>
                <th scope="col">Nom</th>
                <th scope="col">Email</th>
                <th scope="col">Téléphone</th>
                <th scope="col">Adresse</th>
                <th scope="col">Code Postal</th>
                <th scope="col">Ville</th>
              </tr>
            </thead>
            <tbody>{test}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
