// componentes/Menu.tsx
import { Outlet } from "react-router-dom";
import MenuOpciones from "./MenuOpciones";

function Menu() {
  return (
    <>
      <MenuOpciones />
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
}

export default Menu;
