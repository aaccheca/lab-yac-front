import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificacionModel } from '../../models/notificacion.model';
import { NotificacionesService } from '../../services/notificaciones.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  loggedUserName: string | null = null;
  notificaciones: NotificacionModel[] = [];

  ngOnInit(): void {
    this.loggedUserName = this.authService.getLoggedUserName();
    this.obtenerNotificaciones();
  }

  obtenerNotificaciones(): void {
    this.authService.getNotificacionesUsuario().subscribe(
      notificaciones => this.notificaciones = notificaciones,
      error => console.error(error)
    );
  }

  constructor(public authService: AuthService,  private notificacionService: NotificacionesService) {}

  logout(): void {
    this.authService.logout();
  }

  eliminarNotificacion(id: number): void {
    this.notificacionService.deleteNotificacion(id).subscribe(
      () => {
        console.log('Notificacion eliminada correctamente');
        this.obtenerNotificaciones();
      },
      (error) => {
        console.error('Error al eliminar notificacion', error);
      }
    );
  }

}
