import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './components/crear/crear.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';

const routes: Routes = [
  {
    path: '',
    component: ProyectoComponent
  },
  {
    path: 'crear',
    component: CrearComponent,
  },
  {
    path: 'detalles/:id',
    component: DetallesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule { }
