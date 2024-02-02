import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      user => {
        if (user) {
          console.error('Autenticación exitosa', user);
        } else {
          console.error('Autenticación fallida', user);
        }
      },
      error => {
        console.error('Error en la autenticación', error);
      }
    );
  }
  
}

