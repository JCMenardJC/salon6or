import "./inscription.css";

function Inscription() {
  return (
    <div>
      <h1>Inscription</h1>
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <form className="col-8">
            <div className="input-group mb-3">
              <span
                className="input-group-text border-dark rounded-0"
                id="inputGroup-sizing-default"
              >
                Mail @
              </span>
              <input
                type="text"
                className="form-control border-dark rounded-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                name="email"
                required
              />
            </div>
            <div className="input-group mb-3">
              <span
                className="input-group-text border-dark rounded-0"
                id="inputGroup-sizing-default"
              >
                Mot de passe
              </span>
              <input
                type="password"
                className="form-control border-dark rounded-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                name="password"
                required
              />
              <div className="input-group-append">
                <span
                  className="input-group-text" /* 
                  onClick={password_show_hide()} */
                >
                  <i className="bi bi-eye" id="show_eye"></i>
                  <i className="bi bi-eye-slash" id="hide_eye"></i>
                </span>
              </div>
            </div>
            <div className="input-group mb-3">
              <span
                className="input-group-text border-dark rounded-0"
                id="inputGroup-sizing-default"
              >
                Confirmez le mot de passe
              </span>
              <input
                type="password"
                className="form-control border-dark rounded-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                name="confirmPassword"
                required
              />
            </div>
            <div className="input-group rounded-0 mb-3">
              <span className="input-group-text border-dark rounded-0">
                Nom et Prénom
              </span>
              <input
                type="text"
                aria-label="First name"
                className="form-control border-dark"
                name="nom"
                required
              />
              <input
                type="text"
                aria-label="Last name"
                className="form-control border-dark rounded-0"
                name="prenom"
                required
              />
            </div>
            <div className="input-group mb-3">
              <span
                className="input-group-text border-dark rounded-0"
                id="inputGroup-sizing-default"
              >
                Téléphone
              </span>
              <input
                type="text"
                className="form-control border-dark rounded-0"
                aria-describedby="inputGroup-sizing-default"
                name="telephone"
                required
              />
            </div>
            <div className="input-group mb-3">
              <span
                className="input-group-text border-dark rounded-0"
                id="inputGroup-sizing-default"
              >
                Adresse
              </span>
              <input
                type="text"
                className="form-control border-dark rounded-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                name="adresse"
              />
            </div>
            <div className="input-group mb-3">
              <span
                className="input-group-text border-dark rounded-0"
                id="inputGroup-sizing-default"
              >
                Code Postal
              </span>
              <input
                type="text"
                className="form-control border-dark rounded-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                name="cpostal"
              />
              <span
                className="input-group-text border-dark rounded-0"
                id="inputGroup-sizing-default"
              >
                Ville
              </span>
              <input
                type="text"
                className="form-control border-dark rounded-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                name="ville"
              />
            </div>
            <button className="btn" type="submit" id="register">
              S'incrire
            </button>
            <button className="btn ms-5" type="button" id="cancel">
              Annuler
            </button>
          </form>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}
export default Inscription;
