import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideStore } from '@ngrx/store';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // bootstrapApplication(AppComponent,{
  //   providers:[provideRouter(routes),provideStore()]
  // }).catch((error)=>console.error(error));