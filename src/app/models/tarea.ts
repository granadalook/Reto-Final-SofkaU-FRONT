export interface TareaI {
  tareaId: string;
  desarrolladorId: string | null;
  nombreTarea: string;
  descripcionTarea: string;
  historiaUsuarioId?: string | null;
  estado:string;
  completa: boolean;
}
