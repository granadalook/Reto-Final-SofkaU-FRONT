import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { RegisterI } from 'src/app/models/register.interface';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/models/response.interface';
import { environment } from 'src/environments/environment';
import { UsuarioI } from 'src/app/models/usuario';
import { ProyectoI } from 'src/app/models/proyecto.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  arqui: UsuarioI | any

  constructor(private http:HttpClient) { }

  postUser(form:RegisterI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${environment.UrlBase}${environment.crearUsuario}`, form)
  }

  getUserByRol(rol:string):Observable<UsuarioI>{
    return this.http.get<UsuarioI>(`${environment.UrlBase}${environment.ListarPorRol}` + rol)
  }

  crearProyecto(form:ProyectoI):Observable<ProyectoI>{
    return this.http.post<ProyectoI>(`${environment.UrlBase}${environment.CrearProyecto}`, form)
  }

  getUserById(id:any):Observable<UsuarioI>{
    return this.http.get<UsuarioI>(`${environment.UrlBase}${environment.ListarPorId}` + id)
  }

  postProyectoUser(user:UsuarioI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${environment.UrlBase}${environment.AsignarProyecto}`, user)
  }

  getProyectoById(id:any):Observable<ProyectoI>{
    return this.http.get<ProyectoI>(`${environment.UrlBase}${environment.ListarProyectoPorId}` + id)
  }

  deleteProyecto(id:string):Observable<ResponseI>{
    return this.http.delete<ResponseI>(`${environment.UrlBase}${environment.EliminarProyecto}` + id)
  }
}
