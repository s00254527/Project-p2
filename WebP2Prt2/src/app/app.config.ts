import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    //you have this in your worksheet, my current completed lab
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideHttpClient()]
};
