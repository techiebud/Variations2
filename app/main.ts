import { bootstrap } from '@angular/platform-browser-dynamic';
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HTTP_PROVIDERS} from "@angular/http";
import {AuthService} from "./shared/auth.service";

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthService])
  .then(success => console.log(`Bootstrap success`))
  .catch(error => console.log(error));
