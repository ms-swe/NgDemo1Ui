/// <reference types="@angular/localize" />

import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_ROUTES } from './app/app.routes';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { loadTranslations } from '@angular/localize';
import { registerLocaleData } from '@angular/common';

async function setupLocale() {
  if (getLocale() !== 'de-DE') {
    return 'en-US';
  }
  const response = await fetch('assets/messages.de.json');
  const result = await response.json();
  loadTranslations(result.translations);
  const localeDe = await import('@angular/common/locales/de');
  registerLocaleData(localeDe.default);
  return 'de-DE';
}

export function getLocale() {
  return localStorage.getItem('locale') ?? 'en-US';
}

setupLocale().then((localeValue) =>
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
        BrowserModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatButtonModule,
        MatSnackBarModule
      ),
      provideRouter(APP_ROUTES),
      provideHttpClient(withInterceptorsFromDi()),
      provideAnimations(),
      provideStore(),
      provideEffects(),
      isDevMode() ? provideStoreDevtools({ connectInZone: true }) : [],
      { provide: LOCALE_ID, useValue: localeValue },
    ],
  }).catch((err) => console.error(err))
);
