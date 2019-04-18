import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipePipe } from './imagen-pipe.pipe';

@NgModule({
  declarations: [ImagenPipePipe],
  imports: [
    CommonModule
  ],
  exports: [ImagenPipePipe]
})
export class PipesModule { }
