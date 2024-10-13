import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoadmapsComponent } from './roadmaps/roadmaps.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/landingpage', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'landingpage', component: LandingPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'roadmap', component: RoadmapsComponent },
  // Add more routes as needed
];
