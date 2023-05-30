import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Tpresta } from "../../types/prestation.type";

export default function UpPresta(props: {
  prestation: any;
  presta: any;
  updatePresta: () => void;
}) {
  const [nom, setNom] = useState(props.prestation?.nom || "");
  const [description, setDescription] = useState(
    props.prestation?.description || ""
  );
  const [temps, setTemps] = useState(props.prestation?.temps || "");
  const [prix, setPrix] = useState(props.prestation?.prix || null);
  const [newPresta, setNewPresta] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const modifierPrestation = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/prestations/${props.prestation?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom,
            description: description,
            temps: temps,
            prix: prix,
          }),
        }
      );

      if (response.ok) {
        setNewPresta(await response.json());
        props.updatePresta();
      } else {
        throw new Error("Erreur lors de la modification de la prestation");
      }
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <button type="button" className="btn" onClick={handleOpenModal}>
        Modifier
      </button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modification de la prestation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <span className="input-group-text border-dark rounded-0">Nom</span>
            <input
              type="text"
              className="form-control border-dark rounded-0"
              name="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div className="input-group rounded-0 mb-3">
            <span className="input-group-text border-dark rounded-0">
              Description
            </span>
            <input
              type="text"
              className="form-control border-dark"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text border-dark rounded-0">
              Durée
            </span>
            <input
              type="text"
              className="form-control border-dark rounded-0"
              name="temps"
              value={temps}
              onChange={(e) => setTemps(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text border-dark rounded-0">Prix</span>
            <input
              type="text"
              className="form-control border-dark rounded-0"
              name="prix"
              value={+prix!}
              onChange={(e) => setPrix(+e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={modifierPrestation}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
      {newPresta && <p>Prestation modifiée avec succès</p>}
      {error && <p>Erreur : {error}</p>}
    </>
  );
}
