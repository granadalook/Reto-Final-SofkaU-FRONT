import { Injectable } from '@angular/core';
const ROL_KEY = 'RolUser';
const USERNAME_KEY = 'UserName';
@Injectable({
  providedIn: 'root',
})
export class SesionStorageService {
  constructor() {}
  setRol(rol: string) {
    window.sessionStorage.removeItem(ROL_KEY);
    window.sessionStorage.setItem(ROL_KEY, rol);
  }
  getRol(): string | null {
    return sessionStorage.getItem(ROL_KEY);
  }
  setUserName(userName: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }
  getUserName() {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  logOut() {
    window.sessionStorage.clear();
  }
}