import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { LoginGuard } from '../guards/login.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: 'home',
        component: HomePage,
        children: [
          {
          path: 'productos',
          children: [
            {path: '' , loadChildren: '../productos/productos.module#ProductosPageModule' },
            {path: 'producto/:codigo', loadChildren: '../producto/producto.module#ProductoPageModule'},
            {path: 'login', loadChildren: '../login/login.module#LoginPageModule'},
            {path: 'carrito', loadChildren: '../carrito/carrito.module#CarritoPageModule', canActivate: [LoginGuard]}
          ]
        },
          { path: 'ordenes',
           children: [
             {path: '' , loadChildren: '../ordenes/ordenes.module#OrdenesPageModule'},
             {path: 'detalle/:orden', loadChildren: '../ordenes-detalle/ordenes-detalle.module#OrdenesDetallePageModule'}
           ]
          }
          ,
          { path: 'categorias',
            children: [
              {path: '', loadChildren: '../categorias/categorias.module#CategoriasPageModule'},
              { path: 'porcategorias/:id', loadChildren: '../por-categorias/por-categorias.module#PorCategoriasPageModule' },
              {path: 'producto/:codigo', loadChildren: '../producto/producto.module#ProductoPageModule'}
            ]
          }
          ,
          {
            path: 'buscador' , children: [
              {path: '', loadChildren: '../buscador/buscador.module#BuscadorPageModule'},
              {path: 'detalle/:codigo' , loadChildren: '../producto/producto.module#ProductoPageModule'}
            ]
          }
          ,
          { path: '', redirectTo: 'productos', pathMatch: 'full' }
        ],
      },
      {
        path: '', redirectTo: '/home/productos', pathMatch: 'full'
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
