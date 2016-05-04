import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERSS } from "angular2/router";
import {AuthService} from "./shared/auth.service";



@Component({
    selector: "var-nav",
    templateUrl: "app/nav.component.html", 
    directives: [ROUTER_DIRECTIVES],
    
   
})

export class NavComponent implements OnInit {

 constructor(private _authService: AuthService) {}

    isAuth() {
        return this._authService.isAuthenticated();
    }

    logout() {
        this._authService.logout();
    }

    ngOnInit() { }
}