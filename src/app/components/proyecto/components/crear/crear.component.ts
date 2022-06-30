import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';
import { UsuarioI } from 'src/app/models/usuario';
import { ProyectoI } from 'src/app/models/proyecto.interface';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  Desarrolladores:UsuarioI[] | any;

  Lideres:UsuarioI[] | any;

  proyectoForm = new FormGroup({
    nombre: new FormControl(''),
    arquitectoId: new FormControl(this.sesionStorage.getId()),
    liderTecnicoId: new FormControl(''),
    desarrolladorId: new FormArray([
      new FormControl('')
    ]),
  })

  constructor(
    private toastService: ToastService,
    private api:ApiService,
    private router:Router,
    private activerouter:ActivatedRoute,
    private sesionStorage:SesionStorageService,
    private fb:FormBuilder

    ) { }

  ngOnInit(): void {
    let userRol1 = 'Desarrollador';
    let userRol2 = 'LiderTecnico'
    this.api.getUserByRol(userRol1).subscribe(data => this.Desarrolladores = data)
    this.api.getUserByRol(userRol2).subscribe(data => this.Lideres = data)
  }

  postForm(form:ProyectoI){
    if(this.proyectoForm.valid){
      this.api.crearProyecto(form).subscribe(data => {
        if(data){
          this.toastService.showSuccessToast('Correcto', 'Proyecto Creado Exitosamente')
          console.log('data:')
          console.log(data)
          //asignando el id del arquitecto a una variable
          let arqui = data.arquitectoId
          let lider = data.liderTecnicoId
          //asignando el id del proyecto a una variable
          let idProyecto = data.proyectoId
          this.api.getUserById(arqui).subscribe(data => {
            //asignando los datos del arquitecto a una variable
            let archi = data
            //se limpia el array de proyectos
            archi.idProyectosAsociados = []
            //se agrega el id del proyecto actual al arreglo
            archi.idProyectosAsociados.push(idProyecto)
            //se envían los datos al backend
            this.api.postProyectoUser(archi).subscribe(data => console.log(data))
          })
          this.api.getUserById(lider).subscribe(data => {
            //asignando los datos del lider Tecnico a una variable
            let lider = data
            //se limpia el array de proyectos
            lider.idProyectosAsociados = []
            //se agrega el id del proyecto actual al arreglo
            lider.idProyectosAsociados.push(idProyecto)
            //se envían los datos al backend
            this.api.postProyectoUser(lider).subscribe(data => console.log(data))
          })
          setTimeout(()=>{
            this.router.navigate(['proyecto'])
          }, 2000)
        }
      })
      console.log(form)
    }else{
      this.toastService.showErrorToast('Error', 'Campos Inválidos')
    }
  }

  getDesarrolladores(){
    return this.proyectoForm.get('desarrolladorId') as FormArray;
  }

  addDesarrollador(){
    const control = <FormArray>this.proyectoForm.controls['desarrolladorId']
    control.push(new FormControl(''))
  }

  removerDesarrollador(index: number){
    const control = <FormArray>this.proyectoForm.controls['desarrolladorId']
    control.removeAt(index)
  }

  cancelar(){
    this.router.navigate(['/proyecto'])
  }
}
