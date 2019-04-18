import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule'}
  /*{ path: 'carrito', loadChildren: './carrito/carrito.module#CarritoPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'ordenes-detalle', loadChildren: './ordenes-detalle/ordenes-detalle.module#OrdenesDetallePageModule' },
  { path: '', redirectTo: 'home/productos', pathMatch: 'full' },
  { path: '**', redirectTo: 'home/productos', pathMatch: 'full' }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
