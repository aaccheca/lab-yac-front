import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AulaModel } from '../../models/aula.model';
import { AulasService } from '../../services/aulas.service';
import { RegistroLaboratorioService } from '../../services/registros.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { RegistroLaboratorioModel } from '../../models/registro-laboratorio.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    MatCardModule
  ],
})
export class NovedadesAulaComponent {
  constructor(
    public dialogRef: MatDialogRef<NovedadesAulaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegistroLaboratorioModel,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }
}

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrl: './aulas.component.css'
})
export class AulasComponent {

  activo: number | null = null;
  aulas: AulaModel[] = [];
  userType: string | null = null;
  horaPrimerClic: string | null = null;

  constructor(public authService: AuthService, private aulaService: AulasService,  private registrosService: RegistroLaboratorioService, public dialog: MatDialog) {
    this.userType = authService.getCurrentUserType();
   }

  ngOnInit(): void {
    this.obtenerAulas();
  }

  obtenerAulas(): void {
    this.aulaService.getAulas().subscribe(
      aulas => this.aulas = aulas,
      error => console.error(error)
    );
  }

  color(index: number, aula: AulaModel): void {
    this.activo = this.activo === index ? null : index;
    if (this.activo !== null) {
      aula.estado = !aula.estado;
      this.actualizarAula(aula.id,aula);
      aula.estado = !aula.estado;
      this.horaPrimerClic = String(new Date().toLocaleTimeString());
    } else {
      const dialogRef = this.dialog.open(NovedadesAulaComponent, {
        data: {
          fecha: new Date().toLocaleDateString(),
          horaIngreso: this.horaPrimerClic,
          horaSalida: new Date().toLocaleTimeString(),
          usuario: this.authService.getLoggedUser(),
          aula: aula,
          firma: '',
          guardiaTurno: '',
          novedades: ''
        },
        });
      dialogRef.afterClosed().subscribe((data: RegistroLaboratorioModel) => {
        this.guardarNovedad(data);
      });
    }
  }

  private guardarNovedad (data: RegistroLaboratorioModel): void {
    this.registrosService.saveRegistrosLaboratorios(data).subscribe(
      (novedades) => {
        console.log('Registro de novedad exitoso:', novedades);
      },
      (error) => {
        console.error('Error en el registro de novedad:', error);
      }
    );
  }

  private actualizarAula (id: number, aula: AulaModel): void {
    this.aulaService.putAula(id, aula).subscribe(
      (estado) => {
        console.log('Actualizar estado exitoso:', estado);
      },
      (error) => {
        console.error('Error en el actualizar estado:', error);
      }
    );
  }

}
