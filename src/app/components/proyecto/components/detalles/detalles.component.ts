import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';
import { ProyectoI } from 'src/app/models/proyecto.interface';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  datosProyecto: ProyectoI | any;

  proyectoId: any;

  desarrolladores: string[] | any

  detallesForm = new FormGroup({
    nombre: new FormControl(''),
    arquitectoId: new FormControl(''),
    liderTecnicoId: new FormControl(''),
    desarrolladorId: new FormArray([
      new FormControl('')
    ]),
  })

  constructor(private sesionStorage:SesionStorageService, private api:ApiService, private activerouter:ActivatedRoute) { }

  ngOnInit(): void {
    let proyectoId = this.activerouter.snapshot.paramMap.get('id');
    //this.clienteId = clienteid
    //let token = this.getToken();
    this.api.getProyectoById(proyectoId).subscribe(data =>{
      this.datosProyecto = data;
      this.desarrolladores = data.desarrolladorId
      console.log('data')
      console.log(this.datosProyecto)
      this.proyectoId = proyectoId;
      this.detallesForm.setValue({
        'nombre': this.datosProyecto.nombre,
        'arquitectoId': this.datosProyecto.arquitectoId,
        'liderTecnicoId': this.datosProyecto.liderTecnicoId,
        'desarrolladorId': ['111111111', 'ooooooo']
      })
    })
  }
  getDesarrolladores(){
    return this.detallesForm.get('desarrolladorId') as FormArray;
  }
}
