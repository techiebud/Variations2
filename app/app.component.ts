import {Component, OnInit} from "angular2/core";
import {NavComponent} from "./nav.component";
import {FooterComponent} from "./footer.component";

@Component({
    selector: "var-main",
    templateUrl: "app/app.component.html",
    directives: [NavComponent, FooterComponent],
})

export class AppComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}