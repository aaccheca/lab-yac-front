import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})

export class HorarioComponent {

  userType: string | null = null;

  constructor(public authService: AuthService) {
    this.userType = authService.getCurrentUserType();
  }

  ngOnInit(): void {
  }

  abrirGoogleCalendar(): void {
    const enlaceGoogleCalendar = 'https://calendar.google.com/';
    window.open(enlaceGoogleCalendar, '_blank');
  }

  onLogout(): void {
    this.authService.logout();
  }

}
