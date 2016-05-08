import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from "angular2/router";
import {AuthService} from "./shared/auth.service";

@Component({
    selector: "var-home",
    templateUrl: "app/home.component.html",
    directives: [ROUTER_DIRECTIVES],
})

export class HomeComponent implements OnInit {

    constructor(private _authService: AuthService) { }

    isAuth() {
        return this._authService.isAuthenticated();
    }

    ngOnInit() { }
}