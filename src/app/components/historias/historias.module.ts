import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriasRoutingModule } from './historias-routing.module';
import { HistoriasComponent } from './components/historias/historias.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HistoriasComponent
  ],
  imports: [
    CommonModule,
    HistoriasRoutingModule,
    FormsModule,
        ReactiveFormsModule
  ]
})
export class HistoriasModule { }
