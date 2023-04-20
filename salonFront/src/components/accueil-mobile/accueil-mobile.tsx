function AccueilMobile() {
  return (
    <div className="accordion accordion-borderless" id="accordionFlushExampleX">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOneX">
          <img
            src="image52.jpg"
            className="accordion-button collapsed"
            data-mdb-toggle="collapse"
            data-mdb-target="#flush-collapseOneX"
            aria-expanded="true"
            aria-controls="flush-collapseOneX"
          />
        </h2>
        <div
          id="flush-collapseOneX"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingOneX"
          data-mdb-parent="#accordionFlushExampleX"
        >
          <div className="accordion-body">
            {" "}
            <h1>L'Atelier 6Or</h1>
            <p>
              vous accueille entre les mains expertes d'Ophélie. C'est avec
              force d'une experience de 15 qu'elle saura sublimer votre coiffure
              et vous afficher sous votre plus beau jour
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccueilMobile;
