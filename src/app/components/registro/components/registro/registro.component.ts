import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { EventTypes } from 'src/app/models/event-types';
//import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  EventTypes = EventTypes;

  registerForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email, Validators.min(5)]),
    password: new FormControl('', Validators.required),
    rol: new FormControl('Seleccionar Rol')
  })

  constructor(private router:Router, private toastService: ToastService/*, private api:ApiService*/) { }

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
          'Warning toast title',
          'This is a warning toast message.'
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
    if(form.valid){
      this.showToast(EventTypes.Success);
      //this.api.postUser(form).subscribe(data => console.log(data))
      console.log(form.value)
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

}
