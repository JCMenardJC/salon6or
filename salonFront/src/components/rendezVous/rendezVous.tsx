import "./rendezVous.css";

function RendezVous() {
  return (
    <div>
      <h1>Prise de rendez-vous avec Planity©</h1>
      <h3 className="planity">
        *Pour la prise de rendez-vous sur la plateforme Planity© vous devez être
        enregistré-e et connecté-e sur cette plateforme.
      </h3>
      <iframe
        src="https://www.planity.com/latelier-6or-sadirac-33670"
        width={1000}
        height={750}
      ></iframe>
    </div>
  );
}
export default RendezVous;
