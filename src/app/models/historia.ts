import { TareaI } from './tarea';
export interface HistoriaI {
  descripcion: string;
  liderTecnicoId: string | null;
  proyectoId: string;
  desarrolladorId: string;
  historiaUsuarioId: string;
  tituloHistoriaUsuario: string;
  estimacion: string;
  tareas: [TareaI];
}
