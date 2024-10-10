import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  navigateToProfile() {
    this.navigateTo('/profile');
  }

  navigateToDashboard() {
    this.navigateTo('/dashboard');
  }

  navigateToRoadmaps() {
    this.navigateTo('/roadmap');
  }

  navigateToLandingPage() {
    this.navigateTo('/landingpage');
  }

  // Add more navigation methods as needed
}
