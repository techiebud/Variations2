;import {Component, OnInit} from "@angular/core";

@Component({
       templateUrl: "app/services.component.html"
})

export class ServicesComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    onMoreInformationClick() {
            toastr.warning("No further information is available at this time.");
            return false;


    }
}