import {Injectable, EventEmitter} from "angular2/core";
import {AppSettings}  from "../app.component";
import {User} from "./user.interface";

declare var Firebase: any;
declare var toastr: any;

@Injectable(
  
)
export class AuthService {
    
    constructor () {}
    private _userLoggedOut = new EventEmitter<any>();
    private _userLoggedIn = new EventEmitter<any>();
    
    signupUser(user: User) {
        const firebaseRef = new Firebase(AppSettings.FIREBASE_APP);
        localStorage.setItem("signedUp", "false");
        firebaseRef.createUser({
            email: user.email,
            password: user.password
        }, function(error, userData) {
            if (error) {
                toastr.error(error);
                console.error(error);
            } else {
                toastr.success("Successfully created user: " + userData.uid);
                console.log('Successfully created user: ' + userData.uid);
                localStorage.setItem("signedUp", "true");
            }
        });
    }

    signinUser(user: User) {
        const firebaseRef = new Firebase(AppSettings.FIREBASE_APP);
        firebaseRef.authWithPassword({
            email: user.email,
            password: user.password
        }, function(error, authData) {
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