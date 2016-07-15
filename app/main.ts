import { bootstrap } from '@angular/platform-browser-dynamic';
import {AppComponent} from "./app.component";
import {HTTP_PROVIDERS} from "@angular/http";
import {AuthService} from "./shared/auth.service";
import { AuthGuard } from "./shared/auth.guard";
import {DataService} from "./shared/data.service";
import {FirebaseService} from "./shared/firebase.service";  
import {CookieService} from 'angular2-cookie/core';
import { APP_ROUTES_PROVIDER } from './app.routes';
import { disableDeprecatedForms, provideForms } from "@angular/forms";



bootstrap(AppComponent, [APP_ROUTES_PROVIDER, HTTP_PROVIDERS, FirebaseService, AuthService, DataService, CookieService, AuthGuard, provideForms(), disableDeprecatedForms()])
  .then(success => console.log(`Bootstrap success`))
  .catch(error => console.log(error));