import { useNavigate } from "react-router-dom";

type InstrumentoParams = {
  id: number;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen?: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  descripcion: string;
  initialHayStock: number;
  idCategoria: number;
};

function ItemInstrumento(args: InstrumentoParams) {
  const navigate = useNavigate();

  const irAlDetalle = () => {
    navigate(`/detalle/${args.id}`);
  };

  return (
    <div className="contenedor-instrumentos">
      <div className="instrumento-item d-flex border-bottom p-3 align-items-center rounded-3">
        <div className="imagen-container me-4">
          <img
            src={`./images/${args.imagen}`}
            alt={args.instrumento}
            className="instrumento-imagen"
          />
        </div>
        <div className="info ">
          <h5>{args.instrumento}</h5>
          <p className="precio">${args.precio}</p>
          <p>
            {args.costoEnvio === "0" ? (
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
                Costo de Envío Interior de Argentina: ${args.costoEnvio}
              </span>
            )}
          </p>
          <p>{args.cantidadVendida} vendidos</p>
          <button
            style={{
              backgroundColor: "#9c8c5c",
              color: "white",
              width: "200px",
            }}
            className="btn"
            onClick={irAlDetalle}
          >
            Ver Detalle
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemInstrumento;
