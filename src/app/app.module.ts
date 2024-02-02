import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { CarouselModule } from '@coreui/angular';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { RegistrosComponent } from './components/registros/registros.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AulasComponent } from './components/aulas/aulas.component';
import { HorarioComponent } from './components/horario/horario.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard2', component: Dashboard2Component, canActivate: [AuthGuard] },
  { path: 'registros', component: RegistrosComponent, canActivate: [AuthGuard] },
  { path: 'novedades', component: NovedadesComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'aulas', component: AulasComponent, canActivate: [AuthGuard] },
  { path: 'horario', component: HorarioComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    Dashboard2Component,
    NavbarComponent,
    MenuComponent,
    RegistrosComponent,
    NovedadesComponent,
    UsuariosComponent,
    AulasComponent,
    HorarioComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    CarouselModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideClientHydration(),
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
