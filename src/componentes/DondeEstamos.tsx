function DondeEstamos() {
  return (
    <div className="container my-4">
      <h1 className="custom-h1">Donde Estamos</h1>
      <p className="custom-p">
        Nuestra tienda <strong>Sinfonía</strong> está ubicada en la intersección
        de Av. Las Heras y Av. San Martín, pleno centro de la Ciudad de Mendoza.
        <br />
        Nos encontramos en el corazón de Mendoza. Podés llegar fácilmente en
        colectivo (líneas 4, 6 y 20), o estacionar en las cercanías si venís en
        auto.
      </p>
      <div className="d-flex justify-content-center mb-4">
        <div className="ratio ratio-16x9 mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3360.3383488374114!2d-68.84507238481961!3d-32.88925818093854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091c4ee3f7e3%3A0x2ba620708a3c8204!2sAv.%20Las%20Heras%20%26%20Av.%20San%20Mart%C3%ADn%2C%20M5500%20Mendoza!5e0!3m2!1ses!2sar!4v1713123749401!5m2!1ses!2sar"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="info-contacto text-center">
        <strong>Informacion de Contacto</strong>
        <br />
        <p>
          <span className="icono">📞</span> Teléfono:{" "}
          <strong>+54 261 555-1234</strong>
        </p>
        <p>
          <span className="icono">✉️</span> Email:{" "}
          <strong>contacto@sinfoniatienda.com</strong>
        </p>
        <p>
          <span className="icono">⏰</span> Horarios:{" "}
          <strong>Lunes a Viernes de 9 a 18 hs, Sábados de 9 a 13 hs</strong>
        </p>
      </div>
    </div>
  );
}

export default DondeEstamos;
