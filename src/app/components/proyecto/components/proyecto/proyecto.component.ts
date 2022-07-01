import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';
import { UsuarioI } from 'src/app/models/usuario';
import { ProyectoI } from 'src/app/models/proyecto.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss'],
})
export class ProyectoComponent implements OnInit {

  userLogged = this.sesionStorage.getId()
  userLoggedRol = this.sesionStorage.getRol()

  usuarios:UsuarioI[] | any

  proyectoId: any

  eliminando: ResponseI | undefined

  eliminando$?: Subscription

  mostrar:boolean = false

  constructor(
    private toastService: ToastService,
    private api:ApiService,
    private router:Router,
    private sesionStorage:SesionStorageService,
    private activerouter:ActivatedRoute
    ) {}

  ngOnInit(): void {
    if(this.userLoggedRol === 'LiderTecnico'){
      this.mostrar = true
    }
    this.traerProyectosByUsuario()
    this.eliminando$ = this.api.eliminado$.subscribe(res => {
      this.eliminando = res
      console.log('eliminando', this.eliminando)
      if(this.eliminando === null){
        this.traerProyectosByUsuario()
      }
    })
  }

  ngOnDestroy(){
    this.eliminando$?.unsubscribe()
  }

  traerProyectosByUsuario(){
    this.proyectoId = this.activerouter.snapshot.paramMap.get('id');
    this.api.getUserById(this.userLogged).subscribe(data =>{
     this.usuarios = data.proyectosAsociados
     console.log('la data', data)
      })
  }

  editarProyecto(id:string){
    this.router.navigate(['proyecto/detalles', id])
  }

  eliminar(id:string){
    this.api.deleteProyecto(id).subscribe(data => console.log(data))
    this.toastService.showSuccessToast('Correcto', 'Proyecto Eliminado')
  }
}
