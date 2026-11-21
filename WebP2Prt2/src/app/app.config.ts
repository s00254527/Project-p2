import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error.interceptors';
import { provideHttpClient, withInterceptors} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    //you have this in your worksheet, my current completed lab
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withComponentInputBinding()), provideHttpClient(withInterceptors([errorInterceptor]))]
};
