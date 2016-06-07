import {Component, OnInit} from "@angular/core";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouterOutlet, Router } from '@angular/router-deprecated';


import {
    AboutComponent,
    AnnouncementsComponent,
    AmenitiesComponent,
    BoardComponent,
    ContactUsComponent,
    EventsCalendarComponent,
    FeesComponent,
    FooterComponent,
    FeaturesComponent,
    ForsaleComponent,
    HomeComponent,
    NavComponent,
    PicturesComponent,
    ServicesComponent,
    SigninComponent,
    SignupComponent

} from "./index";

import {
    AuthService

} from "./shared/index";

import {User} from "./shared/user.interface";

declare var toastr: any;
declare var $: any;
declare var firebase: any;


@Component({
    selector: "var-main",
    templateUrl: "app/app.component.html",
    directives: [FooterComponent, NavComponent, ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, AuthService],
})

@RouteConfig([
    { path: '/', name: 'Default', component: HomeComponent, useAsDefault: true },
    { path: '/home', name: 'Home', component: HomeComponent },
    { path: '/about', name: 'About', component: AboutComponent },
    { path: '/board', name: 'Board', component: BoardComponent },
    { path: '/features', name: 'Features', component: FeaturesComponent },
    { path: '/amenities', name: 'Amenities', component: AmenitiesComponent },
    { path: '/forsale', name: 'Forsale', component: ForsaleComponent },
    { path: '/fees', name: 'Fees', component: FeesComponent },
    { path: '/announcements', name: 'Announcements', component: AnnouncementsComponent },
    { path: '/pictures', name: 'Pictures', component: PicturesComponent },
    { path: '/services', name: 'Services', component: ServicesComponent },
    { path: '/contactus', name: 'Contactus', component: ContactUsComponent },
    { path: '/signup', name: 'Signup', component: SignupComponent },
    { path: '/signin', name: 'Signin', component: SigninComponent },
    { path: '/eventsCalendar', name: "EventsCalendar", component: EventsCalendarComponent }


])
export class AppComponent implements OnInit {

    constructor(private _router: Router, private _authService: AuthService) {

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        this.deleteCachedData();

    }

    ngOnInit(): any {
        //   this.createUnits();

        this._authService.getLoggedInEvent().subscribe(() => {
            var newUser: User = JSON.parse(localStorage.getItem("newUser"));
            console.log("user logged in");

            if (newUser) {
                toastr.success("Congratulations " + newUser.firstName + "!  You have successfully signed up.");
                console.log("new User", newUser);
                var fbUser = firebase.auth().currentUser;
                localStorage.removeItem("newUser");
                console.log("fbUser:", fbUser);
                firebase.database().ref("Users/" + fbUser.uid).set({
                    FirstName: newUser.firstName,
                    LastName: newUser.lastName,
                    Unit: newUser.unit
                })
                var allUnits: any = JSON.parse(localStorage.getItem("allUnits"));
                var updates = {};
                updates["/Units/" + newUser.unit + "/RegisteredUsers"] = +(allUnits[newUser.unit].RegisteredUsers) + 1;
                firebase.database().ref().update(updates);
                this._router.navigate(['Announcements'])
            }
            else {
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
                    var firstName: string = snapshot.val().FirstName;
                    toastr.info("Welcome back, " + firstName + "!");
                });
                this._router.navigate(['Announcements'])
            }

        });

        this._authService.getLoggedOutEvent().subscribe(() => {
            toastr.success("You have successfully logged out.");
            this.deleteCachedData();
            this._router.navigate(['Home']);
        });



    }

    deleteCachedData(): void {
        localStorage.clear();


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




}


export class AppSettings {

    public static get FIREBASE_APP(): string { return 'https://thevariations.firebaseio.com'; }
    public static get VARIATIONS_NAME(): string { return ' The Variations Condominium Association, Inc'; }

}


export class AppHelpers {

    public static parseDate(inputDate: string): Date {
        //Must be in yyyymmdd format.
        if (!inputDate) {
            return null;
        }

        try {
            var y: number = +(inputDate.toString().substr(0, 4)),
                m: number = +(inputDate.toString().substr(4, 2)) - 1,
                d: number = +(inputDate.toString().substr(6, 2));
            return new Date(y, m, d);
        }
        catch (err) {
            console.error(err);
            return null;
        }

    }

}
