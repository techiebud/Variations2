import {Injectable, EventEmitter} from "angular2/core";
import {AppSettings}  from "../app.component";
import {User} from "./user.interface";

declare var firebase: any;
declare var toastr: any;

@Injectable(

)
export class AuthService {
    
    
    private _userLoggedOut = new EventEmitter<any>();
    private _userLoggedIn = new EventEmitter<any>();

    constructor() {

        var config = {
            apiKey: "AIzaSyBzLfPOqnW2ccBGIwprbfAQtat4aWiFakM",
            authDomain: "thevariations.firebaseapp.com",
            databaseURL: "https://thevariations.firebaseio.com",
            storageBucket: "project-4248197981206346819.appspot.com",
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                toastr.success("Congratulations, you have successfully logged in.");
                this._userLoggedIn.emit(null);            
                
            } else {
               toastr.info("Residents, please log in to view all features.");
            }
        });
        
        this._userLoggedIn.emit(null);
    }
    signupUser(user: User) {

    
        var email: string = user.email,
        var password: string = user.password

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            localStorage.setItem("signedUp", "error");
            var errorMessage: string = "";
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
                    errorMessage = "The specified email is not a valid email.";
                    console.log(errorMessage);
                    toastr.error(errorMessage);
                    break;
                default:
                    errorMessage = "Error creating user (" + error + ")";
                    console.log(errorMessage);
                    toastr.error(errorMessage);

            }   //end switch statement      
        });  
    }  //signup user

    signinUser(user: User) {

        firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            toastr.error(errorMessage);
            console.error(error);
        });
    }



    logout() {
        firebase.auth().signOut().then(function () {
            this._userLoggedOut.emit(null);
        }, function (error) {
            toastr.error("Cannot sign user out (" + error + ")");
        });

    }

    getLoggedInEvent(): EventEmitter {
      //  toastr.error("getLoggedInEvent()");
        return this._userLoggedIn;

    }

    getLoggedOutEvent(): EventEmitter {
 
        return this._userLoggedOut;
    }

    isAuthenticated(): boolean {
        var user = firebase.auth().currentUser;
        return user ? true : false;

    }

}