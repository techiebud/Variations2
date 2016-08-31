import {Component, OnInit, AfterViewInit} from "@angular/core";

import {AuthService} from "./shared/auth.service";
import {AppHelpers} from "./shared/app.common";

@Component({
    selector: "var-nav",
    templateUrl: "app/nav.component.html"  
})

export class NavComponent implements OnInit, AfterViewInit {

    constructor(private _authService: AuthService) {


    }

    isAuth() {
        return this._authService.isAuthenticated();
    }

    logout() {
        console.log("nav: logout");
        this._authService.logout();
    }

    userGravatarURL(): string {
        // return "n/a";
        return this._authService.getUserGravatarURL();  
    }

    ngOnInit() {
             

    }

    ngAfterViewInit() {
       

            AppHelpers.prepMenuElements();

            $(window).resize(() => {               
                AppHelpers.prepMenuElements();
            });
            
     

    }
}