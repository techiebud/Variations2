import {Component, OnInit} from "@angular/core"
import {AppSettings}  from "./shared/app.common";
import {Management} from "./shared/management.interface";
import {DataService} from "./shared/data.service";

const DATA_TABLE: string = "Management";

@Component({  
    templateUrl: "app/about.component.html"
})

export class AboutComponent implements OnInit {
    aboutUsName: string;
    management: Management;
   
    constructor(private _dataService: DataService) {
        //debugger;
        this.aboutUsName = AppSettings.VARIATIONS_NAME;
        this.management = _dataService.management;
    }

    ngOnInit() {
    
     

    }  //ngOnInit
  

}