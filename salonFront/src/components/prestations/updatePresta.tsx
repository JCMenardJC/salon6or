import { useState } from "react";

export default function UpPresta(props: {
  prestation: any;
  presta: any;
  updatePresta: () => void;
}) {
  const [nom, setNom] = useState(props.prestation.nom || "");
  const [description, setDescription] = useState(
    props.prestation.description || ""
  );
  const [temps, setTemps] = useState(props.prestation.temps || "");
  const [prix, setPrix] = useState(props.prestation.prix || null);
  const [newPresta, setNewPresta] = useState(null);
  const [error, setError] = useState(null);

  const modifierPrestation = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/prestations/${props.prestation.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom,
            description: description,
            temps: temps,
            prix: +prix,
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
                  defaultValue={props.prestation.nom}
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
                  defaultValue={props.prestation.description}
                />
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text border-dark rounded-0"
                  id="inputGroup-sizing-default"
                >
                  Durée
                </span>
                <input
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-describedby="inputGroup-sizing-default"
                  name="temps"
                  value={temps}
                  onChange={(e) => setTemps(e.target.value)}
                  defaultValue={props.prestation.temps}
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
                  defaultValue={props.prestation.prix}
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
                onClick={modifierPrestation}
              >
                Modifier
              </button>
            </div>
            {newPresta && <p>Prestation modifiée avec succès</p>}
            {error && <p>Erreur : {error}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}
