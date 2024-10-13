import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
// import { AuthService } from './services/auth/auth.service';
import { NavComponent } from './components/nav/nav.component';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'frontend';

  ngOnInit(): void {
    // TODO: Implement authentication gateway
    // if (!this.AuthService.isAuthenticated()) {
    // this.router.navigate(['/landingpage']);
    // } else {
    // this.router.navigate(['/dashboard']);
    // }
  }
}
