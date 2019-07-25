import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router) {

    console.log('Service de User ready');
    this.cargarStorage();

  }

  estaLogueado() {
    return( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuaario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));

        this.usuario = usuario;
        this.token = token;
  }

  loginGoogle(token: string) {
    
    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, { token })
        .pipe(
          map((res: any) => {
            this.guardarStorage(res.id, res.token, res.usuario);
            return true;
          })
        );
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';
    return this.http.post(url, usuario)
        .pipe(
          map((res:any) => {

            this.guardarStorage(res.id, res.token, res.usuario)

            return true;

          })
          );
  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICES + '/usuario';

    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));

  }

}
