import {Linea} from './linea.interface';
export interface Producto {
    _id: string;
    codigo: string;
    descripcion: string;
    linea: Linea;
    precio_compra: number;
    producto: string;
    proveedor: string;
}
