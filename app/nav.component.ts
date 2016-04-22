import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERSS } from "angular2/router";



@Component({
    selector: "var-nav",
    templateUrl: "app/nav.component.html", 
    directives: [ROUTER_DIRECTIVES],

    
   
})

export class NavComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}