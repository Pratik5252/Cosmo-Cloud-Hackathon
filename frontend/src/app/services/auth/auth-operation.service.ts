import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthOperationsService {
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  async login(): Promise<void> {
    const user = await this.authService.signInWithGoogle();
    if (user) {
      console.log('User logged in:', user);

      this.navigationService.navigateToLandingPage();
    } else {
      console.error('Login failed');
    }
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
    console.log('User logged out');
    this.navigationService.navigateToLandingPage();
  }

  async loginWithDifferentAccount(): Promise<void> {
    await this.authService.signOut();
    await this.login();
  }
}
