import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';
import { ProyectoI } from 'src/app/models/proyecto.interface';
import { HistoriaI }from 'src/app/models/historia';
import { UsuarioI } from 'src/app/models/usuario';
import { ToastService } from 'src/app/core/services/Toast/toast.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  Historias:HistoriaI[] | any;

  datosProyecto: ProyectoI | any;

  proyectoId: any;

  desarrolladores: string[] | any

  Desarrolladores:UsuarioI[] | any;

  proyectoForm = new FormGroup({
    desarrolladorId: new FormArray([
      new FormControl('')
    ]),
  })

  detallesForm = new FormGroup({
    nombre: new FormControl(''),
    arquitectoId: new FormControl(''),
    liderTecnicoId: new FormControl('')
  })

  historiasForm = new FormGroup({
    tituloHistoriaUsuario: new FormArray([
      new FormControl('')
    ]),
  })

  constructor(
    private sesionStorage:SesionStorageService,
    private toastService:ToastService,
    private api:ApiService,
    private activerouter:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    let userRol1 = 'Desarrollador';
    this.api.getUserByRol(userRol1).subscribe(data => this.Desarrolladores = data)
    //this.Historias = [{tituloHistoriaUsuario: 'hola'}, {tituloHistoriaUsuario: 'mundo'}]
    this.proyectoId = this.activerouter.snapshot.paramMap.get('id');
    this.api.getHistoriasByIdProyecto(this.proyectoId).subscribe(datos => {
      this.Historias = datos;

      this.historiasForm.setValue({
        'tituloHistoriaUsuario': JSON.parse(datos.tituloHistoriaUsuario)
      })
    })
    //this.clienteId = clienteid
    //let token = this.getToken();
    this.api.getProyectoById(this.proyectoId).subscribe(data =>{
      this.datosProyecto = data;
      let idLider = data.liderTecnicoId
      //obtener los datos del lider tecnico
      this.api.getUserById(idLider).subscribe(data => {
     
        this.detallesForm.setValue({
          'nombre': this.datosProyecto.nombre,
          'arquitectoId': this.datosProyecto.arquitectoId,
          'liderTecnicoId': data.nombreCompleto
        })
      })


    })
  }

  postForm(form:ProyectoI){

    this.api.getUserById(form.desarrolladorId).subscribe(data => {
      let developer = data
      developer.idProyectosAsociados = []
      developer.idProyectosAsociados.push(this.proyectoId)

      this.api.postProyectoUser(developer).subscribe(data => )
    })
    this.toastService.showSuccessToast('Correcto','Cambios Aceptados')
  }

  getDesarrolladores(){
    return this.proyectoForm.get('desarrolladorId') as FormArray;
  }

  getHistorias(){
    return this.historiasForm.get('tituloHistoriaUsuario') as FormArray;
  }

  volver(){
    this.router.navigate(['proyecto'])
  }

  agregar(){
    this.router.navigate(['proyecto/agregar'])
  }
}
