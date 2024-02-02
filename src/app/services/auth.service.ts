// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { NotificacionModel } from '../models/notificacion.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: UserModel | null = null;
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private router: Router) {}

login(username: string, password: string): Observable<UserModel | null> {
  return this.http.get<UserModel[]>(`${this.apiUrl}/usuarios`).pipe(
    map((users: UserModel[]) => {
      const authenticatedUser = users.find(user => user.nombreUsuario === username && user.contrasena === password);
      if (authenticatedUser) {
        this.currentUser = authenticatedUser;
        localStorage.setItem('userId', authenticatedUser.id.toString());
        localStorage.setItem('userType', authenticatedUser.tipoUsuario);
        this.redirectToDashboard(authenticatedUser.tipoUsuario);
        return authenticatedUser;
      } else {
        console.error('Credenciales incorrectas');
        return null;
      }
    })
  );
}

getNotificacionesUsuario(): Observable<NotificacionModel[]> {
  return this.http.get<NotificacionModel[]>(`${this.apiUrl}/notificaciones/usuario/${this.currentUser?.id}`);
}

getLoggedUser(): UserModel | null{
  return this.currentUser;
}

getLoggedUserName(): string | null {
  return this.currentUser?.nombreUsuario ?? null;
}

  logout(): void {

    this.currentUser = null;
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');

    this.redirectToLogin();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  redirectToDashboard(userType: string | null): void {
    if (userType === 'Administrador') {
      this.redirectToDashboard1();
    } else if (userType === 'Maestro') {
      this.redirectToDashboard2();
    }
  }
  

  register(nombreUsuario: string, contrasena: string, tipoUsuario: string): Observable<UserModel> {
    const body = { nombreUsuario, contrasena, tipoUsuario };
    return this.http.post<UserModel>(`${this.apiUrl}/usuarios`, body).pipe(
      tap((user) => {
        this.currentUser = user;
        localStorage.setItem('userId', user.id.toString());
        localStorage.setItem('userType', user.tipoUsuario);
        this.redirectToDashboard(user.tipoUsuario);
      })
    );
  }
  

  private redirectToDashboard1(): void {
    this.router.navigate(['/dashboard']);
  }

  private redirectToDashboard2(): void {
    this.router.navigate(['/dashboard2']);
  }

  private redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  getCurrentUserId(): number | null {
    return this.currentUser?.id ?? null;
  }

  getCurrentUserType(): string | null {
    return this.currentUser?.tipoUsuario ?? null;
  }
}
