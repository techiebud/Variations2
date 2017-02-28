import {FooterComponent, NavComponent} from "./index";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { routedComponents, routing } from "./app.routes";

import {AppComponent} from "./app.component";
import {AuthGuard} from "./shared/auth.guard";
import {AuthService} from "./shared/auth.service";
import { BrowserModule } from "@angular/platform-browser";
import {CookieService} from "angular2-cookie/core";
import {DataService} from "./shared/data.service";
import {FirebaseService} from "./shared/firebase.service";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { PdfViewerComponent } from "ng2-pdf-viewer";

@NgModule({
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    HttpModule, 
    routing
  ],
  // tslint:disable-next-line:object-literal-sort-keys
  declarations: [
     AppComponent,
     FooterComponent,
     NavComponent,
     routedComponents,
     PdfViewerComponent,
   ],
  providers: [FirebaseService, AuthService, DataService, CookieService, AuthGuard, FormBuilder  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
