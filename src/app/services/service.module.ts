import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingService,
         SharedService,
         SidebarService,
         LoginGuardGuard,
         AdminGuard,
         UsuarioService,
         HospitalService,
         MedicoService,
         SubirArchivoService } from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingService,
    SharedService,
    SidebarService,
    UsuarioService,
    HospitalService,
    MedicoService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService
  ]
})
export class ServiceModule { }
