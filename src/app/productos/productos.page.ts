import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import {Router} from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  cargar: boolean;
  compras: number;
  constructor(public _productoService: ProductosService,
              public _router: Router,
              public cs: CarritoService,
              public _usuarioService: UsuariosService) {
  }

  ngOnInit() {
    console.log('cargando');
    this.cargar = false;
    this.cargarProductos();
  }

  cargarProductos () {
    this._productoService.cargarProductos()
    .then( (resp) => {
      const respjson = resp.json();
      console.log(this._productoService.productos);

      if (respjson.productos.length === 0) {
        this.cargar = true;
      } else {
        this._productoService.productos = this._productoService.productos.concat(respjson.productos);
        this._productoService.pagina += 1;
      }
    })
    .catch(error => {
      console.error(error.json());
    });
  }

  loadData (event) {
    setTimeout(() => {
      this.cargarProductos();
      event.target.complete();
    }, 2000);
  }

  productoElegido(codigo: string) {
    this._router.navigate(['/home/productos/producto', codigo]);
  }

}
