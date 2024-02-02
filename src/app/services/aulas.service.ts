import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AulaModel } from '../models/aula.model';

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/aulas';

  getAulas(): Observable<AulaModel[]> {
    return this.http.get<AulaModel[]>(this.apiUrl);
  }

  putAula(id: number, aula: AulaModel): Observable<AulaModel> {
    return this.http.put<AulaModel>(`${this.apiUrl}/${id}`, aula);
  }
  
}
