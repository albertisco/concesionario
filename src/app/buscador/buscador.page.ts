import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Producto } from '../../models/producto.interface';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {

  productos: Array<Producto>;
  constructor(private _productoService: ProductosService,) { }

  ngOnInit() {
  }

  buscar(event) {
    const busqueda = event.detail.value;
    if (busqueda) {
      this._productoService.buscador(busqueda)
      .then((productos) => {
       this.productos = productos.json().productos;
       console.log(this.productos);
      })
      .catch(error => {
        this.productos = [];
      });
    } else {
      this.productos = [];
    }
  }


}
