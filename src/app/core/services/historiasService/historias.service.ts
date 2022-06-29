import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistoriaI } from 'src/app/models/historia';
import { UsuarioI } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';
import { SesionStorageService } from '../SesionStorage/sesion-storage.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoriasService {
  rol?: string | null;
  private historia = new BehaviorSubject<HistoriaI>({} as HistoriaI);
  public historia$ = this.historia.asObservable();
  constructor(
    private http: HttpClient,
    private sesionStorageService: SesionStorageService
  ) {}

  crearHistoria(historia: HistoriaI) {
    return this.http
      .post<HistoriaI>(
        `${environment.UrlBase}${environment.crearHistoria}`,
        historia
      )
      .pipe(
        tap((res) => {
          console.log('respuesta ' + JSON.stringify(res));
          this.historia.next(res);
        })
      );
  }
  traerusuarios(Rol: string) {
    return this.http.get<Array<UsuarioI>>(
      `${environment.UrlBase}${environment.allUsuarios}` + Rol
    );
  }
  EliminarHistoria(id: string) {
    return this.http.delete(
      `${environment.UrlBase}${environment.eliminarHistoria}` + id
    );
  }
  validacionRol(id: string | null) {
    let respuesta;
    this.rol = this.sesionStorageService.getRol();
    if (this.rol === 'Arquitecto') {
      return this.http
        .get<Array<HistoriaI>>(
          `${environment.UrlBase}${environment.allHistorias}`
        )
        .pipe(
          tap((data) => {
            respuesta = data;
          })
        );
    }

    if (this.rol === 'LiderTecnico') {
      return this.http
        .get<Array<HistoriaI>>(
          `${environment.UrlBase}${environment.allHistoriasLider}` + id
        )
        .pipe(
          tap((data) => {
            respuesta = data;
          })
        );
    }
    if (this.rol === 'Desarrollador') {
      return this.http
        .get<Array<HistoriaI>>(
          `${environment.UrlBase}${environment.allHistoriasDev}` + id
        )
        .pipe(
          tap((data) => {
            respuesta = data;
          })
        );
    }
    return respuesta;
  }
}
