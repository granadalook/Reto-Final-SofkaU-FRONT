import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from 'src/app/core/services/Autenticacion/autenticacion.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { UsuarioI } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class ArquitectoGuard implements CanActivate {
  user$?: UsuarioI;
  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router,
    private toastService: ToastService
  ) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.autenticacionService.user$.subscribe((res) => (this.user$ = res));
        if (this.user$?.rol === 'Arquitecto' || this.user$?.rol === 'LiderTecnico') {
      return true;
    }
    this.toastService.showWarningToast(
      'lo sentimos',
      'Disponible solo a arquitectos'
    );
    this.router.navigate(['login']);
    return true;
  }
}
