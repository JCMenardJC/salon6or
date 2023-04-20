import { useEffect, useState } from "react";
import { Tpresta } from "../../types/prestation.type";
import "./prestations.css";
function TableauPresations(/* props: { setPage: any; setUpdateProd: any } */) {
  const [prod, setProd] = useState<Tpresta[]>();

  const baseUrl = "http://localhost:3000/prestations";
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  useEffect(() => {
    fetch(baseUrl, options)
      .then((response) => response.json())
      .then((donnee) => setProd(donnee))

      .catch((erreur) => `${erreur}`);
  }, []);
  console.log(prod);

  const liste = prod?.map((data: Tpresta) => (
    <ul className="list-group list-group-flush">
      <li className="list-groupe-item" /* onClick={alert} */>
        <strong>{data.nom}:</strong>&nbsp;{data.description}
        <br /> <strong>DUREE:</strong>&nbsp;{data.temps}
        &emsp; <strong>PRIX:</strong>&nbsp;
        {data.prix}€
      </li>
      <li className="list-group-item"></li>
    </ul>
  ));

  return (
    <div>
      <div className="card rounded-0">
        <div className="card-header">Prestations/Prix</div>
        {liste}
      </div>
    </div>
  );
}
export default TableauPresations;
