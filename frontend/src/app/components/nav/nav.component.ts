import { Component, HostListener } from '@angular/core';
// import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation/navigation.service';
// import { AuthOperationsService } from '../../services/auth/auth-operation.service';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import { matArrowForwardIosRound } from '@ng-icons/material-icons/round';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({ matArrowForwardIosRound }),
    provideNgIconsConfig({
      size: '16px',
    }),
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  isLoggedIn: boolean = false;
  scrolled = false;
  excludedPages = ['/profile'];

  constructor(
    // public authService: AuthService,
    private navigationService: NavigationService,
    private router: Router // private authOperations: AuthOperationsService
  ) {
    // Subscribe to the user observable to check authentication state
    // this.authService.user$.subscribe((user) => {
    //   this.isLoggedIn = !!user;
    // });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentUrl = this.router.url;
    if (this.excludedPages.includes(currentUrl)) {
      return;
    }
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.scrolled = scrollPosition > 50; // Trigger the change when the scroll is beyond 50px
  }

  async handleLogin() {
    // this.authOperations.login();
  }

  async handleLogout() {
    // this.authOperations.logout();
  }

  navigateToProfile() {
    this.navigationService.navigateToProfile();
  }
}
