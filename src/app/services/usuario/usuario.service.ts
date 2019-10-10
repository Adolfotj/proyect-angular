import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivo: SubirArchivoService) {

    console.log('Service de User ready');
    this.cargarStorage();

  }

  renuevaToken() {
    let url = URL_SERVICES + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map((res: any) => {

          this.token = res.token;
          localStorage.setItem('token', this.token);
          console.log('Renueva Token');
          return true;

        }),
        catchError(err => {
          this.router.navigate(['/login']);
          swal('No se pudo Renovar Token ', 'Renovar token fallido', 'error');
          return throwError(err);
        })

      );
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle(token: string) {

    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, { token })
      .pipe(
        map((res: any) => {
          this.guardarStorage(res.id, res.token, res.usuario, res.menu);
          console.log(res);
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
        map((res: any) => {

          this.guardarStorage(res.id, res.token, res.usuario, res.menu)

          return true;

        }),
        catchError(err => {
          swal('Error en el Login ', err.error.mensaje, 'error');
          return throwError(err);
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
        }),
        catchError(err => {
          console.log(err.error.mensaje);
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
        })
      );

  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICES + '/usuario/' + usuario._id;

    url += '?token=' + this.token;

    return this.http.put(url, usuario)
      .pipe(

        map((res: any) => {

          if (usuario._id === this.usuario._id) {
            let usuarioDB: Usuario = res.usuario;
            this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
          }

          swal('Usuario actualizado', usuario.nombre, 'success');

          return true;

        })

      );

  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivo.subirArchivo(archivo, 'usuarios', id)
      .then((res: any) => {

        console.log(res);
        this.usuario.img = res.usuario.img;
        this.guardarStorage(id, this.token, this.usuario, this.menu);
        swal('Imagen Actualizado', this.usuario.nombre, 'success');
      })
      .catch(res => {
        console.log(res);
      })
  }

  cargarUsuarios(desde: number = 0) {

    let url = URL_SERVICES + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {

    let url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.usuarios)
      );
  }

  borrarUsuario(id: string) {

    let url = URL_SERVICES + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(
        map(resp => {
          swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
          return true;
        })
      );

  }



}
