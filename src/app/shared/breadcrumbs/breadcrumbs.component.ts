import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

interface Pagina {
  name: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor(private router: Router,
              private title: Title,
              private meta: Meta) {
    this.titulo = '';
    
    this.getDataRoute().subscribe((data) => {
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);
      
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      this.meta.updateTag(metaTag);
      
    })
   }

  ngOnInit() {
  }

  getDataRoute() {

    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => evento.snapshot.data )
    );

  }

}
