import "./App.css";
import CoiffureFemme from "./components/coiffureFemme/coiffureFemme";
import Accueil from "./components/coiffureFemme/coiffureFemme";
import CoiffureHomme from "./components/coiffureHomme/coiffureHomme";

function App() {
  return (
    <div className="App vert h-50">
      <img src="logo.png" className="img-fluid" alt="logo"></img>
      <nav className="navbar navbar-expand-lg vert">
        <div className="container-fluid text-center">
          <a className="navbar-brand nav" href="#">
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
              <a className="nav-link nav" aria-current="page" href="#">
                Coiffures Femmes
              </a>
              <a className="nav-link nav" href="#">
                Coiffures Hommes & Barbe
              </a>
              <a className="nav-link nav" href="#">
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
        {/*  <CoiffureFemme /> */}
        <CoiffureHomme />
      </div>
    </div>
  );
}

export default App;
