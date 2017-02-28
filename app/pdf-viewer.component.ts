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
            // pDFObject.embed(this.id, "#var-viewer", { fallbackLink: false });
        });



    }

    /*  isMobileDevice(): boolean {
  
          const isMobile = {
              Android:  () => { return navigator.userAgent.match(/Android/i); },
              BlackBerry:  () => { return navigator.userAgent.match(/BlackBerry/i); },
              iOS: () => { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
              Opera:  () => { return navigator.userAgent.match(/Opera Mini/i); },
              Windows: () => { return navigator.userAgent.match(/IEMobile/i); },
              any: () => { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
          };
          return isMobile.any;
      }*/
}

