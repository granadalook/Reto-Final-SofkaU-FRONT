import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutenticacionService } from 'src/app/core/services/Autenticacion/autenticacion.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { UsuarioI } from 'src/app/models/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggueado: boolean = false;
  usuario?: UsuarioI;
  usuario$?: Subscription;

  constructor(
    private router: Router,
    private autenticacionService: AutenticacionService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.usuario$ = this.autenticacionService.user$.subscribe((res) => {
      this.usuario = res;
      this.loggueado = false;
      if (this.usuario.rol) {
        this.loggueado = true;
      }
    });
  }
  ngOnDrestroy() {
    this.usuario$?.unsubscribe();
  }
  cerrarSesion() {
    this.toastService.showInfoToast(
      'gracias por visitarnos',
      'Que tengas un feliz dia'
    );
    this.autenticacionService.logOut();
    this.router.navigate(['login']);
  }
}
