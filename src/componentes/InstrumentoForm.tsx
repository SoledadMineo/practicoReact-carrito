import { useNavigate, useParams } from "react-router-dom";
import Instrumento from "../entidades/Instrumento";
import {
  deleteInstrumentoXId,
  getInstrumentoXIdFecth,
  saveInstrumento,
} from "../servicios/FuncionesApi";
import { useEffect, useState } from "react";
import { getCategoriasFetch } from "../servicios/FuncionesApi";
import ToastBootstrap from "./ToastBootstrap";

function InstrumentoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState<Instrumento>(
    new Instrumento()
  );
  const [mensaje, setMensaje] = useState("");
  const [txtValidacion, setTxtValidacion] = useState<string>("");
  const getInstrumentos = async () => {
    if (Number(id) !== 0) {
      let instrumentoSelect: Instrumento = await getInstrumentoXIdFecth(
        Number(id)
      );
      console.log("Instrumento recibido del backend:", instrumentoSelect);

      setInstrumento(instrumentoSelect);
    } else {
      let instrumentoSelect: Instrumento = new Instrumento();
      setInstrumento(instrumentoSelect);
    }
  };

  const [categorias, setCategorias] = useState<
    { id: number; denominacion: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const cats = await getCategoriasFetch();
      console.log("Categorías recibidas:", cats);
      setCategorias(cats);
    };
    fetchData();
    getInstrumentos();
  }, [id]);

  const save = async () => {
    if (
      instrumento.instrumento == undefined ||
      instrumento.instrumento === ""
    ) {
      setTxtValidacion("Ingrese el nombre del instrumento");
      return;
    }
    if (instrumento.marca == undefined || instrumento.marca === "") {
      setTxtValidacion("Ingrese la marca del instrumento");
      return;
    }
    if (instrumento.modelo == undefined || instrumento.modelo === "") {
      setTxtValidacion("Ingrese el modelo del instrumento");
      return;
    }
    if (instrumento.precio == undefined || instrumento.precio === 0) {
      setTxtValidacion("Ingrese el precio del instrumento");
      return;
    }
    if (instrumento.costoEnvio == undefined || instrumento.costoEnvio === "") {
      setTxtValidacion("Ingrese el costo de envio del instrumento");
      return;
    }
    if (
      instrumento.cantidadVendida == undefined ||
      instrumento.cantidadVendida === 0
    ) {
      setTxtValidacion("Ingrese la cantidad vendida del instrumento");
      return;
    }
    if (
      instrumento.descripcion == undefined ||
      instrumento.descripcion === ""
    ) {
      setTxtValidacion("Ingrese descripción del instrumento");
      return;
    }
    if (instrumento.initialHayStock == undefined) {
      setTxtValidacion("Debe seleccionar si hay stock del instrumento");
      return;
    }
    if (instrumento.idCategoria == undefined || instrumento.idCategoria === 0) {
      setTxtValidacion("Debe seleccionar la categoría del instrumento");
      return;
    }
    console.log(instrumento.instrumento);
    await saveInstrumento(instrumento);
    setMensaje("Instrumento guardado correctamente");
    setTimeout(() => {
      navigate("/grilla");
    }, 1500);
  };

  // const eliminar = async () => {
  //   await deleteInstrumentoXId(instrumento.id);
  //   navigate("/grilla");
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setInstrumento({
      ...instrumento,
      [id]:
        id === "precio" ||
        id === "cantidadVendida" ||
        id === "idCategoria" ||
        id === "initialHayStock"
          ? Number(value)
          : value,
    });
  };

  return (
    <>
      <div className="contenedor-form">
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="instrumento"
                placeholder="Instrumento"
                value={instrumento.instrumento}
                onChange={handleChange}
              />
              <label htmlFor="txtInstrumento">Instrumento</label>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="marca"
                placeholder="Marca"
                value={instrumento.marca}
                onChange={handleChange}
              />
              <label htmlFor="txtMarca">Marca</label>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="modelo"
                placeholder="Modelo"
                value={instrumento.modelo}
                onChange={handleChange}
              />
              <label htmlFor="txtModelo">Modelo</label>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="imagen"
                placeholder="Imagen"
                value={instrumento.imagen}
                onChange={handleChange}
              />
              <label htmlFor="txtImagen">Imagen</label>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="precio"
                placeholder="Precio"
                value={instrumento.precio}
                onChange={handleChange}
              />
              <label htmlFor="txtPrecio">Precio</label>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="costoEnvio"
                placeholder="Costo Envío"
                value={instrumento.costoEnvio}
                onChange={handleChange}
              />
              <label htmlFor="txtCostoEnvio">Costo Envío</label>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="cantidadVendida"
                placeholder="Cantidad Vendida"
                value={instrumento.cantidadVendida}
                onChange={handleChange}
              />
              <label htmlFor="cantidadVendida">Cantidad Vendida</label>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="descripcion"
                placeholder="Descripción"
                value={instrumento.descripcion}
                onChange={handleChange}
              />
              <label htmlFor="txtDescripcion">Descripción</label>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="initialHayStock"
                aria-label="Stock disponible"
                value={instrumento.initialHayStock ?? ""}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="1">Sí</option>
                <option value="0">No</option>
              </select>
              <label htmlFor="txtStock">Stock Disponible</label>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="idCategoria"
                aria-label="Categoría del instrumento"
                value={instrumento.idCategoria ?? ""}
                onChange={(e) =>
                  setInstrumento({
                    ...instrumento,
                    idCategoria: Number(e.target.value),
                  })
                }
              >
                <option value="">Seleccione</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.denominacion}
                  </option>
                ))}
              </select>
              <label htmlFor="categoria">Categoría</label>
            </div>
          </div>

          <div className="col-12">
            <p style={{ color: "red", lineHeight: 1.5, padding: 5 }}>
              {txtValidacion}
            </p>
          </div>

          <div className="col-12 d-flex justify-content-center">
            <button
              style={{
                backgroundColor: "#576378",
                color: "white",
                width: "300px",
              }}
              className="btn me-3"
              onClick={save}
            >
              Guardar
            </button>
            <button
              style={{
                backgroundColor: "#9c8c5c",
                color: "white",
                width: "300px",
              }}
              className="btn"
              onClick={() => navigate("/grilla")}
            >
              Volver
            </button>
          </div>
        </div>
        {mensaje && <ToastBootstrap mensaje={mensaje} />}
      </div>
    </>
  );
}

export default InstrumentoForm;
