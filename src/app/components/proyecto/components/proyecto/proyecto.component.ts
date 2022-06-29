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

  proyectos: ProyectoI

  proyects: ProyectoI | any

  constructor(
    private toastService: ToastService,
    private api:ApiService,
    private router:Router
    ) { this.proyectos = {nombre: '100 de cilantro', arquitectoId: '010101', liderTecnicoId: '102030', desarrolladorId: ['0145214', '524879']},
    {nombre: '100 de cilantro', arquitectoId: '010101', liderTecnicoId: '102030', desarrolladorId: ['0145214', '524879']}
  }

  ngOnInit(): void {
    this.proyects = this.proyectos;
  }
}
