import { Injectable } from '@angular/core';
import { Producto } from 'src/models/producto.interface';
import { AlertController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Http, URLSearchParams } from '@angular/http';
import { environment } from 'src/environments/environment';
import { UsuariosService } from './usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito: Array<Producto>;
  precioTotal: number = 0;

  constructor(private alert: AlertController,
              private location: Location,
              public storage: NativeStorage,
              private _platform: Platform,
              private http: Http,
              private _usuarioService: UsuariosService) {
                this.cargarStorage();
               this.precioTotal = this.obtenerTotalCompra();
  }

   async agregarCarrito(productoAgregar: Producto) {
    let alert = null;
    if (this.carrito.length > 0) {
        const ocurrencia = this.carrito.find((producto) => {
          return producto.codigo === productoAgregar.codigo;
        });
        if (!ocurrencia) {
          this.carrito.push(productoAgregar);
        } else {
          alert = await this.alert.create({
            header: 'Producto duplicado',
            message: 'El producto ya existe en su compra',
            buttons: [
              {
                text: 'volver al menú de compra',
                handler: () => {
                  this.location.back();
                }
              }
            ]
          });
          await alert.present();
          return;
        }
    } else {
      this.carrito.push(productoAgregar);
    }
    this.guardarStorage();
    alert = await this.alert.create({
      header: 'Compra',
      message: 'Producto agregado con éxito',
      buttons: [
        {
          text: 'Seguir comprando',
          handler: () => {
            this.precioTotal = this.obtenerTotalCompra();
            this.location.back();
          }
        }
      ]
    });
    await alert.present();
  }

  cargarStorage () {
    if (this._platform.is('cordova')) {
      this.storage.getItem('carrito')
                .then( carrito => {
                  if (carrito) {
                    this.carrito = carrito;
                  } else {
                    this.carrito = [];
                  }
                });
    } else {
      if (localStorage.getItem('carrito')) {
        this.carrito = JSON.parse(localStorage.getItem('carrito'));
      } else {
        this.carrito = [];
      }
    }
  }

  guardarStorage () {
    if (this._platform.is('cordova')) {
      this.storage.setItem('carrito', this.carrito);
    } else {
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  obtenerTotalCompra () {
    let total = 0;
    if (this.carrito.length > 0) {
      this.carrito.forEach(producto => {
          total += Number(producto.precio_compra);
      });
    }
    return total;
  }

  eliminarProductoCarrito (indice: number) {
    this.carrito.splice(indice, 1);
    this.guardarStorage();
    this.precioTotal = this.obtenerTotalCompra();
  }

  realizarCompra () {

    const urlparams = new URLSearchParams();
    this.carrito.forEach(productos => {
      urlparams.append('productos', productos._id);
    });
    urlparams.append('usuario', this._usuarioService.id_usuario);
    const url = `${environment.url_servicio}/orden`;

    return this.http.post(url, urlparams).toPromise();
  }

  obtenerOrdenes () {

    const url = `${environment.url_servicio}/orden/pedido/${this._usuarioService.id_usuario}`;

    return this.http.get(url).toPromise();
  }

  obtenerOrdenById (idorden) {
    const url = `${environment.url_servicio}/orden/pedido/detalle/${idorden}`;

    return this.http.get(url).toPromise();
  }
}
