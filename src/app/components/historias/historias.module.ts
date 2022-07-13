import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriasRoutingModule } from './historias-routing.module';
import { HistoriasComponent } from './components/historias/historias.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoriasCarsComponent } from './components/historias-cars/historias-cars.component';
import { TareasComponent } from './components/tareas/tareas.component';

@NgModule({
  declarations: [HistoriasComponent, HistoriasCarsComponent, TareasComponent],
  imports: [
    CommonModule,
    HistoriasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HistoriasModule {}
