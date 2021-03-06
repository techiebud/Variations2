import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "app/pdf-viewer.html",
})

export class PdfViewerComponent implements OnInit {
    id: string;
    pdfSrc: string;
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
            // pDFObject.embed(this.id);
            this.pdfSrc = this.id;
           // this.pdfSrc = "https://drive.google.com/file/d/0B0XxZGmv5AeFNklOOFg2LWRuZ0E/view";
            // pDFObject.embed(this.id, "#var-viewer", { fallbackLink: false });
        });



    }

   
}

