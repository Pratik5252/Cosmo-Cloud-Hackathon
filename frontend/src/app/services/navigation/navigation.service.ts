import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router, private location: Location) {}

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

  //This helps to works for previous page navigation
  previousPage() {
    this.location.back();
  }

  // Add more navigation methods as needed
}
