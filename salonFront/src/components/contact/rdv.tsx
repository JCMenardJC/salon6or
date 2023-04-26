import { useState, useEffect } from "react";
import { Tpresta } from "../../types/prestation.type";

function Rdv() {
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

  const option = prod?.map((data: Tpresta) => (
    <option value={data.nom}>
      <strong>{data.nom}:</strong>
      &ensp;
      {data.description}
      &emsp;<strong>DUREE:</strong>
      &ensp;
      {data.temps}
      &emsp;
      <strong>PRIX:</strong>
      &ensp;
      {data.prix}€
    </option>
  ));

  console.log(prod);
  return (
    <div>
      <div className="input-group mb-3 rounded-0">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          Prestations
        </label>
        <select className="form-select" id="inputGroupSelect01" name="presta">
          <option selected>Choix...</option>
          {option}
        </select>
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="dateRdv">
          Date et heure du rendez-vous
        </label>
        <input
          placeholder="jj/mm/aaaa"
          type="datetime-local"
          className="form-control"
          id="dateRdv"
          name="rdv"
        />
      </div>
    </div>
  );
}
export default Rdv;
