import { ChangeEventHandler } from "react";

export default class Instrumento{

        id:number = 0;
        instrumento:string = "";
        marca:string = "";
        modelo:string = "";
        imagen?:string = "";
        precio:number = 0;
        costoEnvio:string = "G";
        cantidadVendida:number = 0;
        descripcion:string = "";
        initialHayStock= 0;
        idCategoria = 0;
        //cantidad:number = 0;
        addCarrito?:ChangeEventHandler;
}
