import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl =
    'https://free-ap-south-1.cosmocloud.io/development/api/userpreference';
  private projectId = '66cf03ee391df6dcd462bcf0';
  private environmentId = '66cf03ee391df6dcd462bcf1';
  async getUser(userId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${userId}`, {
        headers: {
          projectId: this.projectId,
          environmentId: this.environmentId,
        },
      });
      console.log('User Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async updateUser(userId: string, userData: any) {
    try {
      const response = await axios.put(`${this.baseUrl}/${userId}`, userData, {
        headers: {
          projectId: this.projectId,
          environmentId: this.environmentId,
        },
      });
      console.log('Updated User Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }
}
