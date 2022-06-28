import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriasComponent } from './components/historias/historias.component';

const routes: Routes = [
  {
    path:'',
    component:HistoriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriasRoutingModule { }
