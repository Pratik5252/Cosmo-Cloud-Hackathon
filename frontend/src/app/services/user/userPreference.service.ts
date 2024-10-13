import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private baseUrl =
		'https://free-ap-south-1.cosmocloud.io/development/api/userpreference';
	private projectId = '66cf03ee391df6dcd462bcf0';
	private environmentId = '66cf03ee391df6dcd462bcf1';
	private headers = {
		projectId: this.projectId,
		environmentId: this.environmentId,
	}
	user: User | null = null;

	getUser(userId: string) {
		axios.get(`${this.baseUrl}/${userId}`, { headers: this.headers })
			.then((response) => {
				console.log('User Data: ', response.data);
				return response.data;
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		return null;
	}

	updateUser(userId: string, userData: User) {
		axios.put(`${this.baseUrl}/${userId}`, userData, { headers: this.headers })
			.then((response) => {
				console.log('Updated User Data:', response.data);
				return response.data;
			})
			.catch((error) => {
				console.error('Error updating user data:', error);
			})
		return null;
	}

	createUser(userData: any) {
		this.user = this.getUser(userData.userId);
		if (this.user) {
			console.log("User " + userData.userId + " already exist.");
			return this.user;
		}

		console.log("Creating new user account for " + userData.userId);
		axios.post(`${this.baseUrl}`, userData, { headers: this.headers })
			.then((response) => {
				console.log(response.data);
				this.user = response.data;
				return response.data;
			})
			.catch((error) => {
				console.error("Unable to create user " + error);
			})
	}
}
