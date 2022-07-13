import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../../core/services/Autenticacion/autenticacion.service';
import { ToastService } from '../../core/services/Toast/toast.service';
import { UsuarioI } from '../../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class ProteccionGuard implements CanActivate {
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
    if (this.user$?.rol) {
      return true;
    }
    this.toastService.showWarningToast('lo sentimos', 'Usuario no registrado');
    this.router.navigate(['login']);
    return true;
  }
}
