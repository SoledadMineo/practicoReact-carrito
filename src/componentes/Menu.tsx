// componentes/Menu.tsx
import MenuOpciones from "./MenuOpciones";
import { Carrito } from "./Carrito";

function Menu() {
  return (
    <>
      <MenuOpciones />
      <div className="col">
        <Carrito></Carrito>
      </div>
    </>
  );
}

export default Menu;
