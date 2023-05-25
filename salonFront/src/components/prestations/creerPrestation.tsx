import React, { useState, useContext } from "react";
import { Tpresta } from "../../types/prestation.type";
import { UContext } from "../../context/userContext";

function CreerPrestation(props: { presta: any; setPage: any }) {
  const { user } = useContext(UContext);
  const newPresta: Tpresta = {
    id: 0,
    nom: "",
    description: "",
    prix: 0,
    temps: "",
  };

  const [prestas, setPrestas] = useState<Tpresta>(newPresta);
  const urlAddProduit = "http://localhost:3000/prestations";
  console.log(prestas);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrestas((prevState) => ({
      ...prevState,
      [name]: name === "prix" ? +value : value,
    }));
  };

  const newPrestas = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(urlAddProduit, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(prestas),
      });

      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.message !== "Success") {
        alert(responseJson.message);
      } else {
        props.presta.push(prestas);
        props.setPage("presta");
        alert("Une nouvelle prestation a bien été ajoutée!");
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'ajout de la prestation :",
        error
      );
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#prestaModal"
      >
        Ajouter une prestation
      </button>
      <div
        className="modal fade"
        id="prestaModal"
        tabIndex={-1}
        aria-labelledby="prestaModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Création d'une prestation</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  onChange={inputChange}
                  className="form-control my-2"
                  type="text"
                  placeholder="Nom"
                  name="nom"
                  aria-label="default input example"
                />
                <input
                  onChange={inputChange}
                  className="form-control my-2"
                  type="text"
                  placeholder="Description"
                  name="description"
                  aria-label="default input example"
                />
                <input
                  onChange={inputChange}
                  className="form-control my-2"
                  type="text"
                  placeholder="Temps"
                  name="temps"
                  aria-label="default input example"
                />
                <input
                  onChange={inputChange}
                  className="form-control my-2"
                  type="number"
                  placeholder="Prix"
                  name="prix"
                  aria-label="default input example"
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Annuler
              </button>
              <button
                onClick={newPrestas}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreerPrestation;
