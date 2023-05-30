import { useContext, useEffect, useState } from "react";
import { TUser } from "../../../types/user.type";
import { UContext } from "../../../context/userContext";
import UpUser from "./updateUser";
import { Modal, Button } from "react-bootstrap";

function AdminUsers() {
  const { user } = useContext(UContext);
  const [users, setUsers] = useState<TUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

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

  const handleDelete = (id: number) => {
    setUserIdToDelete(id);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (userIdToDelete) {
      await fetch(`http://localhost:3000/produits/${userIdToDelete}`, {
        method: "DELETE",
      });
      setUsers((prevUser) =>
        prevUser?.filter((users) => users?.id !== userIdToDelete)
      );
      alert("Utilisateur supprimé");
    }
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setUserIdToDelete(null);
    setShowConfirmation(false);
  };

  const handleEdit = (user: TUser) => {
    setSelectedUser(user);
  };

  const updateUser = async () => {
    if (selectedUser) {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${selectedUser.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify(selectedUser),
          }
        );

        if (response.ok) {
          alert("Utilisateur mis à jour avec succès");
          // Mettre à jour la liste des utilisateurs ou effectuer d'autres actions si nécessaire
        } else {
          alert("Échec de la mise à jour de l'utilisateur");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const test = users?.map(
    (clients: TUser) =>
      clients?.email !== user?.email && (
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
              onClick={() => handleEdit(clients)}
            >
              Modifier
            </button>
            <button
              type="button"
              className="btn btn-danger m-1"
              onClick={() => handleDelete(clients!.id)}
            >
              Supprimer
            </button>
          </td>
        </tr>
      )
  );

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

      <Modal show={showConfirmation} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Annuler
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={selectedUser !== null} onHide={() => setSelectedUser(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <form>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">
                  Prénom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  value={selectedUser.prenom}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      prenom: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  value={selectedUser.nom}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      nom: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">
                  MAil @
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mail"
                  value={selectedUser.email!}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">
                  Téléphone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="telephone"
                  value={selectedUser.telephone}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      telephone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">
                  Adresse
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="adresse"
                  value={selectedUser.adresse}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      adresse: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">
                  Code Postal
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="codepostal"
                  value={selectedUser.codepostal}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      codepostal: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">
                  Ville
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ville"
                  value={selectedUser.ville}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      ville: e.target.value,
                    })
                  }
                />
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedUser(null)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminUsers;
