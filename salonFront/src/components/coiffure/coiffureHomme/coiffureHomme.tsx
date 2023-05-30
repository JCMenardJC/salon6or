import "../coiffure.css";
import "./coiffureHomme.css";

function CoiffureHomme() {
  return (
    <div>
      <h1>Coiffure Hommes, Barbe & enfants</h1>
      <h5>
        *Passez votre souris sur les images ou cliquez dessus pour plus
        d'informations
      </h5>
      <div className="d-flex justify-content-center">
        <div className="col-2"></div>
        <ul className="stage">
          <li className="scene" id="coiffure1">
            <div className="movie">
              <div className="poster"></div>
              <div className="info">
                <header></header>
                <h3 className="border">La coupe</h3>
                <p className="description">
                  Une coupe homme en coiffure est une technique de stylisme
                  capillaire destinée à façonner les cheveux masculins selon
                  différents styles et longueurs. ~ A partir de 17€ et dure
                  environ 45 minutes. ~
                </p>
              </div>
            </div>
          </li>
          <li className="scene" id="coiffure2">
            <div className="movie">
              <div className="poster"></div>
              <div className="info">
                <header></header>
                <h3 className="border">Le coin barbier</h3>
                <p>
                  Le coin barbier consiste à offrir des services de soins et de
                  stylisme de la barbe, y compris la taille, le rasage et
                  l'entretien. ~ A partir de 20€ sur et dure environ 45 minutes.
                  ~
                </p>
              </div>
            </div>
          </li>
          <li className="scene" id="coiffure3">
            <div className="movie">
              <div className="poster"></div>
              <div className="info">
                <header></header>
                <h3 className="border">La coupe enfant</h3>
                <p>
                  La coupe enfant est une technique de coupe de cheveux adaptée
                  aux enfants, tenant compte de leur âge, de leur type de
                  cheveux et de leur style souhaité. ~ A partir de 12€ sur
                  cheveux courts et dure environ 45 minutes. ~
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default CoiffureHomme;
