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
  ngOnInit(): void {}
  showToast(type: EventTypes) {
    switch (type) {
      case EventTypes.Success:
        this.toastService.showSuccessToast(
          'bienvenido',
          'Muchas gracias por visitarnos'
        );
        break;
      case EventTypes.Warning:
        this.toastService.showWarningToast(
          'email incorrecto',
          'Email de inicio de secion incorrecto'
        );
        break;
      case EventTypes.Error:
        this.toastService.showErrorToast(
          'usuario no registrado',
          'Verifica tu email y contraseña'
        );
        break;
      default:
        this.toastService.showInfoToast(
          'Info toast title',
          'This is an info toast message.'
        );
        break;
    }
  }
  enviarFormulario() {
    this.autenticacionService.loginUserPassword(this.loginUser).subscribe(
      (data) => {
        if (data) {
          this.showToast(EventTypes.Success);
          this.sesionStorage.setUserName(data.nombreCompleto);
          this.sesionStorage.setRol(data.rol);
          setTimeout(() => {
            this.loginUser.email = '';
            this.loginUser.password = '';
            this.route.navigate(['homepage']);
          }, 2500);
        }
      },
      (err: HttpResponse<string>) => {
        if (err.status === 400) {
          this.showToast(EventTypes.Error);
        }
      }
    );
  }
}
