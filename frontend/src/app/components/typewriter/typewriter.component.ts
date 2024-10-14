import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Typewriter from 'typewriter-effect/dist/core';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css'],
  standalone: true,
})
export class TypewriterComponent implements AfterViewInit {
  @ViewChild('app', { static: false }) appRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    // Check if the platform is a browser
    if (isPlatformBrowser(this.platformId)) {
      const appElement = this.appRef.nativeElement;

      const typewriter = new Typewriter(appElement, {
        loop: true,
        delay: 75,
      });

      typewriter
        .pauseFor(1000)
        .typeString('Frontend')
        .pauseFor(300)
        .deleteChars(10)
        .typeString('Backend')
        .pauseFor(300)
        .deleteChars(10)
        .typeString('AWS')
        .pauseFor(400)
        .deleteChars(10)
        .start();
    }
  }
}
