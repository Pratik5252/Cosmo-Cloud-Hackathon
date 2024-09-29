import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title: string = 'gen-model';
  myBtn: string = "Run"
  isDisabled: boolean = true; //attribute binding
  angularImage: string = '../assets/Image2.png'

  //style Binding
  bgColor: string = '#111111';
  titleColor: string = 'white';
  description: string = "font-size: 50px color: white"

  //class binding
  redText: string = 'abcd'
}