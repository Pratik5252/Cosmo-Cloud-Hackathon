import { Component, OnInit } from '@angular/core';
import { GeminiService } from '../services/gemini/gemini.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roadmaps',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roadmaps.component.html',
  styleUrl: './roadmaps.component.css',
})
export class RoadmapsComponent implements OnInit {
  inputField: string = '';
  result: string = '';
  loading: boolean = false;

  constructor(private geminiService: GeminiService) {}

  ngOnInit(): void {}

  async generateRoadmap() {
    this.loading = true;

    try {
      const resultText = await this.geminiService.generateRoadmap(
        this.inputField
      );
      this.result = resultText;
      console.log(this.result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.loading = false;
    }
  }
}
