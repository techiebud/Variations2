import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from "angular2/router";
import {HomeComponent} from "./home.component";
import {AboutComponent} from "./about.component";
import {FeaturesComponent} from "./features.component";
import {BoardComponent} from "./board.component";
import {AmenitiesComponent} from "./amenities.component";
import {ForsaleComponent} from "./forsale.component";
import {FeesComponent} from "./fees.component";
import {AnnouncementsComponent} from "./announcements.component";
import {ServicesComponent} from "./services.component";
import {ContactUsComponent} from "./contact-us.component";
import {SignupComponent} from "./signup.component";
import {SigninComponent} from "./signin.component";
import {NavComponent} from "./nav.component";
import {FooterComponent} from "./footer.component";
import {AuthRouterOutlet} from "./shared/auth-router-outlet.directive";
import {AuthService} from "./shared/auth.service";
import {EventsCalendarComponent} from "./events-calendar.component";
import {User} from "./shared//user.interface";
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
    { path: '/fees', name: 'Fees', component: FeesComponent },
    { path: '/announcements', name: 'Announcements', component: AnnouncementsComponent },
    { path: '/services', name: 'Services', component: ServicesComponent },
    { path: '/contactus', name: 'ContactUs', component: ContactUsComponent },
    { path: '/signup', name: 'Signup', component: SignupComponent },
    { path: '/signin', name: 'Signin', component: SigninComponent },
    { path: '/eventsCalendar', name: "EventsCalendar", component: EventsCalendarComponent }


])
export class AppComponent implements OnInit {

    constructor(private _router: Router, private _authService: AuthService) {

    }

    ngOnInit(): any {
     //   this.createUnits();
       firebase.database().ref('/Units').once('value').then((snapshot) =>  {    
          debugger;
          localStorage.setItem('allUnits', JSON.stringify(snapshot.val()))
        
          //  this.allUnits = snapshot.val();
           // console.log("units: ", this.ObjectLength(snapshot.val()));
        });
        this._authService.getLoggedInEvent().subscribe(() => {
            var newUser: User = JSON.parse(localStorage.getItem("newUser"));
            console.log("user logged in");
            this._router.navigate(['Home'])
            console.log("new User", newUser);
            if (newUser) {
                var fbUser = firebase.auth().currentUser;
                localStorage.removeItem("newUser");
                console.log("fbUser:", fbUser);
                firebase.database().ref("users/" + fbUser.uid).set({
                    FirstName: newUser.firstName,
                    LastName: newUser.lastName,
                    Unit: newUser.unit
                })
            }
            else {
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                    var firstName: string = snapshot.val().FirstName;
                    toastr.info("Welcome back, " + firstName);
                });
            }
        });

        this._authService.getLoggedOutEvent().subscribe(() => {
            toastr.success("You have successfully logged out.");
            this._router.navigate(['Home']);
        });


       
    }

    private ObjectLength(object) {
        var length = 0;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                ++length;
            }
        }
        return length;
    }

    private createUnits() {
        var unitNumbers: number[];
        for (var i = 1901; i <= 1938; i++) {
            //    unitNumbers.push(i);
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Variations Drive",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 1939; i <= 1949; i = i + 2) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Variations Drive",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 1958; i <= 1960; i = i + 2) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Variations Drive",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 1961; i <= 1978; i++) {
            //    unitNumbers.push(i);
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Variations Drive",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 1980; i <= 2000; i = i + 2) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Variations Drive",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 2001; i <= 2017; i++) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Variations Drive",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 2051; i <= 2060; i++) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Clairmeade Way",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 2070; i <= 2080; i++) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Clairmeade Valley Road",
                RegisteredUsers: 0,
                Owner: "unknown"
            });
        }
        for (var i = 2081; i <= 2085; i = i + 2) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Clairmeade Valley Road",
                RegisteredUsers: 0,
                Owner: "unknown"
            });
        }
        for (var i = 2097; i <= 2099; i = i + 2) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Clairmeade Valley Road",
                RegisteredUsers: 0,
                Owner: "unknown"
            });
        }
        for (var i = 2100; i <= 2112; i++) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Clairmeade Valley Road",
                RegisteredUsers: 0,
                Owner: "unknown"
            });
        }





    }



}


export class AppSettings {
    
    public static get FIREBASE_APP() : string {return 'https://thevariations.firebaseio.com';}
}
