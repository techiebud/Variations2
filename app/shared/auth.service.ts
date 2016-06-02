import {Injectable, EventEmitter} from "@angular/core";
import {User} from "./user.interface";
// import {toastr} from  "./node_mddules/toastr";

declare var firebase: any;
declare var toastr: any;


@Injectable(
)
export class AuthService {

    private _userLoggedOut = new EventEmitter<any>();
    private _userLoggedIn = new EventEmitter<any>();
    userIsAuthenticated: boolean;
  

    constructor() {

        var config = {
            apiKey: "AIzaSyBzLfPOqnW2ccBGIwprbfAQtat4aWiFakM",
            authDomain: "thevariations.firebaseapp.com",
            databaseURL: "https://thevariations.firebaseio.com",
            storageBucket: "project-4248197981206346819.appspot.com",
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User has signed in");
                console.log(user);               
                
                this._userLoggedIn.emit(true);
            } else {
               // toastr.info("Residents, please log in to view all features.");
            }
        });

    }
    signupUser(user: User) {
        
   
      
        localStorage.setItem("newUser", JSON.stringify(user)); 
        
        var email: string = user.email;
        var password: string = user.password;

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
           
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
                    errorMessage = "Must enter a strong password.";
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
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            toastr.error(errorMessage);
            console.error(error);
        });
    }
    
    sendResetPasswordEmail(email: string)
    {
          firebase.auth().sendPasswordResetEmail(email)
          .then(function() {
           toastr.success("Email sent to reset password");})
           .catch(function (error) {          
           toastr.error(error.message);
          });
        
    }



    logout() {     
        console.log("auth: logout");
        firebase.auth().signOut().then(() => {
            this._userLoggedOut.emit(null);
        }, function (error) {            
            toastr.error("Cannot sign user out (" + error + ")");
        });

    }

    getLoggedInEvent(): EventEmitter<any>  {
        return this._userLoggedIn;

    }

    getLoggedOutEvent(): EventEmitter<any> {

        console.log(this._userLoggedOut);
        return this._userLoggedOut;
    }

    isAuthenticated(): boolean {
        var user = firebase.auth().currentUser;
        return user ? true : false;

    }

}