import { useContext, useState, useEffect } from "react";
import "./App.css";
import Accueil from "./components/accueil/accueil";
import CoiffureFemme from "./components/coiffureFemme/coiffureFemme";
import CoiffureHomme from "./components/coiffureHomme/coiffureHomme";
import TableauPresations from "./components/prestations/prestations";
import Contact from "./components/contact/contact";
import { Login } from "./components/login/login";
import CompteUsers from "./components/compteUser/compteUser";
import AccueilMobile from "./components/accueil-mobile/accueil-mobile";
import { UContext, UserInit } from "./context/userContext";
import { AuthContext } from "./context/authContext";

function App() {
  const { savedToken } = useContext(AuthContext);
  const TOKEN = localStorage.getItem("token")!;
  const { user, setUser } = useContext(UContext);
  const [page, setPage] = useState<string>("");
  const deco = document.getElementById("deco");
  const log = document.getElementById("log");

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
        src="logo.png"
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
                onClick={() => setPage("contact")}
                href="#"
              >
                Contact & Rendez-vous
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
                <></>
              )}
              {hide ? (
                <a
                  type="button"
                  onClick={() => logout()}
                  className="nav-link nav "
                  id="deco"
                >
                  Déconnexion
                </a>
              ) : (
                <Login
                  className={`nav-link  text-light`}
                  href="#"
                  setPage={setPage}
                  id="log"
                />
              )}
            </div>
          </div>
        </nav>
      </div>
      <div className="main">
        {page === "" && windowWidth > 620 && <Accueil />}
        {page === "" && windowWidth < 620 && <AccueilMobile />}
        {page === "femme" && <CoiffureFemme />}
        {page === "homme" && <CoiffureHomme />}
        {page === "presta" && <TableauPresations />}
        {page === "contact" && <Contact />}
        {page === "compte" && (
          <CompteUsers setPage={setPage} logout={logout} TOKEN={TOKEN} />
        )}
      </div>
    </div>
  );
}

export default App;
