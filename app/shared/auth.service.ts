import {Injectable, EventEmitter} from "@angular/core";
import {User} from "./user.interface";
import {AppHelpers} from "../app.component";
// import {toastr} from  "./node_mddules/toastr";

declare var firebase: any;
declare var toastr: any;
declare var md5: any;


@Injectable(
)
export class AuthService {

    private _userLoggedOut = new EventEmitter<any>();
    private _userLoggedIn = new EventEmitter<any>();
    private _passwordReset = new EventEmitter<any>();
    private _forgotPasswordEmailSent = new EventEmitter<any>();
    userIsAuthenticated: boolean;
    userGravatarURL: string = "";

    constructor() {
        var config = {
            apiKey: "AIzaSyBzLfPOqnW2ccBGIwprbfAQtat4aWiFakM",
            authDomain: "thevariations.firebaseapp.com",
            databaseURL: "https://thevariations.firebaseio.com",
            storageBucket: "project-4248197981206346819.appspot.com",
        };
        firebase.initializeApp(config);
        // if (localStorage.getItem("token")) {
        //     let token = localStorage.getItem("token");
        //     firebase.auth().signInWithCustomToken(token).then(() => {
        //         toastr.success("Welcome back returning user");                
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         toastr.error(err);                
        //     });            
        // }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User has signed in");
                console.log(user);
                localStorage.setItem("token", user.refreshToken);
                this.userGravatarURL = "https://gravatar.com/avatar/"
                    + md5(user.email.trim().toLowerCase()) + "?d=mm"
                console.debug("gravatar", this.userGravatarURL);
                this._userLoggedIn.emit(true);
            } else {
                // toastr.info("Residents, please log in to view all features.");
            }
        });  //onAuthStateChanged 
    }  //constructor
    signupUser(user: User) {
        localStorage.setItem("newUser", JSON.stringify(user));
        var email: string = user.email;
        var password: string = user.password;
        AppHelpers.BlockUI("Processing sign up information......please wait.");
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                AppHelpers.UnblockUI();
            })
            .catch((error) => {
                var errorMessage: string = "";
                AppHelpers.UnblockUI();
                switch (error.code) {
                    case "auth/email-already-in-us":
                        errorMessage = "The new user account cannot be created because the email is already in use.";
                        console.log(errorMessage);
                        toastr.error(errorMessage);
                        break;
                    case "auth/email-already-in-us":
                        errorMessage = "The specified email is already in use.";
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
            });      //catch
    }  //signup user

    signinUser(user: User) {
        AppHelpers.BlockUI("Signing into web site......please wait.");
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                AppHelpers.UnblockUI();
            })
            .catch((error) => {
                AppHelpers.UnblockUI();
                console.log(error);
                var errorCode = error.code;
                var errorMessage = error.message;
                toastr.error(errorMessage);
                console.error(error);
            });
    } //signinUser

    sendResetPasswordEmail(email: string) {
        AppHelpers.BlockUI();
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                AppHelpers.UnblockUI();
                this._forgotPasswordEmailSent.emit(true);
            })
            .catch((error) => {
                AppHelpers.UnblockUI();
                toastr.error(error.message);
            });
    }  //sendResetPasswordEmail

    resetPassword(code: string, newPassword: string) {
        AppHelpers.BlockUI();
        firebase.auth().confirmPasswordReset(code, newPassword)
            .then(() => {
                AppHelpers.UnblockUI();
                this._passwordReset.emit(true);
            })
            .catch(function (error) {
                AppHelpers.UnblockUI();
                toastr.error(error.message);
            });
    }  //resetPassword

    updateUserProfile(user: User) {
        AppHelpers.BlockUI();
        firebase.database().ref("Users/" + firebase.auth().currentUser.uid).set({
            FirstName: user.firstName,
            LastName: user.lastName,
            Unit: user.unit
        })
            .then(() => {
                AppHelpers.UnblockUI();
                localStorage.setItem("userProfile", JSON.stringify(user));
                toastr.success("Profile updated");
            })
            .catch((error) => {
                AppHelpers.UnblockUI();
                toastr.error(error);
            })
    }  //updateUserProfile

    logout() {
        console.log("auth: logout");
        firebase.auth().signOut()
            .then(() => {
                this._userLoggedOut.emit(true);
            })
            .catch((error) => {
                toastr.error(error);
            })
    }  //logout

    getLoggedInEvent(): EventEmitter<any> {
        return this._userLoggedIn;
    }

    getLoggedOutEvent(): EventEmitter<any> {
        return this._userLoggedOut;
    }

    getForgotPasswordEmailSentEvent(): EventEmitter<any> {
        return this._forgotPasswordEmailSent;
    }
    getPasswordResetEvent(): EventEmitter<any> {
        return this._passwordReset;
    }

    isAuthenticated(): boolean {
        var user = firebase.auth().currentUser;
        return user ? true : false;
    }
    getUserGravatarURL(): string {
        return this.userGravatarURL;
    }



}