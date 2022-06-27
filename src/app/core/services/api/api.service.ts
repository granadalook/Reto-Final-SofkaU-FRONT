import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { RegisterI } from 'src/app/models/register.interface';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/models/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postUser(form:RegisterI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${environment.UrlBase}${environment.crearUsuario}`, form)
  }

}
