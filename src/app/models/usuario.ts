export interface UsuarioI {
  usuarioId: string;
  nombreCompleto: string;
  email: string;
  password: string;
  rol: string;
  idProyectosAsociados: string[];
  proyectosAsociados: any[];
  historiasDeUsuario: any[];
}
