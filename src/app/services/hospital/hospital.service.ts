import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales() {

    let url = URL_SERVICES + '/hospital';    

    return this.http.get(url)
        .pipe(

          map((res: any) => {

            return res.hospitales;

          })

        );

  }

  obtenerHospital(id: string) {

    let url = URL_SERVICES + '/hospital/' + id;    

    return this.http.get(url)
        .pipe(
          map((res: any) => {
            return res.hospital;
          })
        );
  }

  borrarHospital( id: string ) {

    let url = URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
        .pipe(
          map( resp => {
            swal('Hospital borrado', 'El hospital a sido eliminado correctamente', 'success');
            return true;
          })
        );

  }

  crearHospital( nombre: string ) {

    let url = URL_SERVICES + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
        .pipe(
          map( (resp: any) => resp.hospital)
        );

  }

  buscarHospitales(termino: string) {

    let url = URL_SERVICES + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.hospitales)
      );
  }

  actualizarHospital( hospital: Hospital) {

    let url = URL_SERVICES + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
          .pipe(
            map( (resp: any) => {
              swal('Hospital Actualizado', hospital.nombre, 'success');
              return resp.hospital;
            })
          );

  }
  
}
