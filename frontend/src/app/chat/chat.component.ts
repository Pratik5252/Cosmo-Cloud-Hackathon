import { Component, OnInit } from '@angular/core';
import { ChatService, ChatMessage } from '../services/gemini/gemini.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// matChatBubbleRound
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import {
  matChatBubbleRound,
  matSendRound,
} from '@ng-icons/material-icons/round';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [CommonModule, FormsModule, NgIconComponent],
  providers: [
    provideIcons({ matChatBubbleRound, matSendRound }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
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
