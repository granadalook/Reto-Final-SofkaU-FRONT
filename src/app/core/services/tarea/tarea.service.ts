import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistoriaI } from 'src/app/models/historia';
import { TareaI } from 'src/app/models/tarea';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  constructor(private http: HttpClient) {}
  actualizarTarea(tareaActualizada: {}) {
    console.log('tareaActualizada', tareaActualizada);
    return this.http.put<HistoriaI>(
      `${environment.UrlBase}${environment.editarTarea}`,
      tareaActualizada
    );
  }
  eliminarTarea(IdTarea: string) {
    console.log('tareaActualizada', IdTarea);
    return this.http.delete(
      `${environment.UrlBase}${environment.eliminarTarea}` + IdTarea
    );
  }
}
