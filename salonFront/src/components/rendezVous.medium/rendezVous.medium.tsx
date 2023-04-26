import "./rendezVous.css";

function RendezVousMedium() {
  return (
    <div>
      <h1>Prise de rendez-vous avec Planity©</h1>
      <h3 className="planity">
        *Pour la prise de rendez-vous sur la plateforme Planity© vous devez être
        enregistré-e et connecté-e sur cette plateforme.
      </h3>
      <iframe
        src="https://www.planity.com/latelier-6or-sadirac-33670"
        width={500}
        height={350}
      ></iframe>
    </div>
  );
}
export default RendezVousMedium;
