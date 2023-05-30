import { useEffect, useState, useContext } from "react";
import { UContext } from "../../context/userContext";
import { Tproduit } from "../../types/produit.type";
import CreerProduit from "./creerProduit";
import "./produits.css";
import UpProd from "./updateProduit";
import { Modal, Button } from "react-bootstrap";

export default function ListingProduits(props: { setPage: any }) {
  const { user, setUser } = useContext(UContext);
  const [produit, setProduit] = useState<Tproduit[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );

  const updateProduit = () => {
    fetch(baseUrl, options)
      .then((response) => response.json())
      .then((donnee) => setProduit(donnee))
      .catch((erreur) => `${erreur}`);
  };

  const baseUrl = "http://localhost:3000/produits";
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  useEffect(() => {
    fetch(baseUrl, options)
      .then((response) => response.json())
      .then((donnee) => setProduit(donnee))
      .catch((erreur) => `${erreur}`);
  }, []);
  console.log(produit);

  const handleDelete = (id: number) => {
    setProductIdToDelete(id);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (productIdToDelete) {
      await fetch(`http://localhost:3000/produits/${productIdToDelete}`, {
        method: "DELETE",
      });
      setProduit((prevProduit) =>
        prevProduit?.filter((produits) => produits.id !== productIdToDelete)
      );
      alert("Produit supprimé");
    }
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setProductIdToDelete(null);
    setShowConfirmation(false);
  };

  const liste = produit?.map((produits: Tproduit) => (
    <li className="list-groupe-item" key={produits.id}>
      <strong>{produits.nom}:</strong>&nbsp;{produits.description}
      <br /> <strong>ADRESSE DE L'IMAGE:</strong>&nbsp;{produits.urlImage}
      &emsp; <strong>PRIX:</strong>&nbsp;
      {produits.prix}€
      <div>
        <>
          <UpProd produits={produits} updateProduit={updateProduit} />
          <button
            type="button"
            className="btn btn-danger m-1"
            onClick={() => handleDelete(produits.id)}
          >
            Supprimer
          </button>
        </>
      </div>
    </li>
  ));

  return (
    <div className="mt-2">
      <div className="card rounded-0">
        <div className="card-header">Prestations/Prix</div>
        <ul className="list-group list-group-flush">{liste}</ul>
      </div>
      <CreerProduit produit={produit} setPage={props.setPage} />

      <Modal show={showConfirmation} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
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
  );
}
