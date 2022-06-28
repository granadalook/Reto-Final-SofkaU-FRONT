import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArquitectoGuard } from './guard/guardianArquitecto/arquitecto.guard';
import { ProteccionGuard } from './guard/guardianDesarrollador/proteccion.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/login/login.module').then(
        (modulo) => modulo.LoginModule
      ),
  },
  {
    path: 'homepage',
    canActivate: [ProteccionGuard],
    loadChildren: () =>
      import('./components/homepage/homepage.module').then(
        (modulo) => modulo.HomepageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then(
        (modulo) => modulo.LoginModule
      ),
  },
  {
    path: 'registro',
    canActivate: [ArquitectoGuard],
    loadChildren: () =>
      import('./components/registro/registro.module').then(
        (modulo) => modulo.RegistroModule
      ),
  },
  {
    path: 'proyecto',
    canActivate: [ArquitectoGuard],
    loadChildren: () =>
      import('./components/proyecto/proyecto.module').then(
        (modulo) => modulo.ProyectoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
