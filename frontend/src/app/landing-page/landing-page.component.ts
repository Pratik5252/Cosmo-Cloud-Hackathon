import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  constructor(private authService: AuthService) { }

  handleSignup() {
    alert("HandleSignup called")
    if (this.authService.signup()) {
      window.location.href = '/dashboard';
    } else {
      alert("Sign up failed");
    }
  }

  handleLogin() {
    alert("HandleLogin called");
    if (this.authService.login()) {
      window.location.href = '/dashboard';
    } else {
      alert("login failed");
    }
  }

}
