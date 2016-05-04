import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from "angular2/router";
import {HomeComponent} from "./home.component";
import {AboutComponent} from "./about.component";
import {FeaturesComponent} from "./features.component";
import {ServicesComponent} from "./services.component";
import {PricingComponent} from "./pricing.component";
import {ContactUsComponent} from "./contact-us.component";
import {SignupComponent} from "./unprotected/signup.component";
import {SigninComponent} from "./unprotected/signin.component";
import {NavComponent} from "./nav.component";
import {FooterComponent} from "./footer.component";
import {AuthRouterOutlet} from "./shared/auth-router-outlet.directive";
import {AuthService} from "./shared/auth.service";
declare var toastr: any;


@Component({
    selector: "var-main",
    templateUrl: "app/app.component.html",
    directives: [AuthRouterOutlet, FooterComponent, NavComponent],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
  { path: '/about', name: 'About', component: AboutComponent},
  { path: '/features', name: 'Features', component: FeaturesComponent},
  { path: '/services', name: 'Services', component: ServicesComponent},
  { path: '/pricing', name: 'Pricing', component: PricingComponent},
  { path: '/contactus', name: 'ContactUs', component: ContactUsComponent},
  { path: '/signup', name: 'Signup', component: SignupComponent},
  { path: '/signin', name: 'Signin', component: SigninComponent},
  
  
])
export class AppComponent implements OnInit {

    constructor(private _router: Router, private _authService: AuthService) {
     
     }

    ngOnInit() : any {
          toastr.info("Welcome!");
          this._authService.getLoggedOutEvent().subscribe(() => this._router.navigate(['Signin']));
          this._authService.getLoggedInEvent().subscribe(() => this._router.navigate(['Home']));
   
     }
}

export class AppSettings {
    
    public static get FIREBASE_APP() : string {return 'https://thevariations.firebaseio.com';}
}