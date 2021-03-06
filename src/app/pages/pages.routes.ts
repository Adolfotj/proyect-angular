import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
// Guards
import { LoginGuardGuard, AdminGuard, VerificarTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';



const pagesRoutes: Routes = [

    // {
    //     path: '',
    //     component: PagesComponent,
    //     canActivate: [LoginGuardGuard],
    //     children: [
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [ VerificarTokenGuard ],
        data: { titulo: 'Dashboard' } 
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
    { path: 'grafica1', component: Graficas1Component, data: { titulo: 'Graficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RsJs' } },
    { path: 'acount-settings', component: AcountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Busqueda' } },
    // Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Manteniemiento de Usuarios' }
    },

    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Manteniemiento de Hospitales' } },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Manteniemiento de Medicos' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico' } },

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    //    ]
    // },

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
