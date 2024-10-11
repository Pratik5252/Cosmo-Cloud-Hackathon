import { Component, OnInit } from '@angular/core';
import { ChatService, ChatMessage } from '../services/gemini/gemini.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
