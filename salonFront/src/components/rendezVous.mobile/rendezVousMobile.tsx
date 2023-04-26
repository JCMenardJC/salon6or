import "./rendezVous.css";

function RendezVousMobile() {
  return (
    <div>
      <h3>Prise de rendez-vous avec Planity©</h3>
      <h6 className="planity">
        *Pour la prise de rendez-vous sur la plateforme Planity© vous devez être
        enregistré-e et connecté-e sur cette plateforme.
      </h6>
      <iframe
        src="https://www.planity.com/latelier-6or-sadirac-33670"
        height={300}
      ></iframe>
      <div>
        <a
          href="https://www.planity.com/latelier-6or-sadirac-33670"
          className="btn rounded-0"
          id="btn-planity"
          target="_blank"
        >
          Planity©
        </a>
      </div>
    </div>
  );
}
export default RendezVousMobile;
