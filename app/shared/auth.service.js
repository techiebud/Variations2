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
var AuthService = (function () {
    function AuthService() {
        var _this = this;
        this._userLoggedOut = new core_1.EventEmitter();
        this._userLoggedIn = new core_1.EventEmitter();
        var config = {
            apiKey: "AIzaSyBzLfPOqnW2ccBGIwprbfAQtat4aWiFakM",
            authDomain: "thevariations.firebaseapp.com",
            databaseURL: "https://thevariations.firebaseio.com",
            storageBucket: "project-4248197981206346819.appspot.com",
        };
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("User has signed in");
                console.log(user);
                _this._userLoggedIn.emit(true);
            }
            else {
            }
        });
    }
    AuthService.prototype.signupUser = function (user) {
        localStorage.setItem("newUser", JSON.stringify(user));
        var email = user.email;
        var password = user.password;
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorMessage = "";
            switch (error.code) {
                case "auth/email-already-in-us":
                    errorMessage = "The new user account cannot be created because the email is already in use.";
                    console.log(errorMessage);
                    toastr.error(errorMessage);
                    break;
                case "auth/email-already-in-us":
                    errorMessage = "The specified email is not a valid email.";
                    console.log(errorMessage);
                    toastr.error(errorMessage);
                    break;
                case "auth/weak-password":
                    errorMessage = "Must enter a strong password.";
                    console.log(errorMessage);
                    toastr.error(errorMessage);
                    break;
                default:
                    errorMessage = "Error creating user (" + error + ")";
                    console.log(errorMessage);
                    toastr.error(errorMessage);
            } //end switch statement      
        });
    }; //signup user
    AuthService.prototype.signinUser = function (user) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function (error) {
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            toastr.error(errorMessage);
            console.error(error);
        });
    };
    AuthService.prototype.sendResetPasswordEmail = function (email) {
        firebase.auth().sendPasswordResetEmail(email)
            .then(function () {
            toastr.success("Email sent to reset password");
        })
            .catch(function (error) {
            toastr.error(error.message);
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        console.log("auth: logout");
        firebase.auth().signOut().then(function () {
            _this._userLoggedOut.emit(null);
        }, function (error) {
            toastr.error("Cannot sign user out (" + error + ")");
        });
    };
    AuthService.prototype.getLoggedInEvent = function () {
        return this._userLoggedIn;
    };
    AuthService.prototype.getLoggedOutEvent = function () {
        console.log(this._userLoggedOut);
        return this._userLoggedOut;
    };
    AuthService.prototype.isAuthenticated = function () {
        var user = firebase.auth().currentUser;
        return user ? true : false;
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map