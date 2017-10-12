import { NotificationService } from './shared/notification.service';
import {FooterComponent, NavComponent} from "./index";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { routedComponents, routing } from "./app.routes";

import {AppComponent} from "./app.component";
import {AuthGuard} from "./shared/auth.guard";
import {AuthService} from "./shared/auth.service";
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";


import {CookieService} from "angular2-cookie/core";
import {DataService} from "./shared/data.service";
import {FirebaseService} from "./shared/firebase.service";
import { HttpModule } from "@angular/http";
import {Pipe, PipeTransform, NgModule} from '@angular/core'
import { PdfViewerComponent } from "ng2-pdf-viewer";


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

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
     SafePipe
   ],
  providers: [FirebaseService, AuthService, DataService, NotificationService, CookieService, AuthGuard, FormBuilder  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
