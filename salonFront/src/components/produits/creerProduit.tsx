import React, { useState, useContext } from "react";
import { UContext } from "../../context/userContext";
import { Tproduit } from "../../types/produit.type";

export default function CreerProduit(props: { produit: any; setPage: any }) {
  const { user } = useContext(UContext);
  const newProduit: Tproduit = {
    id: 0,
    nom: "",
    description: "",
    prix: 0,
    urlImage: "",
    quantity: 0,
  };

  const [prod, setProd] = useState<Tproduit>(newProduit);
  const urlAddProduit = "http://localhost:3000/produits";
  console.log(prod);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProd((prevState) => ({
      ...prevState,
      [name]: name === "prix" ? parseFloat(value) : value,
    }));
  };

  const newProduits = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(urlAddProduit, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(prod),
      });

      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.message !== "Le Produit est ajouté avec succès") {
        alert(responseJson.message);
      } else {
        props.produit.push(prod);
        props.setPage("boutique");
        alert("Un nouveau produit a été ajouté à la boutique!");
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'ajout du produit :",
        error
      );
    }
  };
  return (
    <div>
      <button
        type="button"
        className="btn my-3"
        data-bs-toggle="modal"
        data-bs-target="#prodModal"
      >
        Ajouter un produit
      </button>
      <div
        className="modal fade"
        id="prodModal"
        tabIndex={-1}
        aria-labelledby="prodModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Création d'un produit</h5>
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
                  placeholder="Adresse de l'image"
                  name="urlImage"
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
                onClick={newProduits}
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
