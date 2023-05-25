import { useEffect, useState, useContext } from "react";
import { UContext } from "../../context/userContext";
import { Tproduit } from "../../types/produit.type";
import CreerProduit from "./creerProduit";
import "./produits.css";

export default function ListingProduits(props: { setPage: any }) {
  const { user, setUser } = useContext(UContext);
  const [produit, setProduit] = useState<Tproduit[]>([]);

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
    setProduit((prevProduit) => prevProduit?.filter((data) => data.id !== id));
  };

  const liste = produit?.map((data: Tproduit) => (
    <ul className="list-group list-group-flush">
      <li className="list-groupe-item" /* onClick={alert} */>
        <strong>{data.nom}:</strong>&nbsp;{data.description}
        <br /> <strong>ADRESSE DE L'IMAGE:</strong>&nbsp;{data.urlImage}
        &emsp; <strong>PRIX:</strong>&nbsp;
        {data.prix}€
        <div>
          <>
            <button
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#modalEdit"
            >
              Editer
            </button>
            <button
              type="button"
              className="btn btn-danger m-1"
              onClick={async () => {
                await fetch(`http://localhost:3000/produits/${data.id}`, {
                  method: "DELETE",
                });
                handleDelete(data.id);
                alert("Produit supprimée");
              }}
            >
              Supprimer
            </button>
          </>
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
      <CreerProduit produit={produit} setPage={props.setPage} />
    </div>
  );
}
