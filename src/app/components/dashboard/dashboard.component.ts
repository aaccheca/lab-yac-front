import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  userType: string | null = null;

  constructor(public authService: AuthService) {
    this.userType = authService.getCurrentUserType();
  }

  ngOnInit(): void {
    this.slides[0] = {
      src: './../../../assets/politica.jpg',
    };
    this.slides[1] = {
      src: './../../../assets/mision.png',
    }
    this.slides[2] = {
      src: './../../../assets/vision.png',
    }
  }

  onLogout(): void {
    this.authService.logout();
  }

}
