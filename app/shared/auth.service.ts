import {Injectable, EventEmitter} from "@angular/core";
import {User} from "./user.interface";
import {AppHelpers} from "../app.component";
import {FirebaseService} from "./firebase.service";

declare var firebase: any;
declare var md5: any;


@Injectable(
)
export class AuthService {

    private _userLoggedOut = new EventEmitter<any>();
    private _userLoggedIn = new EventEmitter<any>();
    private _passwordReset = new EventEmitter<any>();
    private _emailUpdated = new EventEmitter<any>();
    private _passwordChanged = new EventEmitter<any>();
    private _resetPasswordEmailSent = new EventEmitter<any>();
    userIsAuthenticated: boolean;
    userGravatarURL: string = "";

    constructor(private _firebaseService: FirebaseService) {

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
    sendResetPasswordEmailAuthUser() {   
        var user = firebase.auth().currentUser;       
        this.sendResetPasswordEmail(user.email);
    }
    sendResetPasswordEmail(email: string) {
        AppHelpers.BlockUI();
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                AppHelpers.UnblockUI();
                this._resetPasswordEmailSent.emit(true);
            })
            .catch((error) => {
                AppHelpers.UnblockUI();
                toastr.error(error.message);
            });
    }  //sendResetPasswordEmail

    changePassword(newPassword: string) {
        AppHelpers.BlockUI();
        var user = firebase.auth().currentUser;
        user.updatePassword(newPassword)
            .then(() => {
                AppHelpers.UnblockUI();
                this._passwordChanged.emit(true);
            })
            .catch((error) => {
                AppHelpers.UnblockUI();
                toastr.error(error.message);
            })
    }

    updateEmail(newEmail: string) {
        AppHelpers.BlockUI();
        var user = firebase.auth().currentUser;
        user.updateEmail(newEmail)
            .then(() => {
                AppHelpers.UnblockUI();
                this._emailUpdated.emit(true);
            })
            .catch((error) => {
                AppHelpers.UnblockUI();
                toastr.error(error.message);
            })
    }

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

    getResetPasswordEmailSentEvent(): EventEmitter<any> {
        return this._resetPasswordEmailSent;
    }
    getPasswordResetEvent(): EventEmitter<any> {
        return this._passwordReset;
    }

    getEmailUpdated(): EventEmitter<any> {
        return this._emailUpdated;
    }
    getPasswordChanged(): EventEmitter<any> {
        return this._passwordChanged;
    }

    isAuthenticated(): boolean {
        var user = firebase.auth().currentUser;
        return user ? true : false;
    }
    getUserGravatarURL(): string {
        return this.userGravatarURL;
    }



}