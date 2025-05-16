
import Instrumento from "./Instrumento";

export interface PedidoDetalle {
  //id: number;
  instrumento?: Instrumento;
  cantidad: number;
  instrumento_id:number;
}
