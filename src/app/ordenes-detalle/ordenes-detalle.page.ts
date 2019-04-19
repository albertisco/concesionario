import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Orden } from '../../models/orden.interface';
import { CarritoService } from '../services/carrito.service';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.page.html',
  styleUrls: ['./ordenes-detalle.page.scss'],
})
export class OrdenesDetallePage implements OnInit {

  orden: Orden;
  idorden: string;
  constructor(private activatedrouter: ActivatedRoute,
              private _carritoService: CarritoService,
              private location: Location,
              private toast: ToastController) {
              }

  ngOnInit() {
    this.activatedrouter.params
    .subscribe(params => {
      this.idorden = params['orden'];
      this._carritoService.obtenerOrdenById(this.idorden)
      .then((orden: any) => {
        console.log(orden.json());
        this.orden = orden.json().orden;
      })
      .catch(error => console.error(error));
    });
  }

  eliminarOrden () {
    this._carritoService.eliminarOrdenById(this.orden._id)
                        .then( async (eliminar) => {
                          const toast = await this.toast.create({
                            message: 'Orden borrada con éxito',
                            duration: 3000
                          });
                          toast.present();
                          this.location.back();
                        })
                        .catch();
  }

}
