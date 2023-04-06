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

  const test = prod?.map((data: Tpresta, i: number) => (
    <tr>
      <th scope="row">{data.nom}</th>
      <td>{data.description}</td>
      <td>{data.temps}</td>
      <td>{data.prix}</td>
    </tr>
  ));

  return (
    <div className="m-5">
      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Description</th>
            <th scope="col">Durée</th>
            <th scope="col">Prix en €</th>
          </tr>
        </thead>
        <tbody>{test}</tbody>
      </table>
    </div>
  );
}
export default TableauPresations;
