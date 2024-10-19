import axios from 'axios';
import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';

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
  };

  async getUserByUid(uid: string): Promise<any> {
    const limit = 50;
    let offset = 0;
    let userFound = null;
    try {
      while (!userFound) {
        const response = await axios.get(
          `${this.baseUrl}?limit=${limit}&offset=${offset}`,
          {
            headers: this.headers,
          }
        );
        const users = response.data.data;
        const matchedUser = users.find((user: any) => user.userId === uid);
        return matchedUser ? matchedUser : null; // Return matched user or null if not found
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  }

  async createUser(userData: any): Promise<any> {
    return axios
      .post(`${this.baseUrl}`, userData, { headers: this.headers })
      .then((response) => {
        console.log('User created/fetched:', response.data);
        return response.data; // The created or existing user
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        return null;
      });
  }

  async getUser(userId: string): Promise<any> {
    return axios
      .get(`${this.baseUrl}/${userId}`, { headers: this.headers })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error getting user:', error);
        return null;
      });
  }

  async updateUser(userId: string, userData: any): Promise<any> {
    return axios
      .put(`${this.baseUrl}/${userId}`, userData, { headers: this.headers })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error updating user:', error);
        return null;
      });
  }
}
