import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = environment.apiKey;
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateRoadmap(field: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: 'tunedModels/roadmap-i3r6ix7b1nsq', // Replace with your specific model ID
    });

    const generationConfig = {
      temperature: 0.5,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };

    const parts = [{ text: `input: ${field}` }, { text: 'output: ' }];

    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
        generationConfig,
      });

      // Access the text response from the result
      const responseText = result.response.text(); // Ensure that `text()` method is available

      return responseText; // Return the generated text
    } catch (error) {
      console.error('Error in Gemini API call:', error);
      throw new Error('Error generating content from Gemini API'); // Rethrow for handling in component
    }
  }
}
