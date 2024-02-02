import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroLaboratorioModel } from '../models/registro-laboratorio.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroLaboratorioService {

  private apiUrl = 'http://localhost:8080/api/registros-laboratorio';

  constructor(private http: HttpClient) { }

  getRegistrosLaboratorios(): Observable<RegistroLaboratorioModel[]> {
    return this.http.get<RegistroLaboratorioModel[]>(this.apiUrl);
  }

  getRegistrosLaboratoriosNovedades(): Observable<RegistroLaboratorioModel[]> {
    return this.http.get<RegistroLaboratorioModel[]>(`${this.apiUrl}/novedades`);
  }

  saveRegistrosLaboratorios(registro: RegistroLaboratorioModel): Observable<RegistroLaboratorioModel> {
    return this.http.post<RegistroLaboratorioModel>(this.apiUrl, registro);
  }
  
  eliminarNovedades(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/novedades/${id}`);
  }
}
