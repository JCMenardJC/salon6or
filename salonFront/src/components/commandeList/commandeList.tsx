import { useContext, useEffect, useState } from "react";
import { UContext } from "../../context/userContext";
import { TCommande } from "../../types/commande.type";
import { Tproduit } from "../../types/produit.type";
import "./commandeList.css";
import { Modal, Button } from "react-bootstrap";

function CommandeListe(props: { windowWidth: any }) {
  const { user, setUser } = useContext(UContext);
  const [commandes, setCommandes] = useState<TCommande[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [commandeIdToDelete, setCommandeIdToDelete] = useState<number | null>(
    null
  );
  const baseUrl = "http://localhost:3000/commandes";
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
        setCommandes(donnee);
      })

      .catch((erreur) => `${erreur}`);
  }, []);
  console.log(commandes);

  const handleLivreeChange = (commande: TCommande) => {
    const updatedCommandes = commandes.map((c) => {
      if (c.id === commande.id) {
        return { ...c, livree: !c.livree };
      }
      return c;
    });
    setCommandes(updatedCommandes);
  };

  const handleDeleteCommande = (id: number) => {
    setCommandeIdToDelete(id);
    setShowConfirmation(true);
  };

  const commandesClient = commandes?.map(
    (commande: TCommande, i: number) =>
      commande.user?.id === user?.id && (
        <tr key={commande?.id}>
          <th scope="row">{commande?.id}</th>
          <td>
            {commande?.produits.map((produit: Tproduit, i: number) => (
              <p className="prod"> {produit.nom}</p>
            ))}
          </td>
          <td>{parseFloat(commande?.prix_total).toFixed(2)}</td>
          <td>
            {commande.payee === true && commande.livree === false
              ? "Payée, Non livrée"
              : "Payée, Livrée"}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteCommande(commande.id)}
            >
              {props.windowWidth > 690 ? (
                "Supprimer"
              ) : (
                <i className="bi bi-trash3"></i>
              )}
            </button>
          </td>
        </tr>
      )
  );
  const allCommandes = commandes?.map((commande: TCommande, i: number) => (
    <tr key={commande?.id}>
      <th scope="row">{commande?.id}</th>
      <td>
        {commande?.produits.map((produit: Tproduit, i: number) => (
          <p className="prod"> {produit.nom}</p>
        ))}
      </td>
      <td>{parseFloat(commande?.prix_total).toFixed(2)}</td>
      <td>
        {commande.payee === true && commande.livree === false
          ? "Payée, Non livrée"
          : "Payée, Livrée"}
      </td>
      <td>
        {commande.user?.prenom}
        {commande.user?.nom}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={async () => handleDeleteCommande(commande.id)}
        >
          {props.windowWidth > 690 ? (
            "Supprimer"
          ) : (
            <i className="bi bi-trash3"></i>
          )}
        </button>
      </td>
      <td>
        {commande.payee === true && (
          <input
            type="checkbox"
            checked={commande.livree}
            onChange={async () => {
              handleLivreeChange(commande);
              commande.livree
                ? await fetch(
                    `http://localhost:3000/commandes/${commande.id}`,
                    {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        livree: false,
                      }),
                    }
                  )
                : await fetch(
                    `http://localhost:3000/commandes/${commande.id}`,
                    {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        livree: true,
                      }),
                    }
                  );
              alert("Statut commande modifié");
            }}
          />
        )}
      </td>
    </tr>
  ));

  const confirmDelete = async () => {
    if (commandeIdToDelete) {
      await fetch(`http://localhost:3000/produits/${commandeIdToDelete}`, {
        method: "DELETE",
      });
      setCommandes((prevCommande) =>
        prevCommande?.filter((commande) => commande.id !== commandeIdToDelete)
      );
      alert("Produit supprimé");
    }
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setCommandeIdToDelete(null);
    setShowConfirmation(false);
  };
  return (
    <div>
      {/*       <div className="row">
        <div className="col-md-12"> */}
      <h3 className="CList mt-3 mb-3">Liste des Commandes</h3>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Produits</th>
              <th scope="col">Prix Total</th>
              <th scope="col">Statut</th>
              {user?.admin ? <th scope="col">Client</th> : null}
              <th scope="col">
                {props.windowWidth > 690 ? (
                  "Supprimer"
                ) : (
                  <i className="bi bi-trash3"></i>
                )}
              </th>
              {user?.admin ? <th scope="col">Livré</th> : null}
            </tr>
          </thead>
          <tbody>
            {user?.admin === false ? commandesClient : allCommandes}
          </tbody>
        </table>
      </div>

      <Modal show={showConfirmation} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Êtes-vous sûr de vouloir supprimer cette commande ?</p>
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
    </div>
    /*       </div>
    </div> */
  );
}

export default CommandeListe;
