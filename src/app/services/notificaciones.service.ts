import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificacionModel } from '../models/notificacion.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/notificaciones';

  saveNotificacion(data: { maestro: UserModel; notificacion: string }): Observable<NotificacionModel> {
    return this.http.post<NotificacionModel>(this.apiUrl, data);
  }

  deleteNotificacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
