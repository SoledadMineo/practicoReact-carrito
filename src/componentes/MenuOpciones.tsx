import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Usuario from "../entidades/Usuario";
import { useState, useEffect } from "react";
import { Roles } from "../entidades/Roles";

function MenuOpciones() {
  const navigate = useNavigate();
  const [usuarioLogueado, setUsuarioLogueado] = useState<Usuario | null>(null);

  useEffect(() => {
    const jsonUsuario = localStorage.getItem("usuario");
    if (jsonUsuario) {
      try {
        setUsuarioLogueado(JSON.parse(jsonUsuario));
      } catch {
        setUsuarioLogueado(null);
      }
    }
  }, []);

  const actualizarUsuario = () => {
    const jsonUsuario = localStorage.getItem("usuario");
    if (jsonUsuario) {
      try {
        const usuario = JSON.parse(jsonUsuario);
        console.log("Usuario cargado desde localStorage:", usuario);
        setUsuarioLogueado(usuario);
      } catch {
        console.error("Error al parsear usuario");
        setUsuarioLogueado(null);
      }
    } else {
      console.log("No hay usuario en localStorage");
      setUsuarioLogueado(null);
    }
  };
  useEffect(() => {
    const handleUserChange = () => {
      console.log("Evento userChanged capturado");
      actualizarUsuario();
    };
    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuarioLogueado(null);
    navigate("/login", {
      replace: true,
      state: { logged: false },
    });
  };

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
            <div className="user-container">
              <li className="nav-item">
                <span className="nav-link">
                  Usuario: {usuarioLogueado?.usuario ?? "Invitado"} -{" "}
                  {usuarioLogueado
                    ? usuarioLogueado.rol === Roles.ADMIN
                      ? "Admin"
                      : "Usuario"
                    : ""}
                </span>
              </li>
              {usuarioLogueado && (
                <li className="nav-item">
                  <button
                    onClick={cerrarSesion}
                    className="cerrarSesion"
                    type="button"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuOpciones;
