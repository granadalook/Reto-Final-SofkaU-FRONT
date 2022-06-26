import { Injectable } from '@angular/core';
import { LoginUser } from 'src/app/models/loginUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioI } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  constructor(private http: HttpClient) {}
  sendHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, X-Auth-Token'
    );
    headers = headers.append(
      'Access-Control-Allow-Methods',
      'GET,POST,OPTIONS,DELETE,PUT'
    );
    return headers;
  }
  loginUserPassword(usuarioenviado: LoginUser) {
    return this.http.post<UsuarioI>(
      `${environment.UrlBase}${environment.Login}`,
      usuarioenviado,
      { headers: this.sendHeaders() }
    );
  }
}
