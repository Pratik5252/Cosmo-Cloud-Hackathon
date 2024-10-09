import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  projectId: 'gen-lang-client-0865687306',
  appId: '1:386901429594:web:ad7fc2c7b2123e82be3763',
  storageBucket: 'gen-lang-client-0865687306.appspot.com',
  apiKey: 'AIzaSyC3Wb8yvD02COzaqPujaxp1o7ZIbItA4eI',
  authDomain: 'gen-lang-client-0865687306.firebaseapp.com',
  messagingSenderId: '386901429594',
  measurementId: 'G-8RCXK6DCZS',
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
