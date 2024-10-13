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
	contentTypes = ['Text', 'Video', 'Audio', 'Interactive', 'Quiz', 'PDF'];
	userProfile = {
		id: '',
		name: '',
		email: '',
		studyGoals: [{ subject: '', level: '', duration: '' }],
		careerGoals: [{ field: '', role: '', skillsToDevelop: [] }],
		preferredLearningMethods: [],
		currentSkills: [],
		preferredContentTypes: [],
		location: { country: '', city: '' },
		timeCommitment: { weeklyHours: 0, preferredDays: [] },
		createdAt: '',
		updatedAt: ''
	};
	isEditing: boolean = false;

	constructor(
		private userService: UserService,
		private authService: AuthService
	) { }

	ngOnInit() {
		this.loadUserProfile();
	}

	async loadUserProfile() {
		try {
			const user = await firstValueFrom(this.authService.createdUser$);
			console.log("User data: " + user);

			if (user && user.id) {
				this.userProfile = await this.userService.getUser(user.id);
			} else {
				// this.userProfile = null;
			}
		} catch (error) {
			console.error('Error loading user profile:', error);
			// this.userProfile = null;
		}
	}

	async updateUser() {
		console.log('Updated User Data:', this.userProfile);
		await this.userService.updateUser(this.userProfile.id, this.userProfile);
	}
}
