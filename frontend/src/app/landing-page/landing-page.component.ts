import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class LandingPageComponent {
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, private router: Router) {
    // Subscribe to the user observable to check authentication state
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user; // Set isLoggedIn based on user presence
    });
  }

  async handleLogin() {
    const user = await this.authService.signInWithGoogle();
    if (user) {
      console.log('User logged in:', user);
      this.router.navigate(['/dashboard']); // Change to your desired route
    } else {
      console.error('Login failed');
    }
  }

  async handleLogout() {
    await this.authService.signOut();
    console.log('User logged out');
    this.router.navigate(['/landingpage']); // Redirect to landing page after logout
  }

  async handleLoginWithDifferentAccount() {
    await this.authService.signOut(); // Sign out first
    await this.handleLogin(); // Then log in again
  }
}
