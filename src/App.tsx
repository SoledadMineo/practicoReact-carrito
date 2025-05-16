import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./componentes/Menu";
import Footer from "./componentes/Footer";
import InstrumentoForm from "./componentes/InstrumentoForm";
import InstrumentoGrilla from "./componentes/InstrumentoGrilla";
import { Suspense, lazy } from "react";
import ListadoInstrumentos from "./componentes/ListadoInstrumentos";
import LoaderPage from "./componentes/LoaderPage";
import { RutaPrivada } from "./controlAcceso/RutaPrivada";
import Login from "./componentes/Login";
import RolUsuario from "./controlAcceso/RolUsuario";
import { Roles } from "./entidades/Roles";

function App() {
  const Home = lazy(() => import("./componentes/Home"));
  const DondeEstamos = lazy(() => import("./componentes/DondeEstamos"));
  const ListadoInstrumento = lazy(
    () => import("./componentes/ListadoInstrumentos")
  );
  const Instrumento = lazy(() => import("./componentes/Instrumento"));
  const Grilla = lazy(() => import("./componentes/InstrumentoGrilla"));
  const Formulario = lazy(() => import("./componentes/InstrumentoForm"));

  return (
    <BrowserRouter>
      <Menu />
      <main>
        <Suspense fallback={<LoaderPage></LoaderPage>}>
          <Routes>
            //Ruta publica
            <Route path="/" element={<Home />} />
            //Ruta publica
            <Route path="donde-estamos" element={<DondeEstamos />} />
            //Ruta publica
            <Route path="/login" element={<Login />} />
            //Ruta privada
            <Route
              path="listadoInstrumento"
              element={
                <RutaPrivada>
                  <ListadoInstrumentos />
                </RutaPrivada>
              }
            />
            <Route path="detalle/:id" element={<Instrumento />} />
            //ruta privada
            <Route
              path="/grilla"
              element={
                <RutaPrivada>
                  <InstrumentoGrilla />
                </RutaPrivada>
              }
            />
            <Route path="/formulario/:id" element={<InstrumentoForm />} />
            //Ruta publica
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
