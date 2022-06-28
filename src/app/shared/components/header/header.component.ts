import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/core/services/helper/helper.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  rol?: string | null;
  userName?: string | null;
  loggueado: boolean = false;

  constructor(
    private router: Router,
    private sesionStorage: SesionStorageService,
    private helper: HelperService
  ) {}

  ngOnInit(): void {
    this.helper.HelperRol.subscribe((respuesta) => (this.rol = respuesta));
    this.helper.helperNombre.subscribe((resp) => (this.userName = resp));
    if (this.rol) {
      this.loggueado = true;
    }
    /* if (this.sesionStorage.getUserName()) {
      this.rol = this.sesionStorage.getRol();
      this.userName = this.sesionStorage.getUserName();
    } */
  }
  cerrarSesion() {
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
}
