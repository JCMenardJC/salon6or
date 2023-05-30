import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function UpProd(props: {
  produits: any;
  updateProduit: () => void;
}) {
  const [nom, setNom] = useState(props.produits.nom || "");
  const [description, setDescription] = useState(
    props.produits.description || ""
  );
  const [urlImage, setUrlImage] = useState(props.produits.urlImage || "");
  const [prix, setPrix] = useState(props.produits.prix || null);
  const [newProd, setNewProd] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const modifierProduit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/produits/${props.produits.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom,
            description: description,
            urlImage: urlImage,
            prix: +prix,
          }),
        }
      );

      if (response.ok) {
        setNewProd(await response.json());
        props.updateProduit();
      } else {
        throw new Error("Erreur lors de la modification du produit");
      }
    } catch (error) {}
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Modifier
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modification du produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              {" "}
              <span className="input-group-text border-dark rounded-0">
                Nom
              </span>
              <Form.Control
                type="text"
                name="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              {" "}
              <span className="input-group-text border-dark rounded-0">
                Description
              </span>
              <Form.Control
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <span className="input-group-text border-dark rounded-0">
                Adresse de l'image
              </span>
              <Form.Control
                type="text"
                name="urlImage"
                value={urlImage}
                onChange={(e) => setUrlImage(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <span className="input-group-text border-dark rounded-0">
                Prix
              </span>
              <Form.Control
                type="text"
                name="prix"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={modifierProduit}>
            Modifier
          </Button>
        </Modal.Footer>
        {newProd && <p>Produit modifié avec succès</p>}
        {error && <p>Erreur : {error}</p>}
      </Modal>
    </div>
  );
}
