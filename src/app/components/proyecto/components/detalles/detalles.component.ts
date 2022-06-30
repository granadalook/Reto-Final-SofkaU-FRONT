import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

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
    let userId = this.activerouter.snapshot.paramMap.get('id');
    //this.clienteId = clienteid
    /*let token = this.getToken();
    this.api.getUserById(userId).subscribe(data =>{
      this.datosCliente = data;
      this.userId = userId;
      this.editarForm.setValue({
        'nombre': this.datosCliente.nombre,
        'apellido': this.datosCliente.apellido,
        'edad': this.datosCliente.edad,
        'sueldo': this.datosCliente.sueldo
      })
    })*/
  }

}
