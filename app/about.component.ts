import {Component, OnInit} from "@angular/core"
import {AppSettings}  from "./app.component";

@Component({
    selector: "var-about",
    templateUrl: "app/about.component.html"
})

export class AboutComponent implements OnInit {
    aboutUsName: string;
    constructor() { 
        
        this.aboutUsName = AppSettings.VARIATIONS_NAME;
    }

    ngOnInit() { }
}