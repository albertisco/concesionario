import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/models/producto.interface';
import { CarritoService } from '../services/carrito.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  producto: Producto;
  titulo: string;
  listo: Boolean = false;

  constructor(private _productoService: ProductosService,
              private activated: ActivatedRoute,
              public cs: CarritoService) {

   }

  ngOnInit() {
    this.activated.params.subscribe(params => {
      this._productoService.getProducto(params['codigo'])
                           .then(producto => {
                             const productojson = producto.json();
                             console.log(productojson);
                             this.producto = productojson.producto;
                             this.titulo = this.producto.producto;
                             this.listo = true;
                           })
                           .catch(error => {
                            console.error(error);
                           });
    });
  }

}
