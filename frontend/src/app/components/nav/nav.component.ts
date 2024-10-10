import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation/navigation.service';
import { AuthOperationsService } from '../../services/auth/auth-operation.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  isLoggedIn: boolean = false;

  constructor(
    public authService: AuthService,
    private navigationService: NavigationService,
    private authOperations: AuthOperationsService
  ) {
    // Subscribe to the user observable to check authentication state
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  async handleLogin() {
    this.authOperations.login();
  }

  async handleLogout() {
    this.authOperations.logout();
  }

  navigateToProfile() {
    this.navigationService.navigateToProfile();
  }
}
