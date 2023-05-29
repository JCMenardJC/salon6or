import { useState } from "react";

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
        throw new Error("Erreur lors de la modification de la prestation");
      }
    } catch (error) {}
  };

  return (
    <form action="">
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#modalPresta"
      >
        Modifier
      </button>
      <div
        className="modal fade"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        id="modalPresta"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modification de la prestation
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span
                  className="input-group-text border-dark rounded-0"
                  id="inputGroup-sizing-default"
                  defaultValue={props.produits.nom}
                >
                  Nom
                </span>
                <input
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
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
                  aria-label="First name"
                  className="form-control border-dark"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  defaultValue={props.produits.description}
                />
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text border-dark rounded-0"
                  id="inputGroup-sizing-default"
                >
                  Lien de l'image
                </span>
                <input
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-describedby="inputGroup-sizing-default"
                  name="urlImage"
                  value={urlImage}
                  onChange={(e) => setUrlImage(e.target.value)}
                  defaultValue={props.produits.temps}
                />
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text border-dark rounded-0"
                  id="inputGroup-sizing-default"
                >
                  Prix
                </span>
                <input
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  name="prix"
                  value={prix}
                  defaultValue={props.produits.prix}
                  onChange={(e) => setPrix(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={modifierProduit}
              >
                Modifier
              </button>
            </div>
            {newProd && <p>Produit modifiée avec succès</p>}
            {error && <p>Erreur : {error}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}
