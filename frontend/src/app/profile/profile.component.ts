import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/userPreference.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  // userId: string = '66fd51128d39ddfbd4fbad30';
  userProfile: any = {};
  isEditing: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      const user = await firstValueFrom(this.authService.createdUser$);
      console.log(user);

      if (user && user.id) {
        this.userProfile = await this.userService.getUser(user.id);
      } else {
        this.userProfile = null;
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      this.userProfile = null;
    }
  }

  async updateUser() {
    // Implement the update logic here
    // You may want to send a PUT request to update the user
    console.log('Updated User Data:', this.userProfile);
    // Call the API to update the user profile, similar to getUser
  }
}
