import { useLocation } from "react-router-dom";
import { PedidoDetalle } from "../entidades/PedidoDetalle";
import { useCarrito } from "../hooks/useCarrito";

function CartItem({
  detalle,
  onAdd,
  onRemove,
}: {
  detalle: PedidoDetalle;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const instrumento = detalle.instrumento;

  return (
    <div className="producto-card">
      <img
        className="producto-img"
        width={50}
        height={50}
        src={`./images/${instrumento.imagen}`}
        alt={instrumento.marca}
      />
      <div className="cart-item-details">
        <div className="nombre-producto">
          <strong>{instrumento.marca}</strong> - <br />${instrumento.precio}
        </div>
        <div className="precio">
          <b>
            {detalle.cantidad} {detalle.cantidad === 1 ? "unidad" : "unidades"}
          </b>
        </div>
      </div>
    </div>
  );
}
export function Carrito() {
  const location = useLocation();
  if (location.pathname !== "/listadoInstrumento") {
    return null;
  }
  const { cart, removeCarrito, addCarrito, limpiarCarrito } = useCarrito();
  console.log("Carrito.tsx renderizado, cart:", cart);

  const comprarCarrito = async () => {
    const total = cart.reduce(
      (acc, item) => acc + item.instrumento.precio * item.cantidad,
      0
    );

    const detalles = cart.map((item) => ({
      idInstrumento: item.instrumento.id,
      cantidad: item.cantidad,
    }));

    const data = {
      fechaPedido: new Date().toISOString().split("T")[0],
      totalPedido: total,
      detalles: detalles,
    };

    console.log("Datos enviados al servidor:", data);

    try {
      const response = await fetch(
        "http://localhost:8081/backend/guardar_pedido.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const resultado = await response.json();
      console.log("Pedido enviado con éxito:", resultado);
      alert(`Pedido creado con ID: ${resultado.pedido_id}`);
      limpiarCarrito();
    } catch (error) {
      console.error("Error al enviar pedido:", error);
      alert("Hubo un problema al enviar el pedido.");
    }
  };

  return (
    <aside className="cart">
      <aside className="cart">
        <label className="cart-button">
          Carrito de Compras
          <hr />
        </label>
        <ul>
          {cart.map((detalle: PedidoDetalle) => (
            <CartItem
              key={detalle.instrumento.id}
              detalle={detalle}
              onAdd={() => addCarrito(detalle.instrumento)}
              onRemove={() => removeCarrito(detalle.instrumento)}
            />
          ))}
        </ul>
        <div className="botones-carrito">
          <button onClick={limpiarCarrito} title="Limpiar Todo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17a2 2 0 1 0 2 2" />
              <path d="M17 17h-11v-11" />
              <path d="M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7" />
              <path d="M3 3l18 18" />
            </svg>
          </button>
          <button onClick={comprarCarrito}>Comprar</button>
        </div>
      </aside>
    </aside>
  );
}
