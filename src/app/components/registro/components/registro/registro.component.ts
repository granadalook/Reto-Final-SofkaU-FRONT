import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registerForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email, Validators.min(5)]),
    password: new FormControl('', Validators.required),
    rol: new FormControl('Seleccionar Rol')
  })

  constructor(private router:Router/*, private api:ApiService*/) { }

  ngOnInit(): void {
  }

  postForm(form:any){
    //this.api.postUser(form).subscribe(data => console.log(data))
    console.log(form)
    setTimeout(()=>{
      this.router.navigate([''])
    }, 2000)
  }

  cancelar(){
    this.router.navigate([''])
  }
}
