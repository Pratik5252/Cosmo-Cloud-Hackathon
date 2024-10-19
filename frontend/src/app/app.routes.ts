import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoadmapsComponent } from './roadmaps/roadmaps.component';
import { AuthGuard } from './guards/auth.guard';
import { StudyComponent } from './study/study.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landingpage', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'landingpage', component: LandingPageComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'roadmap', component: RoadmapsComponent, canActivate: [AuthGuard] },

  { path: 'roadmap', component: RoadmapsComponent },
  { path: 'study', component: StudyComponent },

  // Add more routes as needed
];
