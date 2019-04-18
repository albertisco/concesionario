import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token: string;
  id_usuario: string;
  constructor(private http: Http) {
  }

  login (correo: string, password: string) {
    console.log(correo);
    const params = new URLSearchParams();
    params.append('correo', correo);
    params.append('password', password);

    const url = `${environment.url_servicio}/usuario/login`;
    console.log(url);
    return this.http.post(url, params).toPromise();
  }
}
