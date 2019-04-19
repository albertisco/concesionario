import { Producto } from './producto.interface';
export interface Orden {
    _id: string;
    productos: Array<Producto>;
    usuario: any;
    fecha_creacion: Date;
}
