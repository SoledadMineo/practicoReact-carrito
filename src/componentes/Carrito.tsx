import { Pedido } from "../entidades/Pedido";
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
    <div key={instrumento.id}>
      <span>
        <img
          width={50}
          height={50}
          src={`./images/${instrumento.imagen}`}
          alt={instrumento.marca}
        />
        <div>
          <strong>{instrumento.marca}</strong> - ${instrumento.precio}
        </div>
        <div>
          <b>
            {detalle.cantidad} {detalle.cantidad == 1 ? "unidad" : "unidades"}{" "}
          </b>
        </div>
      </span>
      <hr></hr>
    </div>
  );
}

export function Carrito() {
  const { cart, removeCarrito, addCarrito, limpiarCarrito } = useCarrito();
  console.log("Carrito.tsx renderizado, cart:", cart);

  const comprarCarrito = async () => {
    const total = cart.reduce(
      (sum, detalle) => sum + detalle.instrumento.precio * detalle.cantidad,
      0
    );

    const pedido: Pedido = {
      fechaPedido: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
      totalPedido: total,
      detalles: cart.map((detalle) => ({
        idInstrumento: detalle.instrumento.id,
        cantidad: detalle.cantidad,
      })),
    };

    try {
      const response = await fetch(
        "http://localhost/backend/guardarPedido.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pedido), // el array de items con cantidad + instrumento
        }
      );

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      limpiarCarrito(); // si querés vaciar el carrito después de comprar
    } catch (error) {
      console.error("Error al enviar pedido:", error);
    }
  };

  return (
    <>
      <label className="cart-button">
        <i>Items del Pedido</i>
        <hr />
      </label>
      <aside className="cart">
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
      </aside>
    </>
  );
}
