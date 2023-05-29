import "./App.css";
import Accueil from "./components/accueil/accueil";
import CoiffureFemme from "./components/coiffure/coiffureFemme/coiffureFemme";
import CoiffureHomme from "./components/coiffure/coiffureHomme/coiffureHomme";
import TableauPresations from "./components/prestations/prestations";
import Contact from "./components/contact/contact";
import { Login } from "./components/login/login";
import CompteUsers from "./components/compteUser/compteUser";
import AccueilMobile from "./components/accueil-mobile/accueil-mobile";
import { UContext, UserInit } from "./context/userContext";
import Inscription from "./components/inscription/inscription";
import ContactMobile from "./components/contactMobile/contactMobile";
import SuccessRegister from "./components/successRegister/successRegister";
import RendezVous from "./components/rendezVous/rendezVous";
import RendezVousMedium from "./components/rendezVous.medium/rendezVous.medium";
import RendezVousMobile from "./components/rendezVous.mobile/rendezVousMobile";
import InscriptionMobile from "./components/inscription.mobile/inscriptionMobile";
import Produit from "./components/produits/produits";
import { useContext, useEffect, useState } from "react";

/* // Ce fichier contient le composant principal de l'application React.
// Il définit l'ensemble des composants et des fonctionnalités de l'application.
 */
