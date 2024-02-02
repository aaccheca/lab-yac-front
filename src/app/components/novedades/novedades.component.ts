import { Component, OnInit } from '@angular/core';
import { RegistroLaboratorioService } from '../../services/registros.service';
import { RegistroLaboratorioModel } from '../../models/registro-laboratorio.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.css'
})
export class NovedadesComponent implements OnInit {

  registros: RegistroLaboratorioModel[] = [];
  userType: string | null = null;

  constructor(public authService: AuthService, private registroService: RegistroLaboratorioService) {
    this.userType = authService.getCurrentUserType();
   }

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  obtenerRegistros(): void {
    this.registroService.getRegistrosLaboratoriosNovedades().subscribe(
      registros => this.registros = registros,
      error => console.error(error)
    );
  }

  eliminarNovedades(id: number): void {
    this.registroService.eliminarNovedades(id).subscribe(
      () => {
        console.log('Novedades eliminadas correctamente');
        this.obtenerRegistros();
      },
      (error) => {
        console.error('Error al eliminar novedades', error);
      }
    );
  }
}
