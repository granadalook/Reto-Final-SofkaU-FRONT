import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private sesionStorage: SesionStorageService
  ) {}

  ngOnInit(): void {
    if (this.sesionStorage.getUserName()) {
      this.rol = this.sesionStorage.getRol();
      this.userName = this.sesionStorage.getUserName();
      this.loggueado = true;
    }
  }
  refresh(): void {
    window.location.reload();
}
  cerrarSesion() {
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
}
