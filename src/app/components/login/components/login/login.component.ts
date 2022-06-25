import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  public formularioLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(8)],
    ],
  });

  constructor(private formBuilder: FormBuilder) {
    this.loginUser = {
      email: '',
      password: '',
    };
  }
  ngOnInit(): void {}
 

  enviarFormulario() {
    console.log(this.loginUser);
    this.loginUser.email = '';
    this.loginUser.password = '';
  }
}
