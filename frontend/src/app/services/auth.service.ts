import { Injectable }
    from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor() { }

    signup(): boolean {
        // Logic to make API call for signup
        return true;
    }
    
    login(): boolean {
        // Logic to make API call for login
        return true;
    }

    isAuthenticated(): boolean {
        // Modify to true or false for testing app without logging in
        return true;
    }
}
