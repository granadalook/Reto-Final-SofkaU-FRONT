import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistoriaI } from 'src/app/models/historia';
import { UsuarioI } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HistoriasService {
  constructor(private http: HttpClient) {}

  crearHistoria(historia: HistoriaI) {
    console.log('historia', historia);
    return this.http.post<HistoriaI>(
      `${environment.UrlBase}${environment.crearHistoria}`,
      historia
    );
  }
  traerusuarios(Rol: string) {
    return this.http.get<Array<UsuarioI>>(
      `${environment.UrlBase}${environment.allUsuarios}` + Rol
    );
  }
}
