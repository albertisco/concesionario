import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagenPipe'
})
export class ImagenPipePipe implements PipeTransform {

  transform(codigo: any): any {
    return `${environment.url_imagenes}/${codigo}.jpg`;
  }

}
