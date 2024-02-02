import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { AuthGuard } from './services/auth.guard';
import { RegistrosComponent } from './components/registros/registros.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AulasComponent } from './components/aulas/aulas.component';
import { HorarioComponent } from './components/horario/horario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard2', component: Dashboard2Component, canActivate: [AuthGuard] },
  { path: 'registros', component: RegistrosComponent, canActivate: [AuthGuard] },
  { path: 'novedades', component: NovedadesComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'aulas', component: AulasComponent, canActivate: [AuthGuard] },
  { path: 'horario', component: HorarioComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
