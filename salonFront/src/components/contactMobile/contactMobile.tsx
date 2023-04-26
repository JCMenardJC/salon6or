import { MutableRefObject, useContext, useRef, useState } from "react";
/* import "./contact.css";
 */ import emailjs from "emailjs-com";
import { UContext } from "../../context/userContext";
import RdvMobile from "./rdvMobile";

function ContactMobile() {
  const { user, setUser } = useContext(UContext);

  const [alerteEnvoyee, setAlerteEnvoyee] = useState(false);
  const form = useRef() as MutableRefObject<HTMLFormElement>;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Envoyer le formulaire et traiter la réponse ici
    setAlerteEnvoyee(true);
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_xwyp3zl",
        "latelier6or_mailto",
        form.current!,
        "5XNjkSy9_wKZIyuqY"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div>
      <img className="image" src="img/logo6or.jpg" alt="logo6or" />
      <div className="container">
        <div>
          <form
            ref={form}
            onSubmit={(event) => {
              sendEmail(event);
              handleSubmit(event);
            }}
          >
            <div className="input-group rounded-0 mb-3">
              <span className="input-group-text border-dark rounded-0">
                Nom
              </span>
              <input
                type="text"
                aria-label="First name"
                className="form-control border-dark"
                defaultValue={user?.nom}
                name="nom"
                required
              />
            </div>
            <div className="input-group rounded-0 mb-3">
              <span className="input-group-text border-dark rounded-0">
                Prénom
              </span>
              <input
                type="text"
                aria-label="Last name"
                className="form-control border-dark rounded-0"
                defaultValue={user?.prenom}
                name="prenom"
                required
              />
            </div>
            <div className="input-group mb-3">
              <span
                className="input-group-text border-dark rounded-0"
                id="inputGroup-sizing-default"
              >
                <i className="bi bi-envelope-at"></i>
              </span>
              <input
                type="text"
                className="form-control border-dark rounded-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                defaultValue={user?.email!}
                placeholder="Email"
                name="email"
                required
              />
            </div>
            <div className="input-group rounded-0 mb-3">
              <span
                className="input-group-text border-dark rounded-0"
                id="inputGroup-sizing-default"
              >
                <i className="bi bi-telephone"></i>
              </span>
              <input
                type="text"
                className="form-control border-dark rounded-0"
                aria-describedby="inputGroup-sizing-default"
                defaultValue={user?.telephone}
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
                type="text"
                className="form-control border-dark rounded-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                defaultValue={user?.adresse}
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
                type="text"
                className="form-control border-dark rounded-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                defaultValue={user?.codepostal}
                placeholder="Code postal"
                name="cpostal"
              />
            </div>
            <div className="input-group rounded-0 mb-3">
              <span
                className="input-group-text border-dark rounded-0"
                id="inputGroup-sizing-default"
              >
                <i className="bi bi-buildings"></i>
              </span>
              <input
                type="text"
                className="form-control border-dark rounded-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                defaultValue={user?.ville}
                placeholder="Ville"
                name="ville"
              />
            </div>
            <div className="input-group mb-3">
              <label
                className="input-group-text border-dark rounded-0"
                htmlFor="inputGroupSelect01"
              >
                Objet
              </label>
              <select
                className="form-select border-dark rounded-0"
                id="inputGroupSelect01"
                name="objet"
              >
                <option className=" border-dark rounded-0" selected>
                  Choix...
                </option>
                <option
                  id="rdv"
                  className=" border-dark rounded-0"
                  value="Prise de Rendez-vous"
                >
                  Problème prise de Rendez-Vous
                </option>
                <option className=" border-dark rounded-0" value="Information">
                  Infos/Conseils
                </option>
                <option className=" border-dark rounded-0" value="Autre...">
                  Autre...
                </option>
              </select>
            </div>
            <RdvMobile />
            <div className="input-group mb-3">
              <span
                className="input-group-text border-dark rounded-0"
                id="inputGroup-sizing-default"
              >
                <i className="bi bi-pencil-square"></i>
              </span>
              <textarea
                className="form-control border-dark row-2 rounded-0"
                aria-label="With textarea"
                name="message"
                placeholder="Tapez votre message"
              ></textarea>
            </div>
            <button className="button mb-2" type="submit" value={"send"}>
              Envoyer
            </button>
          </form>
          {alerteEnvoyee && <p>Votre formulaire a été envoyé avec succès!</p>}

          <div className="mb-3">
            <div className="card">
              <div className="card-body rounded-0 contact">
                Adresse: 123 Bis ROute de Créon 33670 Sadirac
              </div>
            </div>
            <div className="card">
              <div className="card-body rounded-0 contact">
                Mail : lukophenzo@hotmail.fr
              </div>
            </div>
            <div className="card">
              <div className="card-body rounded-0 contact">
                Téléphone: 0614153966
              </div>
            </div>
            <div className="card">
              <div className="card-body rounded-0 contact">
                <a
                  href="https://www.facebook.com/profile.php?id=100063475093465"
                  target="_blank"
                  className="me-2"
                >
                  <img src="img/facebook.png" alt="facebook" />
                </a>
                <a
                  href="https://www.instagram.com/latelier6or/"
                  target="_blank"
                  className="ms-2"
                >
                  <img src="img/instagram.png" alt="instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactMobile;
