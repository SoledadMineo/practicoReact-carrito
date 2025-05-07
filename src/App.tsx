import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./componentes/Menu";
import Home from "./componentes/Home";
import DondeEstamos from "./componentes/DondeEstamos";
import ListadoInstrumentos from "./componentes/ListadoInstrumentos";
import Instrumento from "./componentes/Instrumento";
import Footer from "./componentes/Footer";
import InstrumentoForm from "./componentes/InstrumentoForm";
import InstrumentoGrilla from "./componentes/InstrumentoGrilla";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="donde-estamos" element={<DondeEstamos />} />
          <Route path="listadoInstrumento" element={<ListadoInstrumentos />} />
          <Route path="detalle/:id" element={<Instrumento />} />
          <Route path="/grilla" element={<InstrumentoGrilla />} />
          <Route path="/formulario/:id" element={<InstrumentoForm />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
