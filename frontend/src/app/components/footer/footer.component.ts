import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import { matArrowForwardRound } from '@ng-icons/material-icons/round';
import { octLinkExternal } from '@ng-icons/octicons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIconComponent, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  providers: [
    provideIcons({ matArrowForwardRound, octLinkExternal }),
    provideNgIconsConfig({
      size: '24px',
    }),
  ],
})
export class FooterComponent {
  redirectToGmail(): void {
    const userEmail = (
      document.querySelector('input[name="email"]') as HTMLInputElement
    ).value;
    const myEmail = 'pratiky2000@gmail.com'; // Replace with your email address
    const subject = encodeURIComponent('Contact');
    const body = encodeURIComponent(`Hello, I am ${userEmail}`);

    // Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${body}`;

    // Open Gmail compose window
    window.open(gmailUrl, '_blank');
  }
}
