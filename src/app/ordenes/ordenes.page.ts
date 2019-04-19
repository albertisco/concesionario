import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Orden } from '../../models/orden.interface';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})
export class OrdenesPage implements OnInit {

  ordenes: Array<Orden>;
  constructor(private _carritoService: CarritoService) { }

  ngOnInit() {
    this._carritoService.obtenerOrdenes()
                        .then((ordenes: any) => {
                          this.ordenes = [];
                          this.ordenes = ordenes.json().pedido;
                        })
                        .catch(error => this.ordenes = []);
  }


}
