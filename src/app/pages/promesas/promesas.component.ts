import { Component, OnInit } from '@angular/core';
import { resolve, reject } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    let xpromesa = this.contar();
    xpromesa.then(
      () => console.log('Finalizo !!')
    ).catch( error => console.error('Error in the promise ', error))

  }

  ngOnInit() {
  }

  contar() {

    let promesa = new Promise((resolve, reject) => {

      let contador = 0;
      let intervalo = setInterval( () => {

        contador +=1;
        console.log(contador);

        if (contador === 3) {
          resolve();
          //reject('wrong in datbase')
          clearInterval(intervalo);
        }
      }, 1000);
    });

    return promesa;


  }

}
