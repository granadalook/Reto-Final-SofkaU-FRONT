import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    private toastService: ToastService
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
          'Success toast title',
          'This is a success toast message.'
        );
        break;
      case EventTypes.Warning:
        this.toastService.showWarningToast(
          'Warning toast title',
          'This is a warning toast message.'
        );
        break;
      case EventTypes.Error:
        this.toastService.showErrorToast(
          'VAlORES INCORRECTOS',
          'INTENTE DE NUEVO IMBESIL'
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
    this.showToast(EventTypes.Success);
    console.log(this.loginUser);
    setTimeout(() => {
      console.log(this.loginUser);
      this.loginUser.email = '';
      this.loginUser.password = '';
    }, 2500);
  }
}
