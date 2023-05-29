import {
  MutableRefObject,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import "./contact.css";
import Rdv from "./rdv";
import emailjs from "emailjs-com";
import { UContext } from "../../context/userContext";

function Contact() {
  const { user, setUser } = useContext(UContext);

  const [alerteEnvoyee, setAlerteEnvoyee] = useState(false);
  const form = useRef() as MutableRefObject<HTMLFormElement>;
  const [afficherRdv, setAfficherRdv] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Envoyer le formulaire et traiter la réponse ici
    setAlerteEnvoyee(true);
  };
  const MessageComponent = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setAlerteEnvoyee(false);
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div>{alerteEnvoyee && <p>Votre message a bien été envoyé.</p>}</div>
    );
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
  const valeurOption = (event: { target: { value: any } }) => {
    const optionSelectionnee = event.target.value;
    if (optionSelectionnee === "Prise de Rendez-vous") {
      setAfficherRdv(true);
    } else {
      setAfficherRdv(false);
    }
  };

  return (
    <div>
      <img className="image" src="img/logo6or.jpg" alt="logo6or" />
      <div className="container">
        <div className="row">
          <form
            ref={form}
            onSubmit={(event) => {
              sendEmail(event);
              handleSubmit(event);
            }}
            className="col-8"
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
                required
              />
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
                Mail @
              </span>
              <input
                type="text"
                className="form-control border-dark rounded-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                defaultValue={user?.email!}
                name="email"
                required
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
                aria-describedby="inputGroup-sizing-default"
                defaultValue={user?.telephone}
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
                onChange={valeurOption}
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
                  Information/Conseils
                </option>
                <option className=" border-dark rounded-0" value="Autre...">
                  Message libre
                </option>
              </select>
            </div>
            {afficherRdv && <Rdv />}
            <div className="input-group mb-3">
              <span
                className="input-group-text border-dark rounded-0"
                id="inputGroup-sizing-default"
              >
                Message
              </span>
              <textarea
                className="form-control border-dark row-2 rounded-0"
                aria-label="With textarea"
                name="message"
              ></textarea>
            </div>
            <button className="button" type="submit" value={"send"}>
              Envoyer
            </button>
          </form>
          <div className="container col-3">
            <div className="card">
              <div className="card-body contact">
                Adresse: 123 Bis ROute de Créon 33670 Sadirac
              </div>
            </div>
            <div className="card">
              <div className="card-body contact">
                <a href="mailto:latelier6or@gmail.com">
                  {" "}
                  Mail : latelier6or@gmail.com
                </a>
              </div>
            </div>
            <div className="card">
              <div className="card-body contact">Téléphone: 0614153966</div>
            </div>
            <div className="card">
              <div className="card-body contact">
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
          <MessageComponent />
        </div>
      </div>
    </div>
  );
}

export default Contact;
