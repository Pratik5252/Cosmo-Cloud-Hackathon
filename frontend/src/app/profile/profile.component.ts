import { Component, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {
  sampleUserId: string = '670b6a847e6059ef85f58c55';
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
  errorMessage: String = '';
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
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

  async loadUserProfile(): Promise<void> {
    // const user = await firstValueFrom(this.authService.createdUser$);
    this.userService
      .getUser(this.sampleUserId)
      .then((response) => {
        this.isLoading = false;
        this.errorMessage = '';
        this.userProfile = response;
        if (response === null) {
          this.errorMessage =
            'We are facing some issues loading your profile.  Please reload the window';
        }
        this.initializeUserProfile();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async updateUser(): Promise<void> {
    console.log('Updated User Data:', this.userProfile);
    if (this.userProfile) {
      if (typeof this.userProfile.currentSkills === 'string') {
        this.userProfile.currentSkills = this.userProfile.currentSkills
          .split(',')
          .map((skill: string) => skill.trim())
          .filter(Boolean); // Remove empty values
      }
      if (typeof this.userProfile.preferredLearningMethods === 'string') {
        this.userProfile.preferredLearningMethods =
          this.userProfile.preferredLearningMethods
            .split(',')
            .map((method: string) => method.trim())
            .filter(Boolean); // Remove empty values
      }
      // Ensure each 'skillsToDevelop' inside careerGoals is an array of strings
      if (this.userProfile.careerGoals?.length) {
        this.userProfile.careerGoals.forEach(
          (goal: { skillsToDevelop: any }) => {
            if (typeof goal.skillsToDevelop === 'string') {
              goal.skillsToDevelop = goal.skillsToDevelop
                .split(',')
                .map((skill: string) => skill.trim())
                .filter(Boolean); // Remove empty values
            }
          }
        );
      }
      const { _id, ...userProfileToUpdate } = this.userProfile;

      this.userService
        .updateUser(this.sampleUserId, userProfileToUpdate)
        .then((response) => {
          this.isEditing = false;
          alert('Updated successfully');
        })
        .catch((error) => {
          console.error('Update failed:', error);
          alert('Sorry, Update failed');
        });
    } else alert('UserPRofile state is null, unable to update');
  }
}
