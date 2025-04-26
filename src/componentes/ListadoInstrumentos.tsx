import { useState, useEffect } from "react";
import Instrumento from "../entidades/Instrumento";
import ItemInstrumento from "./ItemInstrumento";
import { getInstrumentosJSONFetch } from "../servicios/FuncionesApi";

function ListadoInstrumentos() {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  const getInstrumentos = async () => {
    let datos: Instrumento[] = await getInstrumentosJSONFetch();
    setInstrumentos(datos);
  };

  useEffect(() => {
    getInstrumentos();
  }, []);

  return (
    <>
      <div className="contenedor-central">
        <div className="row">
          {instrumentos.map((datos: Instrumento) => (
            <ItemInstrumento
              key={datos.id}
              id={datos.id}
              instrumento={datos.instrumento}
              marca={datos.marca}
              modelo={datos.modelo}
              imagen={datos.imagen}
              precio={datos.precio}
              costoEnvio={datos.costoEnvio}
              cantidadVendida={datos.cantidadVendida}
              descripcion={datos.descripcion}
              initialHayStock={datos.initialHayStock}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ListadoInstrumentos;
