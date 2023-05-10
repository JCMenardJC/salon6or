import { useState } from "react";
import { TUser } from "../../../types/user.type";

export default function UpUser(props: { clients: TUser }) {
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
              {" "}
              <div className="input-group mb-3">
                <span
                  className="input-group-text border-dark rounded-0"
                  id="inputGroup-sizing-default"
                >
                  Mail @
                </span>
                <input
                  /* onChange={(e) => inputChange(e)} */
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  name="email"
                  defaultValue={props.clients?.email || undefined}
                  required
                />
              </div>
              <div className="input-group rounded-0 mb-3">
                <span className="input-group-text border-dark rounded-0">
                  Nom et Prénom
                </span>
                <input
                  /* onChange={(e) => inputChange(e)} */
                  type="text"
                  aria-label="First name"
                  className="form-control border-dark"
                  name="nom"
                  defaultValue={props.clients?.nom}
                  required
                />
                <input
                  /* onChange={(e) => inputChange(e)} */
                  type="text"
                  aria-label="Last name"
                  className="form-control border-dark rounded-0"
                  name="prenom"
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
                  /* onChange={(e) => inputChange(e)} */
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-describedby="inputGroup-sizing-default"
                  name="telephone"
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
                  /* onChange={(e) => inputChange(e)} */
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  name="adresse"
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
                  /* onChange={(e) => inputChange(e)} */
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  name="codepostal"
                />
                <span
                  className="input-group-text border-dark rounded-0"
                  id="inputGroup-sizing-default"
                >
                  Ville
                </span>
                <input
                  /* onChange={(e) => inputChange(e)} */
                  type="text"
                  className="form-control border-dark rounded-0"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  name="ville"
                />
              </div>
              <button
                /*    onClick={(e) => {
                      newUsers(e);
                    }} */
                className="btn"
                type="submit"
                id="register"
              >
                S'incrire
              </button>
              <button
                className="btn ms-5"
                type="button"
                id="cancel" /* 
                    onClick={() => props.setPage("")} */
              >
                Annuler
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
