import { bootstrap } from "angular2/platform/browser";
import { AppComponent } from "./app.component";
import {AuthService} from "./shared/auth.service";

bootstrap(AppComponent, [AuthService])
  .then(success => console.log(`Bootstrap success`))
  .catch(error => console.log(error));
