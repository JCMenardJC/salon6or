import { useState } from "react";
import { TUser } from "../../../types/user.type";

export default function UpUser(props: { clients: TUser }) {
  const [email, setEmail] = useState(props.clients?.email || "");
  const [nom, setNom] = useState(props.clients?.nom || "");
  const [prenom, setPrenom] = useState(props.clients?.prenom || "");
  const [telephone, setTelephone] = useState(props.clients?.telephone || "");
  const [adresse, setAdresse] = useState(props.clients?.adresse || "");
  const [codePostal, setCodePostal] = useState(props.clients?.codepostal || "");
  const [ville, setVille] = useState(props.clients?.ville || "");

  return (
    <form action="">
      <div
        className="modal fade"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        id="modalEdit"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modification de la Fiche Client
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
                >
                  Mail @
                </span>
                <input
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group rounded-0 mb-3">
                <span className="input-group-text border-dark rounded-0">
                  Nom et Prénom
                </span>
                <input
                  type="text"
                  aria-label="First name"
                  className="form-control border-dark"
                  name="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
                <input
                  type="text"
                  aria-label="Last name"
                  className="form-control border-dark rounded-0"
                  name="prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text border-dark rounded-0"
                  id="inputGroup-sizing-default"
                >
                  Téléphone
                </span>
                <input
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-describedby="inputGroup-sizing-default"
                  name="telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text border-dark rounded-0"
                  id="inputGroup-sizing-default"
                >
                  Adresse
                </span>
                <input
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  name="adresse"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text border-dark rounded-0"
                  id="inputGroup-sizing-default"
                >
                  Code Postal
                </span>
                <input
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  name="codepostal"
                  value={codePostal}
                  onChange={(e) => setCodePostal(e.target.value)}
                />
                <span
                  className="input-group-text border-dark rounded-0"
                  id="inputGroup-sizing-default"
                >
                  Ville
                </span>
                <input
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  name="ville"
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                annuler
              </button>
              <button type="button" className="btn btn-primary">
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
