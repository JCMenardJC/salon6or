import "../coiffure.css";
import "./coiffureFemme.css";
function CoiffureFemme() {
  return (
    <div>
      <h1>Coiffure Femmes</h1>
      <h5>
        *Passez votre souris sur les images ou cliquez dessus pour plus
        d'informations
      </h5>
      <div className="container centered-list">
        <ul className="stage">
          <li className="scene" id="coupef">
            <div className="movie">
              <div className="poster"></div>
              <div className="info">
                <header></header>
                <h3 className="border">La couleur</h3>
                <p className="description">
                  Une couleur en coiffure fait référence à la teinte appliquée
                  sur les cheveux pour changer leur apparence, qu'il s'agisse
                  d'une couleur naturelle, d'une coloration fantaisiste ou d'une
                  modification de la couleur existante. ~ A partir de 45€ sur
                  cheveux courts et dure environ 45 minutes. ~
                </p>
              </div>
            </div>
          </li>
          <li className="scene">
            <div className="movie">
              <div className="poster"></div>
              <div className="info">
                <header></header>
                <h3 className="border">Le Balayage</h3>
                <p>
                  Le balayage est une coloration partielle consistant à teindre
                  certaines parties de la chevelure, en parsemant les cheveux de
                  très fines mèches un ou deux tons plus clairs que la couleur
                  de base. ~ A partir de 65€ sur cheveux courts et dure environ
                  60 minutes. ~
                </p>
              </div>
            </div>
          </li>
          <li className="scene">
            <div className="movie">
              <div className="poster"></div>
              <div className="info">
                <header></header>
                <h3 className="border">L'Ombré hair</h3>
                <p>
                  L'ombré hair est une technique de coloration des cheveux
                  créant une transition subtile de la racine aux pointes pour un
                  effet d'éclaircissement naturel.~ A partir de 78€ sur cheveux
                  courts pour 2h35.~
                </p>
              </div>
            </div>
          </li>
          <li className="scene">
            <div className="movie">
              <div className="poster"></div>
              <div className="info">
                <header></header>
                <h3 className="border">Les Mèches</h3>
                <p>
                  Les mèches en coiffure sont des sections de cheveux colorées
                  ou éclaircies de manière sélective pour créer des contrastes
                  ou des reflets.~ A partir de 93€ sur cheveux courts et dure
                  environ 3h05. ~
                </p>
              </div>
            </div>
          </li>
          <li className="scene">
            <div className="movie">
              <div className="poster"></div>
              <div className="info">
                <header></header>
                <h3 className="border">Le Cataplasme couleur végétale</h3>
                <p>
                  Un cataplasme couleur végétale en coiffure est une méthode de
                  coloration des cheveux utilisant des produits à base de
                  plantes pour obtenir des teintes naturelles et douces, sans
                  produits chimiques agressifs.~ A partir de 70€ sur cheveux
                  courts et dure environ 3 heures. ~
                </p>
              </div>
            </div>
          </li>
          <li className="scene">
            <div className="movie">
              <div className="poster"></div>
              <div className="info">
                <header></header>
                <h3 className="border">Le Lissage</h3>
                <p>
                  Un lissage en coiffure consiste à utiliser des produits et des
                  outils spéciaux pour rendre les cheveux raides, lisses et
                  dépourvus de frisottis. ~ A partir de 180€ sur cheveux courts
                  et dure environ 3 heures. ~
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default CoiffureFemme;
