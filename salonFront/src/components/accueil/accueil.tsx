import "./accueil.css";

function Accueil() {
  return (
    <div className="container-sm" style={{ width: 1000 }}>
      <div className="card text-bg-dark rounded-0">
        <img
          src="image52.jpg"
          className="img-fluid img-principale rounded-0 "
          alt="image_accueil"
        />
        <div className="card-img-overlay">
          <h1 className="card-title">L'Atelier 6Or</h1>
          <p className="card-text">
            vous accueille entre les mains expertes d'Ophélie. C'est avec force
            d'une experience de 15 qu'elle saura sublimer votre coiffure et vous
            afficher sous votre plus beau jour
          </p>
        </div>
      </div>
    </div>
  );
}
export default Accueil;
