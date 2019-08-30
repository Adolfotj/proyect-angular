import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';



const pagesRoutes: Routes = [

    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
            { path: 'grafica1', component: Graficas1Component, data: { titulo: 'Graficas'} },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RsJs'} },
            { path: 'acount-settings', component: AcountSettingsComponent, data: { titulo: 'Ajustes del Tema'} },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil'} },
            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Manteniemiento de Usuarios'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
    
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
