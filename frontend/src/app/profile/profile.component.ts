import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user/userPreference.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import {
  matLibraryBooks,
  matSubdirectoryArrowRight,
} from '@ng-icons/material-icons/baseline';
import {
  matDeleteRound,
  matAddBoxRound,
  matLocationOnRound,
  matEditRound,
  matWorkRound,
} from '@ng-icons/material-icons/round';
import { matAddBoxOutline } from '@ng-icons/material-icons/outline';
import { AuthService } from '../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent],
  providers: [
    provideIcons({
      matEditRound,
      matLocationOnRound,
      matLibraryBooks,
      matWorkRound,
      matSubdirectoryArrowRight,
      matDeleteRound,
      matAddBoxRound,
      matAddBoxOutline,
    }),
    provideNgIconsConfig({
      size: '20px',
    }),
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  contentTypes = ['Text', 'Video', 'Audio', 'Interactive', 'Quiz', 'PDF'];
  daysOfWeek: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  userProfile: any;
  isEditing: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = true;
  private userSubscription?: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  initializeUserProfile() {
    if (this.userProfile != null) {
      this.userProfile.studyGoals = this.userProfile.studyGoals || [];
      this.userProfile.careerGoals = this.userProfile.careerGoals || [];
      this.userProfile.preferredLearningMethods =
        this.userProfile.preferredLearningMethods || [];
      this.userProfile.currentSkills = this.userProfile.currentSkills || [];
      this.userProfile.preferredContentTypes =
        this.userProfile.preferredContentTypes || [];
      this.userProfile.location = this.userProfile.location || {
        country: '',
        city: '',
      };
      this.userProfile.timeCommitment = this.userProfile.timeCommitment || {
        weeklyHours: '0',
        preferredDays: [],
      };
    }
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.userSubscription = this.authService.customUser$.subscribe({
      next: (userData) => {
        if (userData) {
          this.userProfile = userData;
          this.initializeUserProfile();
          this.errorMessage = '';
        } else {
          this.errorMessage = 'User details not found.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.errorMessage =
          'An error occurred while loading your profile. Please try again.';
        this.isLoading = false;
      },
    });
  }

  async updateUser(): Promise<void> {
    console.log('Updated User Data:', this.userProfile);
    if (this.userProfile) {
      if (typeof this.userProfile.currentSkills === 'string') {
        this.userProfile.currentSkills = this.userProfile.currentSkills
          .split(',')
          .map((skill: string) => skill.trim())
          .filter(Boolean);
      }
      if (typeof this.userProfile.preferredLearningMethods === 'string') {
        this.userProfile.preferredLearningMethods =
          this.userProfile.preferredLearningMethods
            .split(',')
            .map((method: string) => method.trim())
            .filter(Boolean);
      }
      if (this.userProfile.careerGoals?.length) {
        this.userProfile.careerGoals.forEach(
          (goal: { skillsToDevelop: any }) => {
            if (typeof goal.skillsToDevelop === 'string') {
              goal.skillsToDevelop = goal.skillsToDevelop
                .split(',')
                .map((skill: string) => skill.trim())
                .filter(Boolean);
            }
          }
        );
      }
      const { _id, ...userProfileToUpdate } = this.userProfile;

      try {
        await this.userService.updateUser(_id, userProfileToUpdate);
        this.isEditing = false;
        alert('Updated successfully');
        // Refresh the user data in AuthService
        await this.authService.loadCustomUserData(this.userProfile.userId);
      } catch (error) {
        console.error('Update failed:', error);
        alert('Sorry, Update failed');
      }
    } else {
      alert('UserProfile state is null, unable to update');
    }
  }
}