function App() {
  const { user, setUser } = useContext(UContext);
  const TOKEN = user?.accessToken;
  const [page, setPage] = useState<string>("");
  const logout = () => {
    localStorage.clear();
    setUser(UserInit);
    window.location.reload();
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hide = user?.accessToken !== undefined;

  /*   // Le composant App représente la structure globale de l'application.
  // Il gère l'état de la page courante et affiche les différents composants en fonction de cette page.
 */
  return (
    <>
      <div className="App vert container-fluid">
        {/*         // Logo de l'application
         */}{" "}
        <img
          src="img/logo.png"
          id="logo"
          onClick={() => setPage("")}
          className="img-fluid"
          alt="logo"
        ></img>
        <div className="container-fluid">
          {/*           // Barre de navigation
           */}{" "}
          <nav className="navbar navbar-expand-lg vert ">
            <a
              className="navbar-brand nav"
              onClick={() => setPage("")}
              href="#"
            >
              Accueil
            </a>
            {/*             // Bouton pour afficher le menu en version mobile
             */}{" "}
            <button
              className="burger navbar-toggler w-25 h-25"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="">
                <img src="menu.ico" className="w-25 h-25" alt="menu"></img>
              </span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarNavAltMarkup"
            >
              <div className="navbar-nav">
                {/*                 // Liens vers les différentes pages de l'application */}
                <a
                  className="nav-link nav"
                  onClick={() => setPage("femme")}
                  aria-current="page"
                  href="#"
                >
                  Coiffures Femmes
                </a>
                <a
                  className="nav-link nav"
                  onClick={() => setPage("homme")}
                  href="#"
                >
                  Coiffures Hommes, Barbe & enfants
                </a>
                <a
                  className="nav-link nav"
                  onClick={() => setPage("presta")}
                  href="#"
                >
                  Prestations
                </a>
                <a
                  className="nav-link nav"
                  onClick={() => setPage("RDV")}
                  href="#"
                >
                  Prise de Rendez-vous
                </a>
                <a
                  className="nav-link nav"
                  onClick={() => setPage("boutique")}
                  href="#"
                >
                  Boutique
                </a>
                {/*                 // Affichage du lien vers le compte utilisateur ou le formulaire
                de connexion selon l'état de connexion de l'utilisateur
 */}{" "}
                {hide ? (
                  <a
                    type="button"
                    onClick={() => setPage("compte")}
                    className="nav-link nav "
                  >
                    Compte
                  </a>
                ) : (
                  <Login
                    className={`nav-link  text-light`}
                    href="#"
                    setPage={setPage}
                    id="log"
                  />
                )}
                {/*                 // Affichage du lien de déconnexion ou d'inscription selon
                l'état de connexion de l'utilisateur
 */}{" "}
                {hide ? (
                  <a
                    type="button"
                    onClick={() => logout()}
                    className="nav-link nav "
                  >
                    Déconnexion
                  </a>
                ) : (
                  <a
                    type="button"
                    onClick={() => setPage("inscription")}
                    className="nav-link nav "
                  >
                    Inscription
                  </a>
                )}
                <a
                  className="nav-link nav"
                  onClick={() => setPage("contact")}
                  href="#"
                >
                  Contact
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div className="main">
          {/*           // Affichage des différents composants en fonction de la page courante
          et de la largeur de la fenêtre
 */}{" "}
          {page === "" && windowWidth > 620 && <Accueil />}
          {page === "" && windowWidth < 620 && <AccueilMobile />}
          {page === "femme" && <CoiffureFemme />}
          {page === "homme" && <CoiffureHomme />}
          {page === "RDV" && windowWidth > 1080 && <RendezVous />}
          {page === "RDV" && windowWidth < 1080 && windowWidth > 550 && (
            <RendezVousMedium />
          )}
          {page === "RDV" && windowWidth < 550 && <RendezVousMobile />}
          {page === "presta" && <TableauPresations setPage={setPage} />}
          {page === "contact" && windowWidth > 995 && <Contact />}
          {page === "contact" && windowWidth < 995 && <ContactMobile />}
          {page === "compte" && (
            <CompteUsers
              setPage={setPage}
              logout={logout}
              TOKEN={TOKEN!}
              windowWidth={windowWidth}
            />
          )}
          {page === "inscription" && windowWidth > 995 && (
            <Inscription setPage={setPage} />
          )}
          {page === "inscription" && windowWidth < 995 && (
            <InscriptionMobile setPage={setPage} />
          )}
          {page === "register" && <SuccessRegister />}
          {page === "boutique" && <Produit />}
        </div>
      </div>
      {/*       // Pied de page
       */}{" "}
      <footer
        className="text-center text-white"
        style={{ backgroundColor: "#093620" }}
      >
        <div className="p-4 pb-0">
          <section>
            <div className="justify-content-end">
              {/*               // Liens vers les réseaux sociaux et les contacts
               */}{" "}
              <a
                className="btn text-white btn-floating m-1 rounded-circle"
                style={{ backgroundColor: "#3b5998" }}
                href="https://www.facebook.com/profile.php?id=100063475093465"
                target="_blank"
                role="button"
              >
                <img
                  src="./img/facebook2.png"
                  alt="facebook"
                  className="img-fluid"
                />
              </a>
              <a
                className="btn text-white btn-floating m-1 rounded-circle"
                href="https://maps.app.goo.gl/xNob2FxNLjVNmXBG6"
                target="_blank"
                role="button"
              >
                <img src="./img/google.png" alt="" className="img-fluid" />
              </a>
              <a
                className="btn text-white btn-floating m-1 rouded-circle"
                href="https://www.instagram.com/latelier6or/"
                target="_blank"
                role="button"
              >
                <img
                  src="./img/instagram2.png"
                  alt="instagram"
                  className="img-fluid"
                />
              </a>
              <a
                className="btn text-white btn-floating m-1 rouded-circle"
                href="https://www.latelier6or.fr/"
                target="_blank"
                role="button"
              >
                <img
                  src="./img/planity.png"
                  alt="instagram"
                  className="img-fluid"
                />
              </a>
              <p style={{ fontStyle: "italic" }}>
                L'Atelier 6Or 123 Bis Route de Créon 33670 Sadirac &ensp;Tél. 06
                14 15 39 66{" "}
                <a href="mailto:latelier6or@gmail.com">
                  {" "}
                  Mail: latelier6or@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>
        {/*         // Mention de droits d'auteur
         */}{" "}
        <div
          className="copyright text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:
          <a href="https://www.facebook.com/Titou33/">&ensp;JC Ménard</a>
        </div>
      </footer>
    </>
  );
}

export default App;
