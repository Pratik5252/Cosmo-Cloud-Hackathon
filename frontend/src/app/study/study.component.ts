import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import
//  { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons'; 1

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './study.component.html',
  styleUrl: './study.component.css',
})
export class StudyComponent {
  studyBuddyName: string | null = 'John Doe'; // Replace with logic to get study buddy name
  studyBuddyJobTitle: string | null = 'Senior Developer';
  studyBuddySkills: string | null = 'Java, Python, Angular';
  constructor(private router: Router) {}

  chatWithStudyBuddy() {
    // Implement logic to open chat with study buddy
  }

  removeStudyBuddy() {
    // TODO
  }

  navigateToFocus() {
    this.router.navigate(['/focus']);
  }
}
