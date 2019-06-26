import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, retry, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcription: Subscription;

  constructor() {
   

    this.subcription = this.retornaObservable().subscribe(
         number => console.log('Observer ', number),
         error => console.log('Error in the Obser ', error),
         () => console.log('Finish observ')
         
      );
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Se cerro la pagina !');
    this.subcription.unsubscribe();
  }

  retornaObservable(): Observable<any> {

     return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;
      let intervalo = setInterval( () => {

        contador +=1;

        const salida = {
          valor: contador
        };

        observer.next(salida);        

        // if (contador === 3) {
          
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
          
        //   //clearInterval(intervalo);
        //   observer.error('Down server');
        // }
      }, 1000);

    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        if ((valor % 2 ) === 1) {
          return true;
        }else {
          return false;
        }
      })
    );    

    

  }

}
