import { useState } from "react";
import "./App.css";
import Accueil from "./components/accueil/accueil";
import CoiffureFemme from "./components/coiffureFemme/coiffureFemme";
import CoiffureHomme from "./components/coiffureHomme/coiffureHomme";
import TableauPresations from "./components/prestations/prestations";

function App() {
  const [page, setPage] = useState<string>("");
  return (
    <div className="App vert h-50">
      <img
        src="logo.png"
        id="logo"
        onClick={() => setPage("")}
        className="img-fluid"
        alt="logo"
      ></img>
      <nav className="navbar navbar-expand-lg vert">
        <div className="container-fluid text-center">
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
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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
              <a className="nav-link nav" href="#">
                Contact & Rendez-vous
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="main">
        {page === "" && <Accueil />}
        {page === "femme" && <CoiffureFemme />}
        {page === "homme" && <CoiffureHomme />}
        {page === "presta" && <TableauPresations />}
      </div>
    </div>
  );
}

export default App;
