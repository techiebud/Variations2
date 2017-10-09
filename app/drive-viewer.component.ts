import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'

@Component({
    templateUrl: "app/drive-viewer.html",
})

export class DriveViewerComponent implements OnInit {
    url: string;

    // tslint:disable-next-line:no-empty
    constructor(private route: ActivatedRoute, private _sanitizer: DomSanitizer) {    }

    trustSrcUrl = function (data) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(data);
    }

    getIdFromUrl(url): string { return url.match(/[-\w]{25,}/); }

    ngOnInit() {
      
        // tslint:disable-next-line:typedef
        this.route.params.subscribe((params) => {
            this.url = params["id"];
            if (this.url.toLowerCase().includes("drive.google")) {
                var fileId = this.getIdFromUrl(this.url);
                this.url = `https://drive.google.com/file/d/${fileId}/preview`;
            }
            console.debug(this.url);

            //   toastr.info(this.isrc);

        });
    }
}

