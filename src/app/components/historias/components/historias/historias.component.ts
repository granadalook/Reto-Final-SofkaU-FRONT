import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoriasService } from 'src/app/core/services/historiasService/historias.service';
import { SesionStorageService } from 'src/app/core/services/SesionStorage/sesion-storage.service';
import { HistoriaI } from 'src/app/models/historia';
import { UsuarioI } from 'src/app/models/usuario';

@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.scss'],
})
export class HistoriasComponent implements OnInit {
  rol?: string | null;
  liderTecnicoId: string | null = '';
  newHistoria: HistoriaI;
  proyectoId?: string;
  descripcion?: string;
  usuarios?: Array<UsuarioI>;
  public formularioHistoria: FormGroup = this.formBuilder.group({
    textArea: ['', [Validators.required]],
    selecDev: ['', [Validators.required]],
  });
  constructor(
    private sesionStorageService: SesionStorageService,
    private historiasService: HistoriasService,
    private formBuilder: FormBuilder
  ) {
    this.newHistoria = {
      descripcion: '',
      liderTecnicoId: this.sesionStorageService.getId(),
      proyectoId: '0001',
      desarrolladorId: ''.trim(),
      historiaUsuarioId: '',
    };
  }
  ngOnInit(): void {
    this.rol = this.sesionStorageService.getRol();

    this.getUsuarios('Desarrollador');
  }
  getHistorias() {
    this.historiasService
      .validacionRol(this.sesionStorageService.getId())
      ?.subscribe((data) => {
        /* this.historys = data; */
      });
  }
  nuevaHistoria() {
    this.historiasService.crearHistoria(this.newHistoria).subscribe((data) => {
 if (data) {
  
  
 }
    });
  }
  getUsuarios(rol: string) {
    this.historiasService.traerusuarios(rol).subscribe((data) => {
      console.log('data', data);
      this.usuarios = data;
    });
  }
}
