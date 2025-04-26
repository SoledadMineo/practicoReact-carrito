import { Link } from "react-router-dom";
import "../App.css"; // Asegúrate de ajustar la ruta si es necesario

function MenuOpciones() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/app">
          <img src="/images/logo.png" alt="Logo" />
        </Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/app">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donde-estamos">
                Donde Estamos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listadoInstrumento">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/grilla">
                Grilla
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuOpciones;
