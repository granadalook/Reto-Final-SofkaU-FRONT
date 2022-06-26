import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { RegisterI } from 'src/app/models/register.interface';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  postUser(form:RegisterI):Observable<ResponseI>{
    let direccion = this.url + "/usuario/crear"
    return this.http.post<ResponseI>(direccion, form)
  }

}
