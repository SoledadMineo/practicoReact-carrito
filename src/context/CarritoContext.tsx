import { ReactNode, createContext, useState } from "react";
import Instrumento from "../entidades/Instrumento";
import { PedidoDetalle } from "../entidades/PedidoDetalle";

// Definimos el tipo de dato que se almacenará en el contexto del carrito
interface CartContextType {
  cart: PedidoDetalle[];
  addCarrito: (product: Instrumento) => void;
  removeCarrito: (product: Instrumento) => void;
  removeItemCarrito: (product: Instrumento) => void;
  limpiarCarrito: () => void;
}

//crear contexto
export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {},
});

//crear provider, encargado de proveer acceso al contexto
export function CarritoContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<PedidoDetalle[]>([]);

  console.log("CarritoContextProvider montado");

  const addCarrito = (product: Instrumento) => {
    const existe = cart.some((item) => item.instrumento.id === product.id);

    if (existe) {
      console.log("esta en el carrito?", existe);
      const nuevoCarrito = cart.map((item) => {
        if (item.instrumento.id === product.id) {
          console.log("item.cantidad", item.cantidad);
          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      });
      setCart(nuevoCarrito);
    } else {
      setCart([
        ...cart,
        {
          instrumento: product,
          cantidad: 1,
        },
      ]);
    }
  };

  const removeCarrito = async (product: Instrumento) => {
    await setCart((prevCart) =>
      prevCart.filter((item) => item.instrumento.id !== product.id)
    );
  };

  // const removeItemCarrito = async (product: Instrumento) => {
  //   //const objetoBuscado = cart.find((objeto:Plato) => objeto.id === product.id);
  //   //const platoIndice = cart.findIndex((objeto:Plato) => objeto.id === product.id)
  //   //si el producto ya esta en el carrito
  //   let existe: boolean = false;
  //   cart.forEach(async (element: Instrumento) => {
  //     if (element.id === product.id) {
  //       existe = true;
  //     }
  //   });

  //   if (existe) {
  //     console.log("EXISTE");
  //     if (product.cantidad > 1) {
  //       product.cantidad -= 1;
  //       const cartClonado = await structuredClone(
  //         cart.filter((item) => item.id !== product.id)
  //       );
  //       await cartClonado.push(product);
  //       setCart(cartClonado);
  //     } else {
  //       await setCart((prevCart) =>
  //         prevCart.filter((item) => item.id !== product.id)
  //       );
  //     }
  //   }
  const removeItemCarrito = (product: Instrumento) => {
    const productoEnCarrito = cart.find(
      (item) => item.instrumento.id === product.id
    );

    if (!productoEnCarrito) return;

    if (productoEnCarrito.cantidad > 1) {
      const nuevoCarrito = cart.map((item) => {
        if (item.instrumento.id === product.id) {
          return { ...item, cantidad: item.cantidad - 1 };
        }
        return item;
      });
      setCart(nuevoCarrito);
    } else {
      setCart(cart.filter((item) => item.instrumento.id !== product.id));
    }
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addCarrito,
        limpiarCarrito,
        removeCarrito,
        removeItemCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
