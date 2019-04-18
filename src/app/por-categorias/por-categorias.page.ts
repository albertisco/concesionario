import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { Producto } from 'src/models/producto.interface';

@Component({
  selector: 'app-por-categorias',
  templateUrl: './por-categorias.page.html',
  styleUrls: ['./por-categorias.page.scss'],
})
export class PorCategoriasPage implements OnInit {

  productos: Array<Producto>;
  constructor(private activated: ActivatedRoute, private _productoService: ProductosService) { }

  ngOnInit() {
    this.activated.params.subscribe(parametros => {
      this.obtenerProductosPorLineayPagina(parametros['id']);
    });
  }

  obtenerProductosPorLineayPagina (id: string) {
    this._productoService.getProductsByLinea(id)
                         .then(prod => {
                          this.productos = prod.json().productos;
                          console.log(this.productos);
                         });
  }

}
