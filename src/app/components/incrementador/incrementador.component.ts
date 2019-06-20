import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  
  @ViewChild('txtPorcentaje') txtPorcentaje: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('Here : ' + this.porcentaje);
    console.log('Here : ' + this.leyenda)
  }

  incrementar() {

    this.porcentaje = this.porcentaje + 5;
    this.cambioValor.emit(this.porcentaje);
    this.txtPorcentaje.nativeElement.focus();
    
  }

  decrementar() {

    this.porcentaje = this.porcentaje - 5;
    this.cambioValor.emit(this.porcentaje);
    this.txtPorcentaje.nativeElement.focus();
    
  }

  onChanges(newValue: number) {

    // let elemtHtml: any = document.getElementsByName('porcentaje')[0];
    

    if (newValue >= 100) {
      this.porcentaje = 100;
    }else{

      if(newValue <= 0){
        this.porcentaje = 0;
        
      }else{
        this.porcentaje = newValue;
      }

      // elemtHtml.value = this.porcentaje;

      this.txtPorcentaje.nativeElement.value = this.porcentaje;

      this.cambioValor.emit(this.porcentaje);
      
    }
  }

}
