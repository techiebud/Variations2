import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormBuilder, ReactiveFormsModule} from "@angular/forms";


import {AppComponent} from "./app.component";
import {FooterComponent,NavComponent} from "./index";
import {AuthService} from "./shared/auth.service";
import {AuthGuard} from "./shared/auth.guard";
import {DataService} from "./shared/data.service";
import {FirebaseService} from "./shared/firebase.service";  
import {CookieService} from 'angular2-cookie/core';
import { routing, routedComponents } from './app.routes';
                                                              
                     
@NgModule({
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    HttpModule, 
    routing
  ],
  declarations: [
    AppComponent, 
     FooterComponent, 
     NavComponent,
     routedComponents      
   ],
  providers: [FirebaseService, AuthService, DataService, CookieService, AuthGuard, FormBuilder  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
