export interface TareaI {
  tareaId: '';
  desarrolladorId: string | null;
  nombreTarea: string;
  descripcionTarea: string;
  historiaUsuarioId?: string | null;
  estadoTarea: boolean;
  completa: boolean;
}
