import { bootstrap } from '@angular/platform-browser-dynamic';
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS}  from "@angular/router-deprecated";
import {HTTP_PROVIDERS} from "@angular/http";
import {AuthService} from "./shared/auth.service";
import {DataService} from "./shared/data.service";
import {FirebaseService} from "./shared/firebase.service";  
import {CookieService} from 'angular2-cookie/core';


bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, FirebaseService, AuthService, DataService, CookieService])
  .then(success => console.log(`Bootstrap success`))
  .catch(error => console.log(error));