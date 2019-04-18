import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Linea } from 'src/models/linea.interface';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias: Array<Linea>;
  constructor(private _productoService: ProductosService) { }

  ngOnInit() {
    this._productoService.getLineas()
                         .then(categorias => {
                          console.log(categorias.json());
                          this.categorias = categorias.json().lineas;
                         })
                         .catch(error => console.error(error));
  }
}
