import { Tproduit } from "../../types/produit.type";
import { useContext, useEffect, useState } from "react";
import "./produits.css";
import { UContext } from "../../context/userContext";

function Produit() {
  const [prod, setProd] = useState<Tproduit[]>();
  const [panier, setPanier] = useState<
    { produit: Tproduit; quantite: number }[]
  >([]);
  const [total, setTotal] = useState(0);
  const [alertePanier, setAlertePanier] = useState("");
  const [paiementEffectue, setPaiementEffectue] = useState(false);

  const { user, setUser } = useContext(UContext);

  const afficherAlertePanier = (nomProduit: string) => {
    setAlertePanier(`${nomProduit} a été ajouté au panier.`);
    setTimeout(() => setAlertePanier(""), 2000);
  };

  const baseUrl = "http://localhost:3000/produits";
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

  const handleAddToCart = (produit: Tproduit, quantite: string) => {
    const parsedQuantite = parseInt(quantite);
    if (isNaN(parsedQuantite)) {
      return;
    }
    setPanier((prevPanier) => [
      ...prevPanier,
      { produit, quantite: parsedQuantite },
    ]);
    afficherAlertePanier(produit.nom);
    calculerTotal();
  };

  const handleRemoveFromCart = (produit: Tproduit) => {
    setPanier((prevPanier) =>
      prevPanier.filter((item) => item.produit.id !== produit.id)
    );
    calculerTotal();
  };
  const handlePayer = async () => {
    if (panier.length > 0) {
      const response = await fetch("http://localhost:3000/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user,
          produits: panier.map(({ produit }) => produit),
          prix_total: total,
          payee: true,
          livree: false,
        }),
      });
      if (response.ok) {
        setPanier([]);
        setTotal(0);
        setAlertePanier("");
        setPaiementEffectue(true);
      }
    }
  };

  const calculerTotal = () => {
    let total = 0;
    panier.forEach(({ produit, quantite }) => {
      total += produit.prix * quantite;
    });
    setTotal(total);
  };

  useEffect(() => {
    fetch(baseUrl, options)
      .then((response) => response.json())
      .then((donnee) => {
        setProd(donnee);
        setTotal(0); // initialiser la variable total
      })
      .catch((erreur) => `${erreur}`);
  }, []);

  const card = prod?.map((data: Tproduit) => (
    <div
      className="card rounded-0 mx-auto my-auto"
      key={data.id}
      style={{ width: 400 }}
    >
      <img
        src={data.urlImage}
        className="card-img-top"
        alt="Fissure in Sandstone"
      />
      <div className="card-body">
        <h5 className="card-title">{data.nom}</h5>
        <p className="card-text2">{data.description}</p>
        <h6>PRIX: {data.prix}€ TTC</h6>
        <div className="form-group">
          <label htmlFor={`quantite-${data.id}`}>Quantité :</label>
          <input
            type="number"
            id={`quantite-${data.id}`}
            className="form-control mt-1"
            defaultValue={1}
            min={1}
            max={10}
          />
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            const quantite = (
              document.getElementById(`quantite-${data.id}`) as HTMLInputElement
            ).value;
            handleAddToCart(data, quantite);
          }}
        >
          Ajouter au panier
        </button>
        <div className="alert">{alertePanier}</div>
      </div>
    </div>
  ));
  const panierTab = panier?.map(
    (data: { produit: Tproduit; quantite: number }) => (
      <tr key={data.produit.id}>
        <th scope="row">{data.produit.id}</th>
        <td>{data.produit.nom}</td>
        <td>{data.quantite}</td>
        <td>{data.produit.prix} €</td>
        <td>{(data.produit.prix * data.quantite).toFixed(2)} €</td>
        <td>
          <button onClick={() => handleRemoveFromCart(data.produit)}>X</button>
        </td>
      </tr>
    )
  );
  console.log(panier);

  return (
    <div>
      <h1>
        L'Atelier 6Or travaille essentiellement avec Végétalement Provence®
      </h1>
      <p>
        Végétalement Provence est née d’une vision de son fondateur il y a 11
        ans : révolutionner le secteur du cheveu et de la peau en réinventant
        tous les codes avec une valeur tenue au corps : les Hommes avant la
        marque, les Hommes qui font la marque. Une quête de sens, une volonté
        d’impact, un esprit d’initiative, l’audace du changement dont a résulté
        notre réponse : la science botanique et la R&D continue au service du
        soin et des problématiques du cheveu et de la peau. Des produits dont
        l’ADN est le soin et qui puisent leur technicité au cœur des actifs
        botaniques et du maniement de la chimie de la nature. Une botanique
        augmentée qui éveille nos sens par l’olfactif et les textures… Une
        expérience unique empreinte d’émotion, une volonté de ré-enchanter le
        quotidien par des concept stores intimistes ; haut-lieux de bien-être et
        d’accompagnement personnalisé de chacun de nos clients et de nos
        partenaires.
      </p>

      <h2 className="enVente">
        Les Produits que vous retrouverez en vente chez L'Atelier 6Or
      </h2>
      <div className="card-container">{card}</div>
      <button
        className="btn btn-primary panier-btn mt-3"
        data-bs-toggle="modal"
        data-bs-target="#panierModal"
        onClick={() => calculerTotal()}
      >
        Voir le panier
        {panier.reduce((total, item) => total + item.quantite, 0) > 0 && (
          <span className="badge">
            {panier.reduce((total, item) => total + item.quantite, 0)}
          </span>
        )}
      </button>

      <div
        className="modal fade"
        id="panierModal"
        tabIndex={-1}
        aria-labelledby="panierModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="panierModalLabel">
                Votre panier
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Réf.</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Quantité</th>
                    <th scope="col">Prix unitaire</th>
                    <th scope="col">Prix total</th>
                  </tr>
                </thead>
                <tbody>{panierTab}</tbody>
                <tfoot>
                  <tr>
                    <th scope="row" colSpan={4}>
                      Total
                    </th>
                    <td>{total.toFixed(2)}€</td>
                    <td>
                      <button onClick={() => calculerTotal()}>
                        <i className="bi bi-arrow-clockwise"></i>
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
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
                onClick={handlePayer}
                disabled={panier.length === 0 || paiementEffectue}
                className="btn btn-primary"
              >
                Payer
              </button>
              {paiementEffectue && <p>Paiement effectué !</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Produit;
