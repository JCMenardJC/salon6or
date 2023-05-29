import { Tproduit } from "../../types/produit.type";
import { useContext, useEffect, useState } from "react";
import "./produits.css";
import { UContext } from "../../context/userContext";

/* // Composant Produit qui affiche les produits disponibles, permet de les ajouter au panier et de passer commande
 */ export default function Produit() {
  const [prod, setProd] = useState<Tproduit[]>();
  const [panier, setPanier] = useState<
    { produit: Tproduit; quantite: number }[]
  >([]);
  const [total, setTotal] = useState(0);
  const [alertePanier, setAlertePanier] = useState("");
  const [paiementEffectue, setPaiementEffectue] = useState(false);
  const { user } = useContext(UContext);

  /*   // Affiche une alerte indiquant que le produit a été ajouté au panier
   */ const afficherAlertePanier = (nomProduit: string) => {
    setAlertePanier(`${nomProduit} a été ajouté au panier.`);
    setTimeout(() => setAlertePanier(""), 2000);
  };

  const baseUrl = "http://localhost:3000/produits";
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  /*   // Récupère les produits disponibles au chargement du composant
   */ useEffect(() => {
    fetch(baseUrl, options)
      .then((response) => response.json())
      .then((donnee) => setProd(donnee))
      .catch((erreur) => `${erreur}`);
  }, []);

  /*   // Ajoute un produit et sa quantité au panier
   */ const handleAddToCart = (produit: Tproduit, quantite: string) => {
    const parsedQuantite = parseInt(quantite);
    if (isNaN(parsedQuantite)) {
      return;
    }

    const prodExist = panier.find((art) => art.produit.id === produit.id);
    if (prodExist) {
      const updatedPanier = panier.map((art) => {
        if (art.produit.id === produit.id) {
          return {
            ...art,
            quantite: art.quantite + parsedQuantite,
          };
        }
        return art;
      });
      setPanier(updatedPanier);
    } else {
      setPanier((prevPanier) => [
        ...prevPanier,
        { produit, quantite: parsedQuantite },
      ]);
    }

    afficherAlertePanier(produit.nom);
    calculerTotal();
  };

  /*   // Supprime un produit du panier
   */ const handleRemoveFromCart = (produit: Tproduit) => {
    setPanier((prevPanier) =>
      prevPanier.filter((art) => art.produit.id !== produit.id)
    );
    calculerTotal();
  };

  /*   // Effectue le paiement en envoyant la commande à la base de données
   */ const handlePayer = async () => {
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

  /*   // Calcule le total du panier
   */ const calculerTotal = () => {
    let total = 0;
    panier.forEach(({ produit, quantite }) => {
      total += produit.prix * quantite;
    });
    setTotal(total);
  };

  /*   // Récupère à nouveau les produits disponibles lorsque le panier est modifié
   */ useEffect(() => {
    fetch(baseUrl, options)
      .then((response) => response.json())
      .then((donnee) => {
        setProd(donnee);
        setTotal(0); /* // réinitialiser la variable total */
      })
      .catch((erreur) => `${erreur}`);
  }, []);

  const card = prod?.map((data: Tproduit) => (
    // Affichage de chaque produit sous forme de carte
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
      <div className="card-body card-content">
        <h5 className="card-title">{data.nom}</h5>
        <p className="card-text2">{data.description}</p>
        <h6>PRIX: {data.prix}€ TTC</h6>
        <div className="form-group">
          <label htmlFor={`quantite-${data.id}`}>Quantité :</label>
          <div className="align-items-end">
            <input
              type="number"
              id={`quantite-${data.id}`}
              className="form-control mt-1"
              defaultValue={1}
              min={1}
              max={10}
              ref={(input) => {
                if (input) {
                  input.value = "1";
                }
              }}
            />
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={() => {
              const quantite = (
                document.getElementById(
                  `quantite-${data.id}`
                ) as HTMLInputElement
              ).value;
              handleAddToCart(data, quantite);
            }}
          >
            Ajouter au panier
          </button>
          <div className="alert">{alertePanier}</div>
        </div>
      </div>
    </div>
  ));

  const panierTab = panier?.map(
    (data: { produit: Tproduit; quantite: number }) => (
      /*       // Affichage des produits dans le panier sous forme de tableau
       */ <tr key={data.produit.id}>
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

  return (
    <div>
      <h1>
        L'Atelier 6Or travaille essentiellement avec Végétalement Provence®
      </h1>
      {/* Description de l'entreprise */}
      <p>
        Végétalement Provence est née d’une vision de son fondateur il y a 11
        ans : révolutionner le secteur du che veu et de la peau en réinventant
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

      <h4>* Connectez-vous pour pouvoir commander</h4>
      <button
        className="btn btn-primary panier-btn my-3"
        data-bs-toggle="modal"
        data-bs-target="#panierModal"
        onClick={() => calculerTotal()}
      >
        Voir le panier
        {panier.reduce((total, art) => total + art.quantite, 0) > 0 && (
          <span className="badge">
            {panier.reduce((total, art) => total + art.quantite, 0)}
          </span>
        )}
      </button>
      {/* Affichage des produits */}
      <div className="card-container">{card}</div>
      <h4>* Connectez-vous pour pouvoir commander</h4>
      {/* Bouton accès panier */}
      <button
        className="btn btn-primary panier-btn mt-3"
        data-bs-toggle="modal"
        data-bs-target="#panierModal"
        onClick={() => calculerTotal()}
      >
        Voir le panier
        {panier.reduce((total, art) => total + art.quantite, 0) > 0 && (
          <span className="badge">
            {panier.reduce((total, art) => total + art.quantite, 0)}
          </span>
        )}
      </button>

      {/* Modal du panier */}
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
                    <th scope="col">Qté</th>
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
                className="btn btn-primary"
                onClick={() => handlePayer()}
              >
                Payer
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message de paiement effectué */}
      {paiementEffectue && (
        <div className="alert alert-success">
          Votre paiement a été effectué avec succès !
        </div>
      )}
    </div>
  );
}
