import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

import {AuthService} from "./shared/auth.service";



@Component({
    selector: "var-nav",
    templateUrl: "app/nav.component.html", 
    directives: [ROUTER_DIRECTIVES]     
})

export class NavComponent implements OnInit {

 constructor(private _authService: AuthService) {}

    isAuth() {
        return this._authService.isAuthenticated();
    }

    logout() {
       console.log("nav: logout");
        this._authService.logout();
    }
    
    userGravatarURL() : string {
      // return "n/a";
       return this._authService.getUserGravatarURL();
    }

    ngOnInit() { }
}