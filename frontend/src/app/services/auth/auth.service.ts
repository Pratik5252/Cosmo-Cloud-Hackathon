import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable, from, switchMap, of } from 'rxjs';
import { UserService } from '../user/userPreference.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  private customUserSubject: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);
  customUser$: Observable<any | null> = this.customUserSubject.asObservable();

  constructor(private auth: Auth, private userService: UserService) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
      if (user) {
        this.loadCustomUserData(user.uid);
      } else {
        this.customUserSubject.next(null);
      }
    });
  }

  async loadCustomUserData(uid: string): Promise<void> {
    try {
      const customUser = await this.userService.getUserByUid(uid);
      if (customUser) {
        const fullUserData = await this.userService.getUser(customUser._id);
        this.customUserSubject.next(fullUserData);
      } else {
        console.error('Custom user data not found');
        this.customUserSubject.next(null);
      }
    } catch (error) {
      console.error('Error loading custom user data:', error);
      this.customUserSubject.next(null);
    }
  }

  async signInWithGoogle(): Promise<User | null> {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
      const user = result.user;
      await this.ensureUserInBackend(user);
      return user;
    } catch (error) {
      console.error('Error signing in with Google', error);
      return null;
    }
  }

  private async ensureUserInBackend(user: User): Promise<void> {
    const existingUser = await this.userService.getUserByUid(user.uid);
    if (!existingUser) {
      const userData = {
        userId: user.uid,
        name: user.displayName,
        email: user.email,
      };
      await this.userService.createUser(userData);
    }
    await this.loadCustomUserData(user.uid);
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
      this.customUserSubject.next(null);
    } catch (error) {
      console.error('Error signing out', error);
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.customUser$.pipe(
            switchMap((customUser) => of(!!customUser))
          );
        }
        return of(false);
      })
    );
  }

  getCustomUserData(): Observable<any | null> {
    return this.customUser$;
  }
}
