import { Component, OnInit } from '@angular/core';
import { RegistroLaboratorioService } from '../../services/registros.service';
import { RegistroLaboratorioModel } from '../../models/registro-laboratorio.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {

  registros: RegistroLaboratorioModel[] = [];
  userType: string | null = null;


  constructor(public authService: AuthService, private registroService: RegistroLaboratorioService) {
    this.userType = authService.getCurrentUserType();
   }

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  obtenerRegistros(): void {
    this.registroService.getRegistrosLaboratorios().subscribe(
      registros => this.registros = registros,
      error => console.error(error)
    );
  }
}
