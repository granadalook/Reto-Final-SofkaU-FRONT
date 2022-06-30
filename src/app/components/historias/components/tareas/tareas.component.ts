import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() tareas?: Array<TareaI>;
  @Output() nuevaTareaCreada = new EventEmitter<string>();
  nuevaTarea: TareaI;

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
      estadoTarea: false,
      tareaId: '',
    };
  }
  ngOnInit(): void {}
  clearTarea() {
    this.nuevaTarea.desarrolladorId = this.sesionStorageService.getId();
    this.nuevaTarea.historiaUsuarioId = this.item;
    this.nuevaTarea.nombreTarea = this.formularioHistoria.get(
      'tituloHistoriaUsuario'
    )?.value;
    this.nuevaTarea.descripcionTarea =
      this.formularioHistoria.get('descripcion')?.value;
    this.HistoriasService.crearTarea(this.nuevaTarea).subscribe((data) => {
      this.nuevaTareaCreada.emit();
    });
  }

  cambioEstado(tarea: TareaI) {
    let tareaTrue: TareaI = {
      tareaId: tarea.tareaId,
      desarrolladorId: tarea.desarrolladorId,
      nombreTarea: tarea.nombreTarea,
      descripcionTarea: tarea.descripcionTarea,
      estadoTarea: true,
      historiaUsuarioId: tarea.historiaUsuarioId,
    };
    this.nuevaTarea.estadoTarea = true;
    this.HistoriasService.actualizar(tareaTrue).subscribe((data) => {
      this.nuevaTareaCreada.emit();
    });
  }
}
