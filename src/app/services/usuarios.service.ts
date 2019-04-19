import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token: string;
  id_usuario: string;
  constructor(private http: Http,
              private platform: Platform,
              private storage: NativeStorage) {
              this.cargarStorage();
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

  guardarStorage () {
    if (this.platform.is('cordova')) {
      this.storage.setItem('token', this.token);
      this.storage.setItem('idusuario', this.id_usuario);
    } else {
      if (this.token) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('idusuario', this.id_usuario);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('idusuario');
      }
    }
  }

  cargarStorage () {
    if (this.platform.is('cordova')) {
      this.storage.getItem('token')
                  .then(token => {
                    if (token) {
                      this.token = token;
                    }
                  });
      this.storage.getItem('idusuario')
                  .then(id => {
                    this.id_usuario = id;
                  });
    } else {
      if (localStorage.getItem('token') && localStorage.getItem('idusuario')) {
        this.token = localStorage.getItem('token');
        this.id_usuario = localStorage.getItem('idusuario');
      }
    }
  }

  cerrar_session () {
    this.token = null;
    this.id_usuario = null;
    this.guardarStorage();
  }


}
