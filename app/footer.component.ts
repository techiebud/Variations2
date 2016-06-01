import {Component, OnInit} from "@angular/core";
import {AppSettings}  from "./app.component";

@Component({
    selector: "var-footer",
    templateUrl: "app/footer.component.html"
})

export class FooterComponent implements OnInit {
    copyRight: string = "";
    constructor() {
        
         var now = new Date();
          var thisYear = now.getFullYear().toString();          
          this.copyRight = "Copyright \u00A9 " + thisYear + "  " + AppSettings.VARIATIONS_NAME;

     }
     
    ngOnInit() { }
}