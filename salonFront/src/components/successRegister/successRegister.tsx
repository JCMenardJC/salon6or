import { Login } from "../login/login";
import "./successRegister.css";

function SuccessRegister() {
  return (
    <>
      <div className="item-align-center">
        <div className="card col-7">
          <img src="img/success.jpg" className="card-img-top" alt="success" />
          <div className="card-body">
            <h5 className="card-title">Félicitation!</h5>
            <p className="card-text" id="successText">
              Vous vous êtes inscrit-e avec succès! Veuillez vous connecter ou
              retourner à la page d'accueil pour continuer.
            </p>
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}
export default SuccessRegister;
