import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  valor: string = '30%';

  porcentaje1: number = 0;
  porcentaje2: number = 20;

  constructor() { 
    this.valor = '40%';
    //this.valor = this.satinazacion.bypassSe
  }

  ngOnInit() {
    
  } 

  actualizar(event: number) {
    
    this.porcentaje1 = event; 

  }

}
