import Categoria from "../entidades/Categoria.ts";
import Instrumento from "../entidades/Instrumento.ts";
import instrumentos from "../instrumentos.json";

export function getInstrumentosJSON(): Instrumento[] {
	return instrumentos;
}

export async function getInstrumentosJSONFetch() {
  const urlServe = 'http://localhost:8081/backend/instrumentos.php';

  
  const response = await fetch(urlServe, {
    method: 'GET',
    mode: 'cors',
    // headers opcionales:
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Respuesta de instrumentos.php:", data);
  return data;
}

export async function getInstrumentoXIdFecth(id: number) {
	const urlServer = `http://localhost:8081/backend/instrumentos.php?id=${id}`;
	const response = await fetch(urlServer, {
	  method: 'GET',
	  mode: 'cors',
	});
	if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
	return await response.json() as Instrumento;
  }

  
  export async function deleteInstrumentoXId(id: number) {
	const urlServer = `http://localhost:8081/backend/instrumentos.php?id=${id}`;
	const response = await fetch(urlServer, {
	  method: 'DELETE',
	  mode: 'cors',
	});
	if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  }

  
  export async function getInstrumentosXBusqueda(termino: String) {
	const urlServer = `http://localhost:8081/backend/buscar/${termino}`;
	const response = await fetch(urlServer, {
	  method: 'GET',
	  mode: 'cors',
	});
	if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
	return await response.json();
  }
  
  export async function saveInstrumento(instrumento?: Instrumento) {
	const urlServer = 'http://localhost:8081/backend/instrumentos.php';
	const method = (instrumento && instrumento.id > 0) ? 'PUT' : 'POST';
  
	const response = await fetch(urlServer, {
	  method: method,
	  body: JSON.stringify(instrumento),
	  headers: {
		'Content-Type': 'application/json',
	  },
	  mode: 'cors',
	});
  
	if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  export async function getCategoriasFetch(): Promise<Categoria[]> {
	const response = await fetch("http://localhost:8081/backend/categoria.php", {
	  method: 'GET',
	  mode: 'cors',
	});
	if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
	return await response.json();
  }
  