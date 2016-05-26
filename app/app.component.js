"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_deprecated_1 = require('@angular/router-deprecated');
var index_1 = require("./index");
var index_2 = require("./shared/index");
var AppComponent = (function () {
    function AppComponent(_router, _authService) {
        this._router = _router;
        this._authService = _authService;
    }
    AppComponent.prototype.ngOnInit = function () {
        //   this.createUnits();
        var _this = this;
        this._authService.getLoggedInEvent().subscribe(function () {
            var newUser = JSON.parse(localStorage.getItem("newUser"));
            console.log("user logged in");
            if (newUser) {
                console.log("new User", newUser);
                var fbUser = firebase.auth().currentUser;
                localStorage.removeItem("newUser");
                console.log("fbUser:", fbUser);
                firebase.database().ref("Users/" + fbUser.uid).set({
                    FirstName: newUser.firstName,
                    LastName: newUser.lastName,
                    Unit: newUser.unit
                });
                var allUnits = JSON.parse(localStorage.getItem("allUnits"));
                var updates = {};
                updates["/Units/" + newUser.unit + "/RegisteredUsers"] = +(allUnits[newUser.unit].RegisteredUsers) + 1;
                firebase.database().ref().update(updates);
            }
            else {
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
                    var firstName = snapshot.val().FirstName;
                    toastr.info("Welcome back, " + firstName);
                });
            }
            _this._router.navigate(['Home']);
        });
        this._authService.getLoggedOutEvent().subscribe(function () {
            toastr.success("You have successfully logged out.");
            localStorage.removeItem("allUnits");
            _this._router.navigate(['Home']);
        });
    };
    AppComponent.prototype.ObjectLength = function (object) {
        var length = 0;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                ++length;
            }
        }
        return length;
    };
    AppComponent.prototype.createUnits = function () {
        var unitNumbers;
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
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "var-main",
            templateUrl: "app/app.component.html",
            directives: [index_1.FooterComponent, index_1.NavComponent, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [router_deprecated_1.ROUTER_PROVIDERS, index_2.AuthService]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', name: 'Home', component: index_1.HomeComponent, useAsDefault: true },
            { path: '/about', name: 'About', component: index_1.AboutComponent },
            { path: '/board', name: 'Board', component: index_1.BoardComponent },
            { path: '/features', name: 'Features', component: index_1.FeaturesComponent },
            { path: '/amenities', name: 'Amenities', component: index_1.AmenitiesComponent },
            { path: '/forsale', name: 'Forsale', component: index_1.ForsaleComponent },
            { path: '/fees', name: 'Fees', component: index_1.FeesComponent },
            { path: '/announcements', name: 'Announcements', component: index_1.AnnouncementsComponent },
            { path: '/services', name: 'Services', component: index_1.ServicesComponent },
            { path: '/contactus', name: 'ContactUs', component: index_1.ContactUsComponent },
            { path: '/signup', name: 'Signup', component: index_1.SignupComponent },
            { path: '/signin', name: 'Signin', component: index_1.SigninComponent },
            { path: '/eventsCalendar', name: "EventsCalendar", component: index_1.EventsCalendarComponent }
        ]), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, index_2.AuthService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var AppSettings = (function () {
    function AppSettings() {
    }
    Object.defineProperty(AppSettings, "FIREBASE_APP", {
        get: function () { return 'https://thevariations.firebaseio.com'; },
        enumerable: true,
        configurable: true
    });
    return AppSettings;
}());
exports.AppSettings = AppSettings;
//# sourceMappingURL=app.component.js.map