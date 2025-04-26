import { useParams } from "react-router-dom";
import { getInstrumentoXIdFecth } from "../servicios/FuncionesApi";
import Instrumento from "../entidades/Instrumento";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DetalleInstrumento() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState<Instrumento>();

  const getInstrumento = async () => {
    const instrumentoSelect: Instrumento = await getInstrumentoXIdFecth(
      Number(id)
    );
    setInstrumento(instrumentoSelect);
  };
  useEffect(() => {
    getInstrumento();
  }, []);

  if (!instrumento) {
    return <p>Instrumento no encontrado.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="row">
          <div className="col-12 mb-3">
            <h4 className="mb-0 text-start">
              <strong>Componente Detalle Instrumento:</strong>
            </h4>
          </div>
        </div>

        <div className="row align-items-center">
          {/* Imagen */}
          <div className="col-md-7 text-center mb-3 mb-md-0">
            <img
              src={`/images/${instrumento.imagen}`}
              alt={instrumento.instrumento}
              className="img-fluid"
              style={{ maxHeight: "250px", objectFit: "contain" }}
            />
            <div className="row mt-4">
              <div className="col-12 text-start">
                <h6>Descripción:</h6>
                <br />
                <p style={{ textAlign: "justify" }}>
                  {instrumento.descripcion}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-5 text-start border-start ps-3">
            <div className="detalle">
              <p className="text-muted mb-1">
                {instrumento.cantidadVendida} vendidos
              </p>
              <h5 className="mb-2">
                <strong>{instrumento.instrumento}</strong>
              </h5>
              <h4 className="text-success mb-2">
                ${instrumento.precio.toLocaleString()}
              </h4>
              <p className="mb-1">
                <strong>Marca:</strong> {instrumento.marca}
              </p>
              <p className="mb-1">
                <strong>Modelo:</strong> {instrumento.modelo}
              </p>
              <p className="mb-3">
                <strong>Costo Envío:</strong>
              </p>
              <div className="mb-3">
                {instrumento.costoEnvio === 0 ? (
                  <>
                    <img
                      src="/images/camion.png"
                      alt="camion"
                      style={{ width: "20px", marginRight: "5px" }}
                    />
                    <span style={{ color: "green" }}>
                      Envío gratis a todo el país
                    </span>
                  </>
                ) : (
                  <span style={{ color: "red" }}>
                    Costo de Envío Interior de Argentina: $
                    {instrumento.costoEnvio}
                  </span>
                )}
              </div>
              <div className="d-flex flex-column gap-3 mt-3">
                <div className="d-flex gap-3">
                  <button
                    style={{ backgroundColor: "#576378", color: "white" }}
                    className="btn w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalToggle"
                  >
                    🛒 Agregar al carrito
                  </button>
                  <button
                    style={{ backgroundColor: "#9c8c5c", color: "white" }}
                    className="btn w-100"
                    onClick={() => navigate("/listadoInstrumento")}
                  >
                    ⬅️ Volver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modales Bootstrap */}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                ✅ Producto agregado correctamente
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <strong>{instrumento.instrumento}</strong>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleInstrumento;
