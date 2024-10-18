import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation/navigation.service';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import { matArrowBack } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-roadmaps',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({
      matArrowBack,
    }),
    provideNgIconsConfig({
      size: '20px',
    }),
  ],
  templateUrl: './roadmaps.component.html',
  styleUrls: ['./roadmaps.component.css'],
})
export class RoadmapsComponent {
  constructor(private navigationService: NavigationService) {}

  previousPage() {
    this.navigationService.previousPage();
  }
}
