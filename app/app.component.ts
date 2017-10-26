import { NotificationService } from './shared/notification.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./shared/auth.service";
import { DataService } from "./shared/data.service";
import { AppHelpers } from "./shared/app.common";
import { User } from "./shared/user.interface";
import * as moment from 'moment';




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




        let now = moment().utc().format('LLLL');
        console.log("now", now);


        new WOW().init(); //for animations.


    }

    ngOnInit(): any {
        //  this._dataService.getAllUsersEmail();

        this._authService.getLoggedInEvent().subscribe(() => {
            const self = this;
            let thisUser: User;
            thisUser = <User>JSON.parse(localStorage.getItem("newUser"));
            console.log("**** USER HAS LOGGED IN");
            if (thisUser) {   //new user.
                toastr.success("Congratulations " + thisUser.firstName + "!  You have successfully signed up.");
                console.log(">> this is a new User", thisUser);
                localStorage.setItem("userProfile", JSON.stringify(thisUser));
                const fbUser = firebase.auth().currentUser;
                localStorage.removeItem("newUser");
                console.log("fbUser:", fbUser);
                firebase.database().ref("Users/" + fbUser.uid).set({
                    Email: thisUser.email,
                    FirstName: thisUser.firstName,
                    LastName: thisUser.lastName,
                    Unit: thisUser.unit
                })
                    .then(() => {
                        console.log("set was successful");
                        const allUnits: any = JSON.parse(localStorage.getItem("allUnits"));
                        const updates = {};
                        updates["/Units/" + thisUser.unit + "/RegisteredUsers"] = +(allUnits[thisUser.unit].RegisteredUsers) + 1;
                        firebase.database().ref().update(updates)
                            .then(() => {
                                console.log("Update registered users was successful");
                                AppHelpers.prepMenuElements();
                                self._authService.userForumToken = AppHelpers.logIntoForum(thisUser, self._dataService.generalInformation.ForumAPIUrl, self._dataService.generalInformation.ForumAPIKey, self._dataService.generalInformation.SecurityKey);
                                this.LogUserInfo(thisUser);
                                self._router.navigate(['announcements']);
                            })
                    })

            }
            else {
                var userId = firebase.auth().currentUser.uid;
                var userSigninInfo: User = JSON.parse(localStorage.getItem("existingUser"));
                localStorage.removeItem("existingUser");
                firebase.database().ref('/Users/' + userId).once('value')
                    .then((snapshot) => {
                        thisUser = <User>snapshot.val();
                        const firstName: string = snapshot.val().FirstName;
                        const lastName: string = snapshot.val().LastName;
                        const isBetaTester: boolean = snapshot.val().isBetaTester;
                        localStorage.setItem("userProfile", JSON.stringify(thisUser));
                        self._notificationService.getPermission();
                        toastr.info("Welcome back, " + firstName + "!");
                        thisUser.email = userSigninInfo.email;
                        thisUser.password = userSigninInfo.password;
                        thisUser.firstName = firstName;
                        thisUser.lastName = lastName;
                        thisUser.isBetaTester = isBetaTester;                      
                        console.log("Doing User UI Prep for: ", thisUser.firstName + " " + thisUser.lastName);
                        AppHelpers.prepMenuElements();
                        self._authService.userForumToken = AppHelpers.logIntoForum(thisUser, self._dataService.generalInformation.ForumAPIUrl, self._dataService.generalInformation.ForumAPIKey, self._dataService.generalInformation.SecurityKey);
                        this.LogUserInfo(thisUser);/*  */
                        self._router.navigate(['announcements']);


                    });



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

    private LogUserInfo(thisUser: User) {
        console.log("Logging User Info", thisUser.firstName + " " + thisUser.lastName);

        const dailyKeyId = moment.utc().format("YYYYMMDD");
        const hourlyKeyId = moment.utc().format("hhmmssSSS");
        const clientIp = "n/a"; 
       
        //console.log(JSON.stringify($.ua));
        firebase.database().ref("UserLog/" + dailyKeyId + "/" + hourlyKeyId).set({
          User: thisUser.firstName + " " + thisUser.lastName,
          BrowserInfo: JSON.stringify($.ua),
          IPAddress: clientIp
        });

        //TODO: $$$ Change to production
        //const cloudURL = "https://us-central1-variationsdev.cloudfunctions.net/logUserInfo";
       // const cloudURL = "https://us-central1-project-5333406827865431386.cloudfunctions.net/logUserInfo";
      
       /*  fetch(cloudURL, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json'
             },
             body: JSON.stringify({
                 username: thisUser.firstName + " " + thisUser.lastName 
             })
         })
         .then(() => {
             console.log("user info logged.");
         })
         .catch((err) => {
             console.log("*User Info ERROR:", err);  
           
          

         });     */     
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


