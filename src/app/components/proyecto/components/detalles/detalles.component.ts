import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';
import { ProyectoI } from 'src/app/models/proyecto.interface';
import { HistoriaI }from 'src/app/models/historia';

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

  detallesForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    arquitectoId: new FormControl(''),
    liderTecnicoId: new FormControl('')
  })

  historiasForm = new FormGroup({
    tituloHistoriaUsuario: new FormArray([
      new FormControl('')
    ]),
  })

  constructor(private sesionStorage:SesionStorageService, private api:ApiService, private activerouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.Historias = [{tituloHistoriaUsuario: 'hola'}, {tituloHistoriaUsuario: 'mundo'}]
    let proyectoId = this.activerouter.snapshot.paramMap.get('id');
    //this.clienteId = clienteid
    //let token = this.getToken();
    this.api.getProyectoById(proyectoId).subscribe(data =>{
      this.datosProyecto = data;
      let idLider = data.liderTecnicoId
      //obtener los datos del lider tecnico
      this.api.getUserById(idLider).subscribe(data => {
        console.log('data lider')
        console.log(data)
        this.detallesForm.setValue({
          'nombre': this.datosProyecto.nombre,
          'arquitectoId': this.datosProyecto.arquitectoId,
          'liderTecnicoId': data.nombreCompleto
        })
      })
      console.log('data')
      console.log(this.datosProyecto)
      this.proyectoId = proyectoId;
      this.historiasForm.setValue({
        'tituloHistoriaUsuario': this.Historias
      })
      console.log('historias')
      console.log(this.historiasForm)
    })

  }
  getDesarrolladores(){
    return this.detallesForm.get('desarrolladorId') as FormArray;
  }

  getHistorias(){
    return this.historiasForm.get('tituloHistoriaUsuario') as FormArray;

  }
}
