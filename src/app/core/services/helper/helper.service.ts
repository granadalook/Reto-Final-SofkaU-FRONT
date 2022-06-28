import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SesionStorageService } from '../SesionStorage/sesion-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private rol = new BehaviorSubject(this.sesionService.getRol());
  private nombre = new BehaviorSubject(this.sesionService.getUserName());

  public HelperRol = this.rol.asObservable();
  public helperNombre = this.nombre.asObservable();

  constructor(private sesionService: SesionStorageService) {}
}
