import { useEffect, useState, useContext } from "react";
import { Tpresta } from "../../types/prestation.type";
import "./prestations.css";
import { UContext } from "../../context/userContext";
import CreerPrestation from "./creerPrestation";
import UpPresta from "./updatePresta";
import { Modal, Button } from "react-bootstrap";

function TableauPresations(props: { setPage: any }) {
  const { user } = useContext(UContext);
  const [presta, setPresta] = useState<Tpresta[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [prestaIdToDelete, setPrestaIdToDelete] = useState<number | null>(null);

  const updatePrestation = () => {
    fetch(baseUrl, options)
      .then((response) => response.json())
      .then((donnee) => setPresta(donnee))
      .catch((erreur) => `${erreur}`);
  };

  const baseUrl = "http://localhost:3000/prestations";
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  useEffect(() => {
    fetch(baseUrl, options)
      .then((response) => response.json())
      .then((donnee) => setPresta(donnee))

      .catch((erreur) => `${erreur}`);
  }, []);
  console.log(presta);

  const handleDelete = (id: number) => {
    setPrestaIdToDelete(id);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (prestaIdToDelete) {
      await fetch(`http://localhost:3000/prestations/${prestaIdToDelete}`, {
        method: "DELETE",
      });
      setPresta((prevPresta) =>
        prevPresta?.filter((presta) => presta.id !== prestaIdToDelete)
      );
      alert("Prestation supprimée");
    }
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setPrestaIdToDelete(null);
    setShowConfirmation(false);
  };
  const liste = presta?.map((prestation: Tpresta) => (
    <ul className="list-group list-group-flush">
      <li className="list-groupe-item" /* onClick={alert} */>
        <strong>{prestation.nom}:</strong>&nbsp;{prestation.description}
        <br /> <strong>DUREE:</strong>&nbsp;{prestation.temps}
        &emsp; <strong>PRIX:</strong>&nbsp;
        {prestation.prix}€
        <div>
          {user?.admin ? (
            <>
              <UpPresta
                prestation={prestation}
                presta={presta}
                updatePresta={updatePrestation}
              />
              <button
                type="button"
                className="btn btn-danger m-1"
                onClick={() => handleDelete(prestation.id)}
              >
                Supprimer
              </button>
            </>
          ) : null}
        </div>
      </li>
      <li className="list-group-item"></li>
    </ul>
  ));

  return (
    <div className="mt-2">
      <div className="card rounded-0">
        <div className="card-header">Prestations/Prix</div>
        {liste}
      </div>
      {user?.admin ? (
        <CreerPrestation presta={presta} setPage={props.setPage} />
      ) : null}

      <Modal show={showConfirmation} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Êtes-vous sûr de vouloir supprimer cette prestation ?</p>
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
export default TableauPresations;
