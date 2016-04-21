import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "angular2/router";
import {HomeComponent} from "./home.component";
import {AboutComponent} from "./about.component";
import {FeaturesComponent} from "./features.component";
import {ServicesComponent} from "./services.component";
import {PricingComponent} from "./pricing.component";
import {ContactUsComponent} from "./contact-us.component";
import {NavComponent} from "./nav.component";
import {FooterComponent} from "./footer.component";

@Component({
    selector: "var-main",
    templateUrl: "app/app.component.html",
    directives: [ROUTER_DIRECTIVES, HomeComponent, AboutComponent, NavComponent, FooterComponent],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
  { path: '/about', name: 'About', component: AboutComponent},
  { path: '/features', name: 'Features', component: FeaturesComponent},
  { path: '/services', name: 'Services', component: ServicesComponent},
  { path: '/pricing', name: 'Pricing', component: PricingComponent},
  { path: '/contactus', name: 'ContactUs', component: ContactUsComponent},
 /*  { path: '/*', name: 'Default', redirectTo: 'Home'}*/
  /* { path: '/portfolio', name: 'Features', component: FeaturesComponent},
   { path: '/pricing', name: 'Features', component: FeaturesComponent},
   { path: '/portfolio', name: 'Features', component: FeaturesComponent},
   { path: '/portfolio', name: 'Features', component: FeaturesComponent},
  */
])
export class AppComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}