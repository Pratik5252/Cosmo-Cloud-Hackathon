import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private messagesSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<
    ChatMessage[]
  >([]);

  constructor() {
    this.genAI = new GoogleGenerativeAI(environment.apiKey); // Replace with your actual API key
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  getMessages(): Observable<ChatMessage[]> {
    return this.messagesSubject.asObservable();
  }

  async sendMessage(message: string) {
    const currentMessages = this.messagesSubject.value;
    currentMessages.push({ role: 'user', content: message });
    this.messagesSubject.next(currentMessages);

    currentMessages.push({ role: 'bot', content: '' });
    this.messagesSubject.next(currentMessages);

    try {
      const result = await this.model.generateContent(message);
      const response = await result.response;
      const botMessage = response.text();

      currentMessages[currentMessages.length - 1] = {
        role: 'bot',
        content: botMessage,
      };
      this.messagesSubject.next(currentMessages);
    } catch (error) {
      console.error('Error generating response:', error);
      currentMessages[currentMessages.length - 1] = {
        role: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      this.messagesSubject.next(currentMessages);
    }
  }
}
