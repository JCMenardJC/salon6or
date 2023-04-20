import { MutableRefObject, useContext, useRef, useState } from "react";
import "./contact.css";
import Rdv from "./rdv";
import emailjs from "emailjs-com";
import { UContext } from "../../context/userContext";

function Contact() {
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
      <form
        ref={form}
        onSubmit={(event) => {
          sendEmail(event);
          handleSubmit(event);
        }}
      >
        <div className="input-group rounded-0 mb-3">
          <span className="input-group-text border-dark rounded-0">
            Nom et Prénom
          </span>
          <input
            type="text"
            aria-label="First name"
            className="form-control border-dark"
            defaultValue={user?.nom}
            name="nom"
          />
          <input
            type="text"
            aria-label="Last name"
            className="form-control border-dark rounded-0"
            defaultValue={user?.prenom}
            name="prenom"
          />
        </div>
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
            defaultValue={user?.email!}
            name="email"
          />
          <span
            className="input-group-text border-dark rounded-0"
            id="inputGroup-sizing-default"
          >
            Téléphone
          </span>
          <input
            type="text"
            className="form-control border-dark rounded-0"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            defaultValue={"0" + user?.telephone}
            name="telephone"
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
            defaultValue={user?.adresse}
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
            defaultValue={user?.codepostal}
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
            defaultValue={user?.ville}
            name="ville"
          />
        </div>
        <div className="input-group mb-3">
          <label
            className="input-group-text border-dark rounded-0"
            htmlFor="inputGroupSelect01"
          >
            Objet du Message
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
              Prise de Rendez-Vous
            </option>
            <option className=" border-dark rounded-0" value="Information">
              Information/Conseils
            </option>
            <option className=" border-dark rounded-0" value="Autre...">
              Autre...
            </option>
          </select>
        </div>
        <Rdv />
        <div className="input-group mb-3">
          <span
            className="input-group-text border-dark rounded-0"
            id="inputGroup-sizing-default"
          >
            Message
          </span>
          <textarea
            className="form-control border-dark rounded-0"
            aria-label="With textarea"
            name="message"
          ></textarea>
        </div>
        <button className="button" type="submit" value={"send"}>
          Envoyer
        </button>
      </form>
      {alerteEnvoyee && <p>Votre formulaire a été envoyé avec succès!</p>}
    </div>
  );
}

export default Contact;
