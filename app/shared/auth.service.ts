import {Injectable, EventEmitter} from "angular2/core";
import {AppSettings}  from "../app.component";
import {User} from "./user.interface";

declare var Firebase: any;
declare var toastr: any;

@Injectable(

)
export class AuthService {

    constructor() { }
    private _userLoggedOut = new EventEmitter<any>();
    private _userLoggedIn = new EventEmitter<any>();

    signupUser(user: User) {
        const firebaseRef = new Firebase(AppSettings.FIREBASE_APP);
        localStorage.setItem("signedUp", "false");
        firebaseRef.createUser({
            email: user.email,
            password: user.password
        }, function (error, userData) {
            var errorMessage: string = "";
            if (error) {
                localStorage.setItem("signedUp", "error");
                switch (error.code) {
                    case "EMAIL_TAKEN":
                        errorMessage = "The new user account cannot be created because the email is already in use.";
                        console.log(errorMessage);
                        toastr.error(errorMessage);
                        break;
                    case "INVALID_EMAIL":
                        errorMessage = "The specified email is not a valid email.";
                        console.log(errorMessage);
                        toastr.error(errorMessage);
                        break;
                    default:
                        errorMessage = "Error creating user (" + error + ")";
                        console.log(errorMessage);
                        toastr.error(errorMessage);
                }   //end switch statement          

            } else {
                const firebaseRef = new Firebase(AppSettings.FIREBASE_APP + "/users");
                firebaseRef.child(userData.uid).set({ firstName: user.firstName, lastName: user.lastName, unit: user.unit }, (error) => {
                    toastr.success("Congratulations!   Your user account has been successfully created.");
                    console.log('Succesfully created user: ' + userData.uid);
                    localStorage.setItem("signedUp", "true");
                });


            }
        });
    }

    signinUser(user: User) {
        const firebaseRef = new Firebase(AppSettings.FIREBASE_APP);
        localStorage.removeItem('token');
        firebaseRef.authWithPassword({
            email: user.email,
            password: user.password
        }, function (error, authData) {
            if (error) {
                toastr.error(error);
                console.error(error);
            } else {
                localStorage.setItem('token', authData.token);     
                console.log(authData);
            }
        });
    }

    logout() {
        localStorage.removeItem('token');
        this._userLoggedOut.emit(null);
    }

    getLoggedInEvent(): EventEmitter {
        return this._userLoggedIn;

    }

    getLoggedOutEvent(): EventEmitter {
        return this._userLoggedOut;
    }

    isAuthenticated(): boolean {

        return localStorage.getItem('token') !== null;
    }

}