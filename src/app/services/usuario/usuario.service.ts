import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivo: SubirArchivoService) {

    console.log('Service de User ready');
    this.cargarStorage();

  }

  estaLogueado() {
    return( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
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
        })
      );

  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICES + '/usuario/' + usuario._id;

    url += '?token=' + this.token;    

    return this.http.put(url, usuario)
        .pipe(

          map((res: any) => {

            console.log(res);

            this.guardarStorage(res.usuario._id, this.token, res.usuario);

            swal('Usuario Actualizado', usuario.nombre, 'success');
            return true;
          })

        );

  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivo.subirArchivo(archivo, 'usuarios', id)
      .then( (res: any) => {

        console.log(res);
        this.usuario.img = res.usuario.img;
        this.guardarStorage(id, this.token, this.usuario);
        swal('Imagen Actualizado', this.usuario.nombre, 'success');
      })
      .catch(res => {
        console.log(res);
      })
  }



}