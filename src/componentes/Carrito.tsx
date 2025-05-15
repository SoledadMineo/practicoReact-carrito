import { PedidoDetalle } from "../entidades/PedidoDetalle";
import { useCarrito } from "../hooks/useCarrito";
import { Pedido } from "../entidades/Pedido";
import { useState } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    MercadoPago: any;
  }
}
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
  const [mostrarBotonPago, setMostrarBotonPago] = useState(false);
  const [preferenciaId, setPreferenciaId] = useState("");
  const [pedidoId, setPedidoId] = useState<number | null>(null);

  const location = useLocation();
  if (location.pathname !== "/listadoInstrumento") {
    return null;
  }
  const { cart, removeCarrito, addCarrito, limpiarCarrito } = useCarrito();

  const total = cart.reduce(
    (acc, item) => acc + item.instrumento.precio * item.cantidad,
    0
  );

  const comprarCarrito = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío. Agregá productos antes de comprar.");
      return;
    }
    const detalles = cart.map((item) => ({
      instrumento_id: item.instrumento.id,
      cantidad: item.cantidad,
    }));

    const pedido: Pedido = {
      fechaPedido: new Date().toISOString().substring(0, 10),
      totalPedido: total,
      pedidoDetalles: detalles,
    };

    console.log("Datos enviados al servidor:", pedido);

    try {
      const response = await fetch(
        "http://localhost:8081/backend/guardar_pedido.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pedido),
        }
      );

      const data = await response.json();
      if (data.id) {
        // El pedido se guardó correctamente
        setPedidoId(data.id);
        console.log("id:", data.id);
        setMostrarBotonPago(true);
      } else {
        alert("Error al crear el pedido");
      }
    } catch (error) {
      console.error("Error al crear preferencia:", error);
      alert("Error al generar preferencia de pago");
    }
  };

  const pagarConMercadoPago = async () => {
    if (!pedidoId) {
      alert("No hay pedido disponible para pagar.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/backend/crear_preferencia.php",
        {
          method: "POST",
          body: JSON.stringify({ pedido_id: pedidoId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json(); // ✅ Solo una vez

      console.log("Respuesta del servidor:", data);

      if (!response.ok) {
        console.error("Error en la respuesta del servidor:", data);
        alert("Error en la creación de preferencia");
        return;
      }

      if (data.id) {
        // Redirigir al usuario a MercadoPago para que pague
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`;
      } else {
        alert("Error al crear la preferencia");
      }
    } catch (error) {
      console.error("Error al generar preferencia:", error);
      alert("Error al generar preferencia");
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
        <h5 style={{ textAlign: "center" }}>Total: ${total.toFixed(2)}</h5>
        <div className="botones-carrito">
          <button
            className="boton-limpiar"
            onClick={limpiarCarrito}
            title="Limpiar Todo"
          >
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
          <button className="boton-comprar" onClick={comprarCarrito}>
            Comprar
          </button>
          {mostrarBotonPago && pedidoId && (
            <button
              id="btnMP"
              className="btn-mercadopago"
              onClick={pagarConMercadoPago}
            >
              Pagar con Mercado Pago
            </button>
          )}
        </div>
      </aside>
    </aside>
  );
}
