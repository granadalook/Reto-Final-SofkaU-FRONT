import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoriasService } from 'src/app/core/services/historiasService/historias.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';
import { TareaI } from 'src/app/models/tarea';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss'],
})
export class TareasComponent implements OnInit {
  @Input() item: any;
  @Input() tituloHistoriausuario?: string;
  nuevaTarea: TareaI;
  tareas?: Array<TareaI>;
  historiaId?: string;
  public formularioHistoria: FormGroup = this.formBuilder.group({
    tituloHistoriaUsuario: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });
  constructor(
    private HistoriasService: HistoriasService,
    private sesionStorageService: SesionStorageService,
    private formBuilder: FormBuilder
  ) {
    this.nuevaTarea = {
      desarrolladorId: '',
      nombreTarea: '',
      descripcionTarea: '',
      historiaUsuarioId: '',
    };
  }
  ngOnInit(): void {
    console.log('this.item 12 ', this.item);
  }
  clearTarea() {
    this.nuevaTarea.desarrolladorId = this.sesionStorageService.getId();
    this.nuevaTarea.historiaUsuarioId = this.item;
    this.HistoriasService.crearTarea(this.nuevaTarea).subscribe((data) => {
      this.tareas = data.tareas;
      console.log('tareas respuesta', this.tareas);
    });
  }
  cambioEstado(){
    

  }
}
