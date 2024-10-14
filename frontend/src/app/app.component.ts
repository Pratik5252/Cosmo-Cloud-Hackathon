import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

// import { AuthService } from './services/auth/auth.service';
import { NavComponent } from './components/nav/nav.component';
import { ChatComponent } from './chat/chat.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    ChatComponent,
    CommonModule,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  showNavbarFooter: boolean = true;
  constructor(private router: Router) {
    //To hide navbar in specific route
    this.router.events.subscribe(() => {
      const hideNavbarOnRoutes = ['/roadmap'];

      // Check if the current route is one of those
      this.showNavbarFooter = !hideNavbarOnRoutes.includes(this.router.url);
    });
  }
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
