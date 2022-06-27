import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'homepage',
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
    loadChildren: () =>
      import('./components/registro/registro.module').then(
        (modulo) => modulo.RegistroModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
