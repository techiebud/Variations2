import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "app/drive-viewer.html",
})

export class DroiveViewerComponent implements OnInit {
    id: string;
    driveSrc: string;
    page: number = 1;
    private isMobile: boolean = false;

    // tslint:disable-next-line:no-empty
    constructor(private route: ActivatedRoute) {
        

    }


    ngOnInit() {
        console.debug("ngOnInit: id=" + this.id);
        // tslint:disable-next-line:typedef
        this.route.params.subscribe((params) => {
            this.id = params["id"];
            console.debug(this.id);          
            this.driveSrc = this.id;
          
        });



    }

   
}

