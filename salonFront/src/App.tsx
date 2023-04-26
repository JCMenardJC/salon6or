import { useContext, useState, useEffect } from "react";
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
import { AuthContext } from "./context/authContext";
import Inscription from "./components/inscription/inscription";
import ContactMobile from "./components/contactMobile/contactMobile";
import SuccessRegister from "./components/successRegister/successRegister";
import RendezVous from "./components/rendezVous/rendezVous";
import RendezVousMedium from "./components/rendezVous.medium/rendezVous.medium";
import RendezVousMobile from "./components/rendezVous.mobile/rendezVousMobile";
import InscriptionMobile from "./components/inscription.mobile/inscriptionMobile";

function App() {
  const { savedToken } = useContext(AuthContext);
  const TOKEN = localStorage.getItem("token")!;
  const { setUser } = useContext(UContext);
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

  const hide = savedToken !== null;
  console.log(hide);
  console.log(savedToken);

  return (
    <div className="App vert container-fluid">
      <img
        src="img/logo.png"
        id="logo"
        onClick={() => setPage("")}
        className="img-fluid"
        alt="logo"
      ></img>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg vert ">
          <a className="navbar-brand nav" onClick={() => setPage("")} href="#">
            Accueil
          </a>
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
                Coiffures Hommes & Barbe
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
              {hide ? (
                <div></div>
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
        {page === "" && windowWidth > 620 && <Accueil />}
        {page === "" && windowWidth < 620 && <AccueilMobile />}
        {page === "femme" && <CoiffureFemme />}
        {page === "homme" && <CoiffureHomme />}
        {page === "RDV" && windowWidth > 1080 && <RendezVous />}
        {page === "RDV" && windowWidth < 1080 && windowWidth > 550 && (
          <RendezVousMedium />
        )}

        {page === "RDV" && windowWidth < 550 && <RendezVousMobile />}
        {page === "presta" && <TableauPresations />}
        {page === "contact" && windowWidth > 995 && <Contact />}
        {page === "contact" && windowWidth < 995 && <ContactMobile />}
        {page === "compte" && (
          <CompteUsers setPage={setPage} logout={logout} TOKEN={TOKEN} />
        )}
        {page === "inscription" && windowWidth > 995 && (
          <Inscription setPage={setPage} />
        )}
        {page === "inscription" && windowWidth < 995 && (
          <InscriptionMobile setPage={setPage} />
        )}
        {page === "register" && <SuccessRegister />}
      </div>
    </div>
  );
}

export default App;
