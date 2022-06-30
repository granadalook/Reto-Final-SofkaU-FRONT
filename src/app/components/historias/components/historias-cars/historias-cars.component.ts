import { Component, OnInit } from '@angular/core';
import { HistoriasService } from 'src/app/core/services/historiasService/historias.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { HistoriaI } from 'src/app/models/historia';

@Component({
  selector: 'app-historias-cars',
  templateUrl: './historias-cars.component.html',
  styleUrls: ['./historias-cars.component.scss'],
})
export class HistoriasCarsComponent implements OnInit {
  historys?: Array<HistoriaI>;
  rol?: string | null;

  constructor(
    private sesionStorageService: SesionStorageService,
    private historiasService: HistoriasService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.historiasService.eliminado$.subscribe((data) => {
      if (data === null) {
        this.getHistorias();
      }
    });
    this.historiasService.historia$.subscribe((data) => {
      if (data != null) {
        this.getHistorias();
      }
    });

    this.rol = this.sesionStorageService.getRol();
    this.getHistorias();
  }
  getHistorias() {
    this.historiasService
      .validacionRol(this.sesionStorageService.getId())
      ?.subscribe((data) => {
        this.historys = data;
      });
  }

  eliminarHistoria(id: string) {
    this.historiasService.EliminarHistoria(id).subscribe((data) => {
      console.log('data', data);
      if (data === null) {
        this.toastService.showWarningToast(
          'Historia de usuario',
          'eliminada con exito'
        );
        this.getHistorias();
      }
    });
  }
  nuevaTareaCreada() {
    this.getHistorias();
  }
}
