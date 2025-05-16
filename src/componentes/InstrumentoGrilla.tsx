import { useState, useEffect } from "react";
import Instrumento from "../entidades/Instrumento";
import {
  deleteInstrumentoXId,
  getCategoriasFetch,
  getInstrumentosJSONFetch,
} from "../servicios/FuncionesApi";
import { useNavigate } from "react-router-dom";
import Categoria from "../entidades/Categoria";
import Usuario from "../entidades/Usuario";
import { Roles } from "../entidades/Roles";

function InstrumentoGrilla() {
  const usuarioLogueado: Usuario | null = localStorage.getItem("usuario")
    ? JSON.parse(localStorage.getItem("usuario")!)
    : null;
  console.log("usuarioLogueado:", usuarioLogueado);
  console.log("rol del usuario:", usuarioLogueado?.rol);
  console.log("Roles.ADMIN:", Roles.ADMIN);

  const esAdmin = usuarioLogueado?.rol === Roles.ADMIN;

  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const navigate = useNavigate();
  const getInstrumentos = async () => {
    const datos: Instrumento[] = await getInstrumentosJSONFetch();
    console.log("Instrumentos cargados:", datos);
    setInstrumentos(datos);
  };

  const getCategorias = async () => {
    const datos = await getCategoriasFetch();
    setCategorias(datos);
  };

  const getNombreCategoria = (idCategoria: number) => {
    const categoria = categorias.find((c) => c.id === Number(idCategoria));
    return categoria ? categoria.denominacion : "Desconocida";
  };
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    getInstrumentos();
    getCategorias();
  }, []);

  const deleteInstrumento = async (idInstrumento: number) => {
    await deleteInstrumentoXId(idInstrumento);
    setMensaje("Instrumento eliminado correctamente");
    await getInstrumentos();
  };

  return (
    <>
      <div className="contenedor-tabla">
        {esAdmin && (
          <div className="text-end">
            <button
              style={{ backgroundColor: "#9c8c5c", color: "white" }}
              className="btn w-40 mb-3"
              onClick={() => navigate("/formulario/0")}
            >
              Nuevo
            </button>
          </div>
        )}
        <div className="text-start">
          <table className="tabla-personalizada">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Instrumento</th>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Imagen</th>
                <th scope="col">Precio</th>
                <th scope="col">Costo Envio</th>
                <th scope="col">Cantidad Vendida</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Stock Disponible</th>
                <th scope="col">Categoria</th>
                {esAdmin && <th scope="col">Modificar</th>}
                {esAdmin && <th scope="col">Eliminar</th>}
              </tr>
            </thead>
            <tbody>
              {instrumentos.map((instrumento: Instrumento) => (
                <tr key={instrumento.id}>
                  <td>{instrumento.id}</td>
                  <td>{instrumento.instrumento}</td>
                  <td>{instrumento.marca}</td>
                  <td>{instrumento.modelo}</td>
                  <td>{instrumento.imagen}</td>
                  <td>{instrumento.precio}</td>
                  <td>{instrumento.costoEnvio}</td>
                  <td>{instrumento.cantidadVendida}</td>
                  <td>{instrumento.descripcion}</td>
                  <td>
                    {Number(instrumento.initialHayStock) === 1 ? "Sí" : "No"}
                  </td>
                  <td>{getNombreCategoria(instrumento.idCategoria)}</td>

                  {esAdmin && (
                    <td>
                      <button
                        style={{ backgroundColor: "#576378", color: "white" }}
                        className="btn w-100"
                        onClick={() =>
                          navigate(`/formulario/${instrumento.id}`)
                        }
                      >
                        Modificar
                      </button>
                    </td>
                  )}
                  {esAdmin && (
                    <td>
                      <button
                        style={{ backgroundColor: "#9c8c5c", color: "white" }}
                        className="btn w-100"
                        onClick={() => deleteInstrumento(instrumento.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* {mensaje &&
        createPortal(<ToastBootstrap mensaje={mensaje} />, document.body)} */}
    </>
  );
}

export default InstrumentoGrilla;
