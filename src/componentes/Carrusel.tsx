function Carrusel() {
  return (
    <div
      id="carouselInstrumentos"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/images/imagen1.jpg"
            className="d-block w-100"
            alt="Guitarra"
            style={{ width: "600px", height: "400px", objectFit: "none" }}
          />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-2">
            <h5>Guitarras</h5>
            <p>Amplia variedad de guitarras acústicas y eléctricas.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/images/imagen2.jpg"
            className="d-block w-100"
            alt="Teclado"
            style={{ width: "600px", height: "400px", objectFit: "none" }}
          />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-2">
            <h5>Teclados</h5>
            <p>Teclados profesionales para todos los niveles.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/images/imagen3.jpg"
            className="d-block w-100"
            alt="Batería"
            style={{ width: "600px", height: "400px", objectFit: "none" }}
          />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-2">
            <h5>Baterías</h5>
            <p>Sets de batería acústica y electrónica.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselInstrumentos"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselInstrumentos"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default Carrusel;
