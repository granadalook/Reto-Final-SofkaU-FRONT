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
  liderTecnicoId?: string;
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
      proyectoId: '0002',
      desarrolladorId: '',
    };
  }
  ngOnInit(): void {
    this.rol = this.sesionStorageService.getRol();

    this.getUsuarios('Desarrollador');
  }

  nuevaHistoria() {
    this.historiasService.crearHistoria(this.newHistoria).subscribe((data) => {
      console.log('data', data);
    });
  }
  getUsuarios(rol: string) {
    this.historiasService.traerusuarios(rol).subscribe((data) => {
      console.log('data', data);
      this.usuarios = data;
    });
  }
}
