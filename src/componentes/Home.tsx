import Carrusel from "./Carrusel";

function Home() {
  return (
    <div className="container mt-4">
      <h1 className="custom-h1 text-center">
        Bienvenidos a Sinfonía Tienda de Música
      </h1>
      <p className="custom-p text-center">
        Instrumentos de calidad para músicos de verdad.
      </p>
      <Carrusel />
      <p className="custom-p">
        Con más de 15 años acompañando a músicos de todos los niveles, en
        Sinfonía te ofrecemos una amplia variedad de instrumentos musicales,
        accesorios y equipos de sonido. Nos apasiona la música tanto como a vos,
        por eso te brindamos asesoramiento personalizado para ayudarte a
        encontrar el instrumento perfecto. Ya seas principiante o profesional,
        en Sinfonía vas a encontrar calidad, compromiso y pasión por la música.
        ¡Vení a vivir la experiencia musical con nosotros!
      </p>
    </div>
  );
}
export default Home;
