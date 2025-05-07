import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CarritoContext";
import Instrumento from "../entidades/Instrumento";
import { useContext } from "react";

type InstrumentoParams = {
  id: number;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  descripcion: string;
  initialHayStock: number;
  idCategoria: number;
  instruObject: Instrumento;
};

function ItemInstrumento({
  id,
  instrumento,
  marca,
  modelo,
  imagen,
  precio,
  costoEnvio,
  cantidadVendida,
  descripcion,
  initialHayStock,
  idCategoria,
  instruObject,
}: InstrumentoParams) {
  const navigate = useNavigate();
  const irAlDetalle = () => {
    navigate(`/detalle/${id}`);
  };
  const { addCarrito, removeCarrito, cart, removeItemCarrito } =
    useContext(CartContext);

  //const isInstruInCarrito = cart.some((item) => item.id === args.id);

  const verificaInstruEnCarrito = (product?: Instrumento) => {
    if (!product) return false;
    return cart.some((item) => item.instrumento.id === product.id);
  };

  const isInstruInCarrito = instruObject
    ? verificaInstruEnCarrito(instruObject)
    : false;

  return (
    <>
      <div className="contenedor-instrumentos">
        <div className="instrumento-item d-flex border-bottom p-3 align-items-center rounded-3">
          <div className="imagen-container me-4">
            <img
              src={`./images/${imagen}`}
              alt={instrumento}
              className="instrumento-imagen"
            />
          </div>
          <div className="info ">
            <h5>{instrumento}</h5>
            <p className="precio">${precio}</p>
            <p>
              {costoEnvio === "0" ? (
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
                  Costo de Envío Interior de Argentina: ${costoEnvio}
                </span>
              )}
            </p>
            <p>{cantidadVendida} vendidos</p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                style={{
                  backgroundColor: "#9c8c5c",
                  color: "white",
                  width: "200px",
                  marginRight: "15px",
                }}
                className="btn"
                onClick={irAlDetalle}
              >
                Ver Detalle
              </button>
              <div className="contenedor-contador">
                <button
                  style={{
                    backgroundColor: "#4e5a6f",
                    color: "white",
                    width: "40px",
                    height: "40px",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  className="btn"
                  onClick={() => {
                    console.log("click en quitar", instruObject);
                    removeItemCarrito(instruObject);
                  }}
                >
                  -
                </button>
                <button
                  style={{
                    backgroundColor: "white",
                  }}
                  className="btn"
                  onClick={() => {
                    isInstruInCarrito
                      ? removeCarrito(instruObject)
                      : addCarrito(instruObject);
                  }}
                >
                  {isInstruInCarrito ? (
                    <img
                      src={`../../public/images/deleteCart.png`}
                      title="Quitar"
                    />
                  ) : (
                    <img
                      src={`../../public/images/addCart.png`}
                      title="Comprar"
                    />
                  )}
                </button>
              </div>
              <button
                style={{
                  backgroundColor: "#4e5a6f",
                  color: "white",
                  width: "40px",
                  height: "40px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
                className="btn boton-contenedor"
                onClick={() => {
                  console.log("click en agregar", instruObject);
                  addCarrito(instruObject);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemInstrumento;
