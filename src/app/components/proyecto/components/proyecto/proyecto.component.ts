import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';
import { UsuarioI } from 'src/app/models/usuario';
import { ProyectoI } from 'src/app/models/proyecto.interface';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {

  userLogged = this.sesionStorage.getId()

  usuarios:UsuarioI[] | any

  proyectoId: any

  constructor(
    private toastService: ToastService,
    private api:ApiService,
    private router:Router,
    private sesionStorage:SesionStorageService,
    private activerouter:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.proyectoId = this.activerouter.snapshot.paramMap.get('id');
    this.api.getUserById(this.userLogged).subscribe(data =>{
     this.usuarios = data.proyectosAsociados
     console.log('la data:')
     console.log(data)
      })
  }

  editarProyecto(id:string){
    this.router.navigate(['proyecto/detalles', id])
  }


}
