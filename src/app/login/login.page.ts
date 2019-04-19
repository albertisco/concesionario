import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string;
  password: string;

  constructor(private _usuarioService: UsuariosService,
              private router: Router,
              private alert: AlertController) { }

  ngOnInit() {
    this.correo = '';
    this.password = '';
  }

  logear() {
    this._usuarioService.login(this.correo , this.password)
                        .then( (resp) => {
                          const respjson = resp.json();
                          this._usuarioService.token = respjson.token;
                          this._usuarioService.id_usuario = respjson.usuarioLogin._id;
                          this._usuarioService.guardarStorage();
                          this.router.navigate(['/home/productos']);
                        })
                        .catch( async (error) => {
                          const errorjson = error.json();
                          const  alert = await this.alert.create({
                            header: 'Error al loguear',
                            message: errorjson.mensaje,
                            buttons: [
                              {
                                text: 'OK',
                                handler: () => {
                                  this.correo = '';
                                  this.password = '';
                                }
                              }
                            ]
                          });

                          await alert.present();
                        });
  }


}
