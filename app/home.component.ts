import {Component, OnInit} from "@angular/core";
import {CookieService} from 'angular2-cookie/core';
import {AuthService} from "./shared/auth.service";
import {DataService} from "./shared/data.service";

declare var $: any;

@Component({
    selector: "var-home",
    templateUrl: "app/home.component.html"
})

export class HomeComponent implements OnInit {

    constructor(private _cookieService: CookieService, private _authService: AuthService, private _dataService: DataService) {

        //below is a code hack to fix the carousel not starting
        //automtacially when this page loads.  I found if you wait a second and a half
        //it will work fine.
        setTimeout(function () {
            $('.carousel').carousel({
                interval: 4000  //4 seconds.
            });      //start the caraousel
        }, 1500); //  1.5 second delay






    }



    ngOnInit() {
        if (this._authService.isAuthenticated()) {
            return;
        }
        var rememberMe: boolean = this._cookieService.get("rememberMe") === "1";
        if (rememberMe) {        
            //possible timing issue;  
            var retryCount: number = 0;       
            var repeatId = setInterval(() => {
                retryCount++;
                if (this._dataService.generalInformation) {
                    clearInterval(repeatId);
                    this.autoSignInUser();
                }
                else if (retryCount >= 20)
                {
                    clearInterval(repeatId);
                }
            }, 500);  //check for data every 1/2 second
        }
    }

    private autoSignInUser() {

        let email = CryptoJS.AES.decrypt(this._cookieService.get("email").toString(), this._dataService.generalInformation.SecurityKey);
        let password = CryptoJS.AES.decrypt(this._cookieService.get("pwd").toString(), this._dataService.generalInformation.SecurityKey);

        var thisUser: any = {
                email: email.toString(CryptoJS.enc.Utf8),
                password: password.toString(CryptoJS.enc.Utf8)          
        }     
        console.debug("email: " + thisUser.email);
        console.debug("pwd:" + thisUser.password);
        this._authService.signinUser(thisUser, true, true);
    }
}