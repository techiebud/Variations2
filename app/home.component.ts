import {Component, OnInit} from "@angular/core";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from '@angular/router-deprecated';

import {AuthService} from "./shared/auth.service";

declare var $: any;
declare var toastr : any;

@Component({
    selector: "var-home",
    templateUrl: "app/home.component.html",
    directives: [ROUTER_DIRECTIVES],
})

export class HomeComponent implements OnInit {

    constructor(private _authService: AuthService) {
   
        //below is a code hack to fix the carousel not starting
        //automtacially when this page loads.  I found if you wait a second and a half
        //it will work fine.
        setTimeout(function() {
            //   toastr.info("Start the carousel!");
               $('.carousel').carousel({
                   interval: 4000  //4 seconds.
               });      //start the caraousel
        }, 1500); //  1.5 second delay
            
    }

    isAuth() {
        return this._authService.isAuthenticated();
    }

    ngOnInit() { }
}