import { Component } from '@angular/core';
import { NavigationService } from '../services/navigation/navigation.service';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import {
  matChatBubble,
  matArrowOutward,
} from '@ng-icons/material-icons/baseline';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIconComponent],
  providers: [
    provideIcons({ matChatBubble, matArrowOutward }),
    provideNgIconsConfig({
      size: '20px',
    }),
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private navigationService: NavigationService) {}

  navigateToRoadmaps() {
    this.navigationService.navigateToRoadmaps();
  }
}
