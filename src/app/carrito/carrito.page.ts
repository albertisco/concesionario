import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(public _carritoService: CarritoService,
              private alert: AlertController) { }

  ngOnInit() {
  }

  eliminarProducto(indice: number) {
    this._carritoService.eliminarProductoCarrito(indice);
  }

  comprar () {
    this._carritoService.realizarCompra()
                        .then(resultado => {
                          setTimeout( async () => {
                            this._carritoService.carrito = [];
                            this._carritoService.guardarStorage();
                            const alert = await this.alert.create({
                              header: 'Compra finalizada',
                              message: 'Compra realizada con éxito',
                              buttons: ['OK']
                            });
                            await alert.present();
                          }, 2000);
                        })
                        .catch(error => console.error(error));
  }

}
