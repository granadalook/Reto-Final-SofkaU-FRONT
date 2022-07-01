import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoriasService } from 'src/app/core/services/historiasService/historias.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';
import { TareaService } from 'src/app/core/services/tarea/tarea.service';
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
  editarTareaU: TareaI;
  IdtareaEditada: string = '';
  historiaId?: string;
  mostrar: boolean = false;
  public formularioHistoria: FormGroup = this.formBuilder.group({
    tituloHistoriaUsuario: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  public formEditarTarea: FormGroup = this.formBuilder.group({
    tituloTarea: ['', [Validators.required]],
    descripcionTarea: ['', [Validators.required]],
  });
  constructor(
    private HistoriasService: HistoriasService,
    private sesionStorageService: SesionStorageService,
    private formBuilder: FormBuilder,
    private tareaService: TareaService
  ) {
    this.nuevaTarea = {
      desarrolladorId: '',
      nombreTarea: '',
      descripcionTarea: '',
      historiaUsuarioId: '',
      estado: '',
      tareaId: '',
      completa: false,
    };
    this.editarTareaU = {
      desarrolladorId: '',
      nombreTarea: '',
      descripcionTarea: '',
      historiaUsuarioId: '',
      estado: '',
      tareaId: '',
      completa: false,
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
    this.nuevaTarea.estado = 'TO-DO';
    this.HistoriasService.crearTarea(this.nuevaTarea).subscribe((data) => {
      this.nuevaTareaCreada.emit();
    });
  }
  /* cambioEstadoDone(tarea: TareaI) {
    let estadoCambiado = {
      tareaId: tarea.tareaId,
      desarrolladorId: tarea.desarrolladorId,
      nombreTarea: tarea.nombreTarea,
      descripcionTarea: tarea.descripcionTarea,
      estado: 'DONE',
      historiaUsuarioId: tarea.historiaUsuarioId,
        completa: true,
    };
    this.tareaService.actualizarTarea(estadoCambiado).subscribe((data) => {
      this.tareaTerminada(tarea);
      this.nuevaTareaCreada.emit();
    });
  } */

  tareaTerminada(tarea: TareaI) {
    let tareaTrue: TareaI = {
      tareaId: tarea.tareaId,
      desarrolladorId: tarea.desarrolladorId,
      nombreTarea: tarea.nombreTarea,
      descripcionTarea: tarea.descripcionTarea,
      historiaUsuarioId: tarea.historiaUsuarioId,
      estado: 'DONE',
      completa: true,
    };
    this.mostrar = true;

    this.HistoriasService.actualizar(tareaTrue).subscribe((data) => {
      this.HistoriasService.actualizarHistoria(data).subscribe((datares) => {
        this.nuevaTareaCreada.emit();
      });
    });
  }

  cambioEstadoTodo(tarea: TareaI) {
    let estadoCambiado = {
      tareaId: tarea.tareaId,
      desarrolladorId: tarea.desarrolladorId,
      nombreTarea: tarea.nombreTarea,
      descripcionTarea: tarea.descripcionTarea,
      estado: 'TO-DO',
      historiaUsuarioId: tarea.historiaUsuarioId,
    };
    this.tareaService.actualizarTarea(estadoCambiado).subscribe((data) => {
      this.nuevaTareaCreada.emit();
    });
  }
  cambioEstadoDoing(tarea: TareaI) {
    let estadoCambiado = {
      tareaId: tarea.tareaId,
      desarrolladorId: tarea.desarrolladorId,
      nombreTarea: tarea.nombreTarea,
      descripcionTarea: tarea.descripcionTarea,
      estado: 'DOING',
      historiaUsuarioId: tarea.historiaUsuarioId,
    };
    this.tareaService.actualizarTarea(estadoCambiado).subscribe((data) => {
      this.nuevaTareaCreada.emit();
    });
  }
  cambioEstadoTesting(tarea: TareaI) {
    let estadoCambiado = {
      tareaId: tarea.tareaId,
      desarrolladorId: tarea.desarrolladorId,
      nombreTarea: tarea.nombreTarea,
      descripcionTarea: tarea.descripcionTarea,
      estado: 'TESTING',
      historiaUsuarioId: tarea.historiaUsuarioId,
    };
    this.tareaService.actualizarTarea(estadoCambiado).subscribe((data) => {
      this.nuevaTareaCreada.emit();
    });
  }

  eliminarTarea(idTarea: string) {
    this.tareaService.eliminarTarea(idTarea).subscribe((res) => {
      if (res === null) {
        this.nuevaTareaCreada.emit();
      }
    });
  }
  IdEditarTarea(id: string) {
    this.IdtareaEditada = id;
    this.tareaService.traerTareaPorId(id).subscribe((res) => {
      this.formEditarTarea.setValue({
        tituloTarea: res.nombreTarea,
        descripcionTarea: res.descripcionTarea,
      });
    });
  }
  editarTarea() {
    this.editarTareaU.tareaId = this.IdtareaEditada;
    this.editarTareaU.desarrolladorId = this.sesionStorageService.getId();
    this.editarTareaU.historiaUsuarioId = this.item;
    this.editarTareaU.nombreTarea =
      this.formEditarTarea.get('tituloTarea')?.value;
    this.editarTareaU.descripcionTarea =
      this.formEditarTarea.get('descripcionTarea')?.value;
    this.tareaService.editarTarea(this.editarTareaU).subscribe((data) => {
      if (data) {
        this.nuevaTareaCreada.emit();
      }
    });
  }
}
