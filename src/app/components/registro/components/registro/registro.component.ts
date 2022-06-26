import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { EventTypes } from 'src/app/models/event-types';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  EventTypes = EventTypes;

  registerForm = new FormGroup({
    nombreCompleto: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
    rol: new FormControl('Seleccionar Rol')
  })

  constructor(private router:Router, private toastService: ToastService, private api:ApiService) { }

  ngOnInit(): void {
  }

  showToast(type: EventTypes) {
    switch (type) {
      case EventTypes.Success:
        this.toastService.showSuccessToast(
          'Correcto',
          'Usuario Creado con Exito'
        );
        break;
      case EventTypes.Warning:
        this.toastService.showWarningToast(
          'Alerta',
          'El usuario ya existe'
        );
        break;
      case EventTypes.Error:
        this.toastService.showErrorToast(
          'Error',
          'Campos inválidos'
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

  postForm(form:any){
    if(this.registerForm.valid){
      this.showToast(EventTypes.Success);
      this.api.postUser(form).subscribe(data =>
        console.log(data))
      console.log(form)
      setTimeout(()=>{
        this.router.navigate([''])
      }, 2000)
    }else{
      this.showToast(EventTypes.Error)
    }
  }

  cancelar(){
    this.router.navigate([''])
  }
/*
  ostForm(form:any){
    if(this.registerForm.valid){
      this.api.postUser(form).subscribe(data => {
        console.log(`data: ${data}`)

      }, err=> {
        if(err.status == 400){
          this.showToast(EventTypes.Warning)
          setTimeout(()=>{
            this.router.navigate([''])
          }, 2000)
        }
      })

      this.showToast(EventTypes.Success)
      console.log(form)
      setTimeout(()=>{
        this.router.navigate([''])
      }, 3000)
    }else{
      this.showToast(EventTypes.Error)
    }
  }*/

}
