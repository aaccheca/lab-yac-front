import { Component, Inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { UserModel } from '../../models/user.model';
import { NotificacionModel } from '../../models/notificacion.model';
import { AuthService } from '../../services/auth.service';
import { NotificacionesService } from '../../services/notificaciones.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css',
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
export class NotificacionComponent {
  constructor(
    public dialogRef: MatDialogRef<NotificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotificacionModel,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(this.data.notificacion);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
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
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
  ],
})
export class UsuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<UsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: UserModel,
  ) {}

  onNoClick2(): void {
    this.dialogRef.close(this.usuario);
  }
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})

export class UsuariosComponent implements OnInit {

  notificaciones: NotificacionModel[] = [];
  usuarios: UserModel[] = [];
  userType: string | null = null;

  constructor(public authService: AuthService, private usuarioService: UsuariosService, private notificationService: NotificacionesService, public dialog: MatDialog) {
    this.userType = authService.getCurrentUserType();
   }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios,
      error => console.error(error)
    );
  }

  openDialog(usuario: UserModel): void {
    const dialogRef = this.dialog.open(NotificacionComponent, {
      data: {maestro: usuario, notificacion: ''},
    });

    dialogRef.afterClosed().subscribe((notificacion: string | undefined) => {
      if (notificacion) {
        this.guardarNotificacion({ maestro: usuario, notificacion });
      }
    });
  }

  openDialog2(): void {

    const usuario: UserModel = {
      id: 0,
      nombreUsuario: '',
      contrasena: '',
      tipoUsuario: '',
    };


    const dialogRef = this.dialog.open(UsuarioComponent, {
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((usuario: UserModel) => {
      if (usuario) {
        this.onRegister(usuario);
      }
    });
  }

 private guardarNotificacion(data: { maestro: UserModel; notificacion: string }): void {
  this.notificationService.saveNotificacion(data).subscribe(
    (notificacion) => {
      console.log('Registro de notificación exitoso:', notificacion);
    },
    (error) => {
      console.error('Error en el registro de notificación:', error);
    }
  );
}

onRegister(usuario: UserModel): void {
  console.log('Registrando usuario...');
  this.authService.register(usuario.nombreUsuario, usuario.contrasena, usuario.tipoUsuario)
  .subscribe(
    (user) => {
      console.log('Registro exitoso:', user);
    },
    (error) => {
      console.error('Error en el registro:', error);
    }
  );
}

}
