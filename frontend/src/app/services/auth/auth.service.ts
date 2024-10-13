import { Injectable } from '@angular/core';
import {
	Auth,
	GoogleAuthProvider,
	signInWithPopup,
	User,
} from '@angular/fire/auth';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { UserService } from '../user/userPreference.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private userSubject: BehaviorSubject<User | null> =
		new BehaviorSubject<User | null>(null);
	user$: Observable<User | null> = this.userSubject.asObservable();

	private createdUserSubject: BehaviorSubject<any | null> = new BehaviorSubject<
		any | null
	>(null);
	createdUser$: Observable<any | null> = this.createdUserSubject.asObservable();

	constructor(private auth: Auth, private userServicce: UserService) {
		this.auth.onAuthStateChanged((user) => {
			this.userSubject.next(user);
		});
	}

	// Public getter to access the current user
	get currentUser(): User | null {
		return this.userSubject.value;
	}

	get createdUser(): any | null {
		return this.createdUserSubject.value;
	}

	async signInWithGoogle(): Promise<User | null> {
		try {
			const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
			const users = result.user;
			const userData = {
				userId: users.uid,
				name: users.displayName,
				email: users.email,
			};
			console.log(users);

			const user = await this.userServicce.createUser(userData);
			this.createdUserSubject.next(user);

			// return user;
		} catch (error) {
			console.error('Error signing in with Google', error);

		}
		return null;
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
