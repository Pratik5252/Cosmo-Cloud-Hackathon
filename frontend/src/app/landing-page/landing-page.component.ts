import { Component } from '@angular/core';
// import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation/navigation.service';
// import { AuthOperationsService } from '../services/auth/auth-operation.service';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import { matArrowForwardIosRound } from '@ng-icons/material-icons/round';
import { TypewriterComponent } from '../components/typewriter/typewriter.component';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [CommonModule, NgIconComponent, TypewriterComponent],
  providers: [
    provideIcons({ matArrowForwardIosRound }),
    provideNgIconsConfig({
      size: '16px',
    }),
  ],
  standalone: true,
})
export class LandingPageComponent {
  isLoggedIn: boolean = false;

  constructor(
    // public authService: AuthService,
    private navigationService: NavigationService // private authOperations: AuthOperationsService
  ) {
    // this.authService.user$.subscribe((user) => {
    //   this.isLoggedIn = !!user;
    // });
  }

  async handleLogin() {
    // this.authOperations.login();
  }

  navigateToRoadmaps() {
    this.navigationService.navigateToRoadmaps();
  }
}
