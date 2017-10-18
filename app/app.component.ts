import { NotificationService } from './shared/notification.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./shared/auth.service";
import { DataService } from "./shared/data.service";
import { AppHelpers } from "./shared/app.common";
import { User } from "./shared/user.interface";



declare var $: any;
declare var firebase: any;
declare var WOW: any;

@Component({
    //moduleId: module.id,
    selector: "var-main",
    templateUrl: 'app/app.component.html',
})

export class AppComponent implements OnInit {

    constructor(private _router: Router, private _authService: AuthService, private _dataService: DataService, private _notificationService: NotificationService) {

        var toastrOptions: ToastrOptions = {
            closeButton: false,
            debug: false,
            newestOnTop: true,
            progressBar: false,
            positionClass: "toast-top-center",
            preventDuplicates: true,
            onclick: null,
            showDuration: 300,
            hideDuration: 1000,
            timeOut: 3500,
            extendedTimeOut: 1000,
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        }

        toastr.options = toastrOptions;
        new WOW().init(); //for animations.


    }

    ngOnInit(): any {
        //  this._dataService.getAllUsersEmail();
        this._authService.getLoggedInEvent().subscribe(() => {
            var self = this;
            var newUser: User = JSON.parse(localStorage.getItem("newUser"));
            console.log("user logged in");
            if (newUser) {
                toastr.success("Congratulations " + newUser.firstName + "!  You have successfully signed up.");
                console.log("new User", newUser);
                localStorage.setItem("userProfile", JSON.stringify(newUser));
                var fbUser = firebase.auth().currentUser;
                localStorage.removeItem("newUser");
                console.log("fbUser:", fbUser);
                firebase.database().ref("Users/" + fbUser.uid).set({
                    Email: newUser.email,
                    FirstName: newUser.firstName,
                    LastName: newUser.lastName,
                    Unit: newUser.unit
                })
                var allUnits: any = JSON.parse(localStorage.getItem("allUnits"));
                var updates = {};
                updates["/Units/" + newUser.unit + "/RegisteredUsers"] = +(allUnits[newUser.unit].RegisteredUsers) + 1;
                firebase.database().ref().update(updates);
                self._authService.userForumToken = AppHelpers.logIntoForum(newUser, self._dataService.generalInformation.ForumAPIUrl, self._dataService.generalInformation.ForumAPIKey);
                self._router.navigate(['Announcements'])
            }
            else {
                var userId = firebase.auth().currentUser.uid;
                var user: User;
                var userSigninInfo: User = JSON.parse(localStorage.getItem("existingUser"));             
                localStorage.removeItem("existingUser");
                firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
                    user = <User>snapshot.val();                  
                    var firstName: string = snapshot.val().FirstName;
                    var lastName: string = snapshot.val().LastName;
                    var isBetaTester: boolean = snapshot.val().isBetaTester;
                    localStorage.setItem("userProfile", JSON.stringify(user));  
                    self._notificationService.getPermission();                
                    toastr.info("Welcome back, " + firstName + "!");
                    user.email = userSigninInfo.email;
                    user.password = userSigninInfo.password;
                    user.firstName = firstName;
                    user.lastName = lastName;
                    user.isBetaTester = isBetaTester;
                    self._authService.userForumToken = AppHelpers.logIntoForum(user, self._dataService.generalInformation.ForumAPIUrl, self._dataService.generalInformation.ForumAPIKey, self._dataService.generalInformation.SecurityKey);                 
               
                });
                AppHelpers.prepMenuElements();
                self._router.navigate(['announcements'])
            }

        });
        this._authService.getLoggedOutEvent().subscribe(() => {
            toastr.success("You have been successfully logged out.");
            setTimeout(() => {
                this._router.navigate(['home']);
            }, 2000);

        });
        this._authService.getResetPasswordEmailSentEvent().subscribe(() => {
            toastr.success("Email sent with instructions to reset your password");
            if (!this._authService.isAuthenticated()) {
                setTimeout(() => {
                    this._router.navigate(['home']);
                }, 2000);
            }
        });
        this._authService.getPasswordResetEvent().subscribe(() => {
            toastr.success("Your password has been successfully reset.");
            setTimeout(() => {
                this._router.navigate(['signin']);
            }, 2000);
        });
        this._authService.getEmailUpdated().subscribe(() => {
            toastr.success("Your email address has successfully been updated. ");
        });
        this._authService.getPasswordChanged().subscribe(() => {
            toastr.success("Your password has succesfully been changed. ");
        });
        this._dataService.getUserProfileUpdated().subscribe(() => {
            toastr.success("Your account profile has been updated");
        });

    

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


