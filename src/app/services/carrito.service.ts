import { Injectable } from '@angular/core';
import { Producto } from 'src/models/producto.interface';
import { AlertController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito: Array<Producto>;

  constructor(private alert: AlertController,
              private location: Location,
              public storage: NativeStorage,
              private _platform: Platform) {
                this.cargarStorage();
  }

   async agregarCarrito(productoAgregar: Producto) {
    let alert = null;
    if (this.carrito.length > 0) {
        const ocurrencia = this.carrito.find((producto) => {
          return producto.codigo === productoAgregar.codigo;
        });
        console.log('ocurrencia', ocurrencia);
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
            this.location.back();
          }
        }
      ]
    });
    await alert.present();
  }

  cargarStorage () {
    console.log('cargar storage');
    if (this._platform.is('cordova')) {
      this.storage.getItem('carrito')
                .then( carrito => {
                  console.log('then');
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
    console.log(this.carrito.length);
    if (this._platform.is('cordova')) {
      this.storage.setItem('carrito', this.carrito);
    } else {
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }
}
