import { useEffect, useState, useContext } from "react";
import { Tpresta } from "../../types/prestation.type";
import "./prestations.css";
import { UContext } from "../../context/userContext";
import CreerPrestation from "./creerPrestation";
function TableauPresations(props: { setPage: any }) {
  const { user, setUser } = useContext(UContext);
  const [presta, setPresta] = useState<Tpresta[]>([]);

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
    setPresta((prevPresta) => prevPresta?.filter((data) => data.id !== id));
  };

  const liste = presta?.map((data: Tpresta) => (
    <ul className="list-group list-group-flush">
      <li className="list-groupe-item" /* onClick={alert} */>
        <strong>{data.nom}:</strong>&nbsp;{data.description}
        <br /> <strong>DUREE:</strong>&nbsp;{data.temps}
        &emsp; <strong>PRIX:</strong>&nbsp;
        {data.prix}€
        <div>
          {user?.admin ? (
            <>
              <button
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#modalEdit"
              >
                Modifier
              </button>
              <button
                type="button"
                className="btn btn-danger m-1"
                onClick={async () => {
                  await fetch(`http://localhost:3000/prestations/${data.id}`, {
                    method: "DELETE",
                  });
                  handleDelete(data.id);
                  alert("Prestation supprimée");
                }}
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
    </div>
  );
}
export default TableauPresations;
