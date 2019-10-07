import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean = true;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedico(termino: string) {

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this._medicoService.buscarMedicos(termino)
    .subscribe((medicoDB: Medico[]) => {
      this.medicos = medicoDB;
      this.cargando = false;
    });

  }

  cargarMedicos() {
    this._medicoService.cargarMedicos()
      .subscribe(medicos => {
          this.medicos = medicos;          
      });
  }

  crearMedico() {}

  borrarMedico(medico: Medico) {

    this._medicoService.borrarMedico(medico._id)
      .subscribe(() => this.cargarMedicos());
  }

}
