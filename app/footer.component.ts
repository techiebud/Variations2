import {Component, OnInit} from "@angular/core";
import {AppSettings}  from "./app.component";

@Component({
    selector: "var-footer",
    templateUrl: "app/footer.component.html"
})

export class FooterComponent implements OnInit {
    copyRight: string = "";
    designBy: string = "Techiebud, LLC"
    designByURL: string = "http://techiebud.com"
    
    constructor() {
        
         var now = new Date();
          var thisYear = now.getFullYear().toString();          
          this.copyRight = "\u00A9 " + thisYear + "  " + AppSettings.VARIATIONS_NAME;

     }
     
    ngOnInit() { }
}