import {Injectable, EventEmitter} from "@angular/core";
import {User} from "./user.interface";
import {AppHelpers} from "./app.common";
import {FirebaseService} from "./firebase.service";
import {CookieService} from 'angular2-cookie/core';
import { CookieOptionsArgs } from 'angular2-cookie/services';
import {DataService}  from "./data.service";


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
    userForumToken: string = "";

    constructor(private _firebaseService: FirebaseService, private _cookieService: CookieService, private _dateService: DataService) {
    
        firebase.auth().onAuthStateChanged((user) => {
            localStorage.removeItem("token");
            if (user) {
                console.log("User has signed in");
                console.log(user);
                localStorage.setItem("token", user.refreshToken);
                this.userGravatarURL = "https://gravatar.com/avatar/"
                    + md5(user.email.trim().toLowerCase()) + "?d=mm"
              //  console.debug("gravatar", this.userGravatarURL);
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
        var authToken: string = '';
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

    signinUser(user: User, rememberMe: boolean, autoSignIn: boolean = false) {
        AppHelpers.BlockUI("Signing into web site......please wait.");
        this._cookieService.removeAll();          
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                AppHelpers.UnblockUI();   
                  localStorage.setItem("existingUser", JSON.stringify(user));
                let cookieExpire: Date= new Date();
                cookieExpire.setFullYear(cookieExpire.getFullYear() + 5);
                var cookieOptions:CookieOptionsArgs = {
                    expires: cookieExpire
                }              
                if (rememberMe) {                   
                    let emailSecure: any = CryptoJS.AES.encrypt(user.email, this._dateService.generalInformation.SecurityKey);
                    let pwdSecure :any = CryptoJS.AES.encrypt(user.password, this._dateService.generalInformation.SecurityKey);
                    this._cookieService.put("email", emailSecure, cookieOptions);                   
                    this._cookieService.put("pwd", pwdSecure, cookieOptions);  
                    this._cookieService.put("rememberMe", "1", cookieOptions);            
                } 
   
            })
            .catch((error) => {
                if (autoSignIn)
                {
                    return;
                }
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
        console.debug("reset password");
        AppHelpers.BlockUI();
        firebase.auth().confirmPasswordReset(code, newPassword)
            .then(() => {
                console.debug("confirmPasswordreset");
                AppHelpers.UnblockUI();
                this._passwordReset.emit(true);
            })
            .catch(function (error) {
                AppHelpers.UnblockUI();
                toastr.error(error.message);
            });
    }  //resetPassword

    logout() {
      
        firebase.auth().signOut()
            .then(() => {
                this._cookieService.removeAll();
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

    getUserForumToken(): string {

        return this.userForumToken;
    }



}