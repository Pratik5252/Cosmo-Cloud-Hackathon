import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      this.userSubject.next(user);
    });
  }

  // Public getter to access the current user
  get currentUser(): User | null {
    return this.userSubject.value;
  }

  async signInWithGoogle(): Promise<User | null> {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google', error);
      return null;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('Error signing out', error);
    }
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }
}
