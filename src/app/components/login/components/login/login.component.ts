import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/core/services/Autenticacion/autenticacion.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { EventTypes } from 'src/app/models/event-types';
import { LoginUser } from 'src/app/models/loginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email?: string;
  password?: string;
  loginUser: LoginUser;
  EventTypes = EventTypes;
  nombre?: string;

  public formularioLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(8)],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private autenticacionService: AutenticacionService,
    private route: Router,
    private sesionStorage: SesionStorageService
  ) {
    this.loginUser = {
      email: '',
      password: '',
    };
  }
  ngOnInit(): void {
    this.sesionStorage.logOut();
  }
  enviarFormulario() {
    this.autenticacionService.loginUserPassword(this.loginUser).subscribe(
      (data) => {
        if (data) {
          this.nombre = data.nombreCompleto;
          this.toastService.showSuccessToast('bienvenido', `${this.nombre}`);
          this.sesionStorage.setUserName(data.nombreCompleto);
          this.sesionStorage.setRol(data.rol);
          this.sesionStorage.setId(data.usuarioId);
          setTimeout(() => {
            this.route.navigate(['homepage']);
          }, 1000);
        }
      },
      (err: HttpResponse<string>) => {
        if (err.status === 404) {
          this.toastService.showErrorToast(
            'usuario no registrado',
            'Verifica tu email y contraseña'
          );
        }
      }
    );
  }
}
