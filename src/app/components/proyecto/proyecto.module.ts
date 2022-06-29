import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectoRoutingModule } from './proyecto-routing.module';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearComponent } from './components/crear/crear.component';
import { DetallesComponent } from './components/detalles/detalles.component';


@NgModule({
  declarations: [
    ProyectoComponent,
    CrearComponent,
    DetallesComponent
  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProyectoModule { }
