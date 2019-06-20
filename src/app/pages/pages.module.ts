import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';

import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';


// Modulos
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
// Rutas
import { PAGES_ROUTES } from './pages.routes';
// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaDounetComponent } from '../components/grafica-dounet/grafica-dounet.component';
// ng2-chart
import { ChartsModule } from 'ng2-charts';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficaDounetComponent
    ],
    imports: [ 
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
     ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ],
    providers: [],
})
export class PagesModule {}