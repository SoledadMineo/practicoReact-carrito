import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Usuario from "../entidades/Usuario";
import { Roles } from "../entidades/Roles";

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>(new Usuario());
  const [txtValidacion, setTxtValidacion] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const login = async () => {
    if (usuario?.usuario == undefined || usuario?.usuario === "") {
      setTxtValidacion("Ingrese el nombre de usuario");
      return;
    }
    if (usuario?.clave == undefined || usuario?.clave === "") {
      setTxtValidacion("Ingrese la clave");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario.usuario,
          clave: usuario.clave,
        }),
      });

      if (!response.ok) {
        setTxtValidacion("Usuario y/o clave incorrectas");
        return;
      }

      const data = await response.json();

      const usuarioLogueado = new Usuario();
      usuarioLogueado.id = data.id;
      usuarioLogueado.usuario = data.usuario;
      usuarioLogueado.rol = data.rol === "ADMIN" ? Roles.ADMIN : Roles.USER;

      setUsuario(usuarioLogueado);
      localStorage.setItem("usuario", JSON.stringify(usuarioLogueado));
      window.dispatchEvent(new Event("userChanged"));

      navigate("/menu", {
        replace: true,
        state: {
          logged: true,
          usuario: usuarioLogueado,
        },
      });
    } catch (error) {
      console.error("Error en login:", error);
      setTxtValidacion("Error en el servidor. Intente más tarde.");
    }
  };

  return (
    <>
      <div className="center">
        <form>
          <div className="mb-3">
            <label htmlFor="txtUsuario" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              id="txtUsuario"
              className="form-control"
              placeholder="Ingrese el nombre"
              value={usuario?.usuario}
              onChange={(e) =>
                setUsuario({ ...usuario, usuario: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="txtClave" className="form-label">
              Clave
            </label>
            <input
              type="password"
              id="txtClave"
              className="form-control"
              placeholder="Ingrese la clave"
              value={usuario?.clave}
              onChange={(e) =>
                setUsuario({ ...usuario, clave: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
            />
          </div>
          <div className="col">
            <button onClick={login} className="cerrarSesion" type="button">
              Ingresar
            </button>
          </div>
          <div>
            <p style={{ color: "red", lineHeight: 5, padding: 5 }}>
              {txtValidacion}
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
