import { HistoriaI } from './historia';

export interface ProyectoI {
  proyectoId: string;
  nombre: string;
  arquitectoId: string;
  liderTecnicoId: string;
  porcentajeDeAvance: number;
  estado: boolean;
  historias_de_usuarios: [HistoriaI];
}
