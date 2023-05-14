import { useContext, useEffect, useState } from "react";
import { UContext } from "../../context/userContext";
import { TCommande } from "../../types/commande.type";
import { Tproduit } from "../../types/produit.type";
import "./commandeList.css";

function CommandeListe() {
  const { user, setUser } = useContext(UContext);
  const [commandes, setCommandes] = useState<TCommande[]>([]);

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
  console.log();

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
    const updatedCommandes = commandes.filter((c) => c.id !== id);
    setCommandes(updatedCommandes);
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
              Supprimer
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
        <button
          className="btn btn-danger"
          onClick={async () => {
            await fetch(`http://localhost:3000/commandes/${commande.id}`, {
              method: "DELETE",
            });
            handleDeleteCommande(commande.id);
            alert("Commande Supprimée!");
          }}
        >
          Supprimer
        </button>
      </td>
      <td>
        {commande.payee === true && (
          <input
            type="checkbox"
            checked={commande.livree}
            onChange={() => handleLivreeChange(commande)}
          />
        )}
      </td>
    </tr>
  ));

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3 className="mt-3 mb-3">Liste des Commandes</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Produits</th>
                <th scope="col">Prix Total</th>
                <th scope="col">Statut</th>
                <th scope="col">Supprimer</th>
                {user?.admin === true && <th scope="col">Livré</th>}
              </tr>
            </thead>
            <tbody>
              {user?.admin === false ? commandesClient : allCommandes}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CommandeListe;
