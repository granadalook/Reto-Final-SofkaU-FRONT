import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registerForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email, Validators.min(5)]),
    password: new FormControl('', Validators.required)
  })

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  postForm(form:any){
    console.log(form)
  }

  cancelar(){
    this.router.navigate([''])
  }
}
