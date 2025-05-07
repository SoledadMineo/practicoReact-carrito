// componentes/Menu.tsx
import MenuOpciones from "./MenuOpciones";
import { Carrito } from "./Carrito";

function Menu() {
  return (
    <>
      <MenuOpciones />
      <div className="col">
        <b>Carrito de Compras</b>
        <Carrito></Carrito>
      </div>
    </>
  );
}

export default Menu;
