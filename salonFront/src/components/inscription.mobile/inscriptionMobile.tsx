import { TUser } from "../../types/user.type";
import "./inscription.css";
import { useState } from "react";

function InscriptionMobile(props: { setPage: any }) {
  const newUser: TUser = {
    id: 0,
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    adresse: "",
    codepostal: "",
    ville: "",
    admin: false,
    accessToken: "",
  };

  const [user, setUser] = useState(newUser);
  const urlAddProduit = "http://localhost:3000/users/register";

  const inputChange = (e: React.BaseSyntheticEvent) => {
    const { name, value } = e.target;
    return setUser({ ...user, [name]: value });
  };

  const newUsers = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    console.log(e);

    async function fetchData() {
      console.log(user);

      const response = await fetch(urlAddProduit, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify(user),
      });
      const responseJson = await response.json();
      if (responseJson.message !== "Utilisateur enregistré")
        alert(responseJson.message);
      else {
        props.setPage("register");
      }
    }

    fetchData();
  };
  return (
    <div>
      <h1>Inscription</h1>
      <div className="container">
        <form>
          <div className="input-group mb-3">
            <span
              className="input-group-text border-dark rounded-0"
              id="inputGroup-sizing-default"
            >
              <i className="bi bi-envelope-at"></i>
            </span>
            <input
              onChange={(e) => inputChange(e)}
              type="text"
              className="form-control border-dark rounded-0"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              name="email"
              placeholder="E-mail"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span
              className="input-group-text border-dark rounded-0"
              id="inputGroup-sizing-default"
            >
              <i className="bi bi-lock"></i>{" "}
            </span>
            <input
              onChange={(e) => inputChange(e)}
              type="password"
              className="form-control border-dark rounded-0"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              name="password"
              placeholder="Mot de passe"
              required
            />
            {/* 
            <div className="input-group-append">
              <span
                className="input-group-text"
                  onClick={password_show_hide()}
              >
                <i className="bi bi-eye" id="show_eye"></i>
                <i className="bi bi-eye-slash" id="hide_eye"></i>
              </span>
            </div> */}
          </div>
          <div className="input-group mb-3">
            <span
              className="input-group-text border-dark rounded-0"
              id="inputGroup-sizing-default"
            >
              <i className="bi bi-lock-fill"></i>{" "}
            </span>
            <input
              onChange={(e) => inputChange(e)}
              type="password"
              className="form-control border-dark rounded-0"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              name="confirmPassword"
              placeholder="Confirmez mdp"
              required
            />
          </div>
          <div className="input-group rounded-0 mb-3">
            <span className="input-group-text border-dark rounded-0">Nom</span>
            <input
              onChange={(e) => inputChange(e)}
              type="text"
              aria-label="First name"
              className="form-control border-dark"
              name="nom"
              required
            />
          </div>
          <div className="input-group rounded-0 mb-3">
            <span className="input-group-text border-dark rounded-0">
              Prénom
            </span>
            <input
              onChange={(e) => inputChange(e)}
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
              <i className="bi bi-telephone"></i>
            </span>
            <input
              onChange={(e) => inputChange(e)}
              type="text"
              className="form-control border-dark rounded-0"
              aria-describedby="inputGroup-sizing-default"
              name="telephone"
              placeholder="06 .. .. .. .."
              required
            />
          </div>
          <div className="input-group mb-3">
            <span
              className="input-group-text border-dark rounded-0"
              id="inputGroup-sizing-default"
            >
              <i className="bi bi-pin-map"></i>
            </span>
            <input
              onChange={(e) => inputChange(e)}
              type="text"
              className="form-control border-dark rounded-0"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Adresse"
              name="adresse"
            />
          </div>
          <div className="input-group mb-3">
            <span
              className="input-group-text border-dark rounded-0"
              id="inputGroup-sizing-default"
            >
              CP
            </span>
            <input
              onChange={(e) => inputChange(e)}
              type="text"
              className="form-control border-dark rounded-0"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              name="codepostal"
              placeholder="Code Postale"
            />
          </div>
          <div className="input-group mb-3">
            <span
              className="input-group-text border-dark rounded-0"
              id="inputGroup-sizing-default"
            >
              <i className="bi bi-buildings"></i>
            </span>
            <input
              onChange={(e) => inputChange(e)}
              type="text"
              className="form-control border-dark rounded-0"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              name="ville"
              placeholder="Ville"
            />
          </div>
          <button
            onClick={(e) => {
              newUsers(e);
            }}
            className="btn"
            type="submit"
            id="register"
          >
            S'incrire
          </button>
          <button
            className="btn"
            type="button"
            id="cancel"
            onClick={() => props.setPage("")}
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}
export default InscriptionMobile;
