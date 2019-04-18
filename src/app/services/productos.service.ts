import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Producto} from '../../models/producto.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  pagina: number = 0;
  productos: Array<Producto> = [];
  constructor(private http: Http) { }

  cargarProductos() {
    const url = `${environment.url_servicio}/producto?desde=${this.pagina}`;
   return this.http.get(url)
              .toPromise();
  }

  getProducto (codigo) {
    const url = `${environment.url_servicio}/producto/get/producto/${codigo}`;
    return this.http.get(url)
               .toPromise();
  }

  getLineas () {
    const url = `${environment.url_servicio}/linea`;
    return this.http.get(url)
               .toPromise();
  }

  getProductsByLinea (linea: string) {
    const url = `${environment.url_servicio}/producto/${linea}/${this.pagina}`;
    return this.http.get(url)
               .toPromise();
  }
}
