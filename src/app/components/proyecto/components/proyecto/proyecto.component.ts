import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {

  proyectoForm = new FormGroup({
    nombre: new FormControl(''),
    arquitectoId: new FormControl(this.sesionStorage.getId()),
    liderTecnicoId: new FormControl(''),
    desarrolladorId: new FormControl(''),
  })

  constructor(private toastService: ToastService, private api:ApiService, private router:Router, private sesionStorage:SesionStorageService ) { }

  ngOnInit(): void {
  }

  postForm(form:any){
    console.log(`Enviar Formulario:`)
    console.log(form)
  }

  cancelar(){
    this.router.navigate(['homepage'])
  }
}
