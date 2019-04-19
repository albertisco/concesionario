import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Orden } from '../../models/orden.interface';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.page.html',
  styleUrls: ['./ordenes-detalle.page.scss'],
})
export class OrdenesDetallePage implements OnInit {

  orden: Orden;
  idorden: string;
  constructor(private activatedrouter: ActivatedRoute,
              private _carritoService: CarritoService) { }

  ngOnInit() {
    this.activatedrouter.params
                        .subscribe(params => {
                          this.idorden = params['orden'];
                        });
  }

  ionViewWillEnter () {
    this._carritoService.obtenerOrdenById(this.idorden)
          .then((orden: any) => {
            console.log(orden.json());
            this.orden = orden.json().orden;
          })
          .catch(error => console.error(error));
  }

}
