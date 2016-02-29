import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "angular2/router";
import {HomeComponent} from "./home.component";
import {AboutComponent} from "./about.component";
import {NavComponent} from "./nav.component";
import {FooterComponent} from "./footer.component";

@Component({
    selector: "var-main",
    templateUrl: "app/app.component.html",
    directives: [ROUTER_DIRECTIVES, HomeComponent, AboutComponent, NavComponent, FooterComponent],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
  { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
  { path: '/about', name: 'About', component: AboutComponent}
])
export class AppComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}