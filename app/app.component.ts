import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from "angular2/router";
import {HomeComponent} from "./home.component";
import {AboutComponent} from "./about.component";
import {FeaturesComponent} from "./features.component";
import {BoardComponent} from "./board.component";
import {AmenitiesComponent} from "./amenities.component";
import {ForsaleComponent} from "./forsale.component";
import {EventsComponent} from "./events.component";
import {FeesComponent} from "./fees.component";
import {AnnouncementsComponent} from "./announcements.component";
import {ServicesComponent} from "./services.component";
import {ContactUsComponent} from "./contact-us.component";
import {SignupComponent} from "./unprotected/signup.component";
import {SigninComponent} from "./unprotected/signin.component";
import {NavComponent} from "./nav.component";
import {FooterComponent} from "./footer.component";
import {AuthRouterOutlet} from "./shared/auth-router-outlet.directive";
import {AuthService} from "./shared/auth.service";
declare var toastr: any;
declare var $: any;
declare var firebase: any;


@Component({
    selector: "var-main",
    templateUrl: "app/app.component.html",
    directives: [AuthRouterOutlet, FooterComponent, NavComponent],
    providers: [ROUTER_PROVIDERS, AuthService]
})

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/about', name: 'About', component: AboutComponent },
    { path: '/board', name: 'Board', component: BoardComponent },
    { path: '/features', name: 'Features', component: FeaturesComponent },
    { path: '/amenities', name: 'Amenities', component: AmenitiesComponent },
    { path: '/forsale', name: 'Forsale', component: ForsaleComponent },
    { path: '/events', name: 'Events', component: EventsComponent },
    { path: '/fees', name: 'Fees', component: FeesComponent },
    { path: '/announcements', name: 'Announcements', component: AnnouncementsComponent },
    { path: '/services', name: 'Services', component: ServicesComponent },
    { path: '/contactus', name: 'ContactUs', component: ContactUsComponent },
    { path: '/signup', name: 'Signup', component: SignupComponent },
    { path: '/signin', name: 'Signin', component: SigninComponent },


])
export class AppComponent implements OnInit {

    constructor(private _router: Router, private _authService: AuthService) {     

    }

    ngOnInit(): any {
        //  toastr.info("Welcome!");        
        this._authService.getLoggedInEvent().subscribe(() => {           
            console.log("user logged in");
            this._router.navigate(['Home'])
        }
        );

        this._authService.getLoggedOutEvent().subscribe(() => {           
            toastr.success("You have successfully logged out.");
            this._router.navigate(['Home']);
        }
        );

    }
}
