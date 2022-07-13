import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterI } from 'src/app/models/register.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResponseI } from 'src/app/models/response.interface';
import { environment } from 'src/environments/environment';
import { UsuarioI } from 'src/app/models/usuario';
import { ProyectoI } from 'src/app/models/proyecto.interface';
import { HistoriaI } from 'src/app/models/historia';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private eliminado = new BehaviorSubject({} as ResponseI);

  public eliminado$ = this.eliminado.asObservable();

  constructor(private http: HttpClient) {}

  postUser(form: RegisterI): Observable<ResponseI> {
    return this.http.post<ResponseI>(
      `${environment.UrlBase}${environment.crearUsuario}`,
      form
    );
  }

  getUserByRol(rol: string): Observable<UsuarioI> {
    return this.http.get<UsuarioI>(
      `${environment.UrlBase}${environment.ListarPorRol}` + rol
    );
  }

  crearProyecto(form: ProyectoI): Observable<ProyectoI> {
    return this.http.post<ProyectoI>(
      `${environment.UrlBase}${environment.CrearProyecto}`,
      form
    );
  }

  getUserById(id: any): Observable<UsuarioI> {
    return this.http.get<UsuarioI>(
      `${environment.UrlBase}${environment.ListarPorId}` + id
    );
  }

  postProyectoUser(user: UsuarioI): Observable<ResponseI> {
    return this.http.post<ResponseI>(
      `${environment.UrlBase}${environment.AsignarProyecto}`,
      user
    );
  }

  getProyectoById(id: any): Observable<ProyectoI> {
    return this.http.get<ProyectoI>(
      `${environment.UrlBase}${environment.ListarProyectoPorId}` + id
    );
  }

  deleteProyecto(id: string): Observable<ResponseI> {
    return this.http
      .delete<ResponseI>(
        `${environment.UrlBase}${environment.EliminarProyecto}` + id
      )
      .pipe(
        tap((res) => {
          this.eliminado.next(res);
        })
      );
  }

  getHistoriasByIdProyecto(id: any): Observable<HistoriaI> {
    return this.http.get<HistoriaI>(
      `${environment.UrlBase}${environment.ListarHistoriasPorIdProyecto}` + id
    );
  }
}
