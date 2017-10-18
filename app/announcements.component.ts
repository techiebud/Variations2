import { ResidentSearchComponent } from './resident-search.component';
import { Component, OnInit, ApplicationRef } from "@angular/core";
import { Announcement } from "./shared/announcement.interface";
import { AuthService } from "./shared/auth.service";
import { AppHelpers } from "./shared/app.common";
import { DataService } from "./shared/data.service";


const DATA_TABLE: string = "Announcements";

@Component({
    templateUrl: "app/announcements.component.html"
})

export class AnnouncementsComponent implements OnInit {
    announcements: Array<Announcement> = new Array<Announcement>();
    isLoading: boolean = true;
    isError: boolean = false;
    checkIntervalId: number = 0;

    constructor(private _dataService: DataService) {
        //show Twitter message feeds
        //Due to some timing issues
        //wait about 1 and 1/2 seconds before showing.
        setTimeout(() => {
            twttr.widgets.load()
            this.isDataReady();
        }, 1500);

    }

    ngOnInit() {

        if (!this.isDataReady()) {
            this._dataService.getAnnouncements();
            //now watch the last firebase call to get when the data is ready.
            var refreshId = setInterval(() => {
                if (this.isDataReady() || this.isError) {
                    clearInterval(refreshId);
                    this.checkForNewAnnoucements();
                    this.isLoading = false;
                }
            }, 500);  //check for data every 1/2 second
        }
        else {
            this.checkForNewAnnoucements();
            this.isLoading = false;
        }
    }  //ngOnInit


    checkForNewAnnoucements(): void {
        if (this.checkIntervalId) {
            return;
        }
        console.log("checkForNewAccouncements");
        this.checkIntervalId = setInterval(() => {
            if (localStorage.getItem("doRefresh")) {
                console.log("refreshing data to show new announcements");
                localStorage.removeItem(DATA_TABLE);
                localStorage.removeItem("doRefresh");
                this.isError = false;
                this._dataService.getAnnouncements();
                var refreshId = setInterval(() => {
                    if (this.isDataReady() || this.isError) {
                        clearInterval(refreshId);
                    }
                }, 500);  //check for data every 1/2 second     
            }

        }, 1000); //check every second
    }

    isDataReady(): boolean {

        let cachedData: any = localStorage.getItem(DATA_TABLE);
        if (cachedData) {
            this.prepData(JSON.parse(cachedData));
            return true;
        }
        return false;
    }

    prepData(data: any): void {
        this.announcements = [];

        let announcements: {} = data;
        let announcementDates = Object.keys(announcements);


        for (let i: number = announcementDates.length - 1; i >= 0; i--) {
            let announcementDate: Date = AppHelpers.parseDate(announcementDates[i]);
            let url: string = announcements[announcementDates[i]].URL.toString();
            let isRegularLink: boolean = false;

            var viewer = (url.toLowerCase().includes(".pdf")) ? "pdfViewer" : "driveViewer";
            if (viewer === "driveViewer") {
                if (url.toLowerCase().startsWith("http:")) {
                    isRegularLink = true;
                }
            }

            let announcementRecord: Announcement = {
                Date: announcementDate,
                Title: announcements[announcementDates[i]].Title,
                URL: url,
                Viewer: viewer,
                IsRegularLink: isRegularLink
            }
            this.announcements.push(announcementRecord);
        }  //for loop
        //FYI: I"m sorting the data here because I cannot get the data to come back sorted from Firebase;     
        this.announcements.sort((a: Announcement, b: Announcement): number => {

            return (Date.parse(b.Date.toString()) - Date.parse(a.Date.toString()));
        });



    }  //prepData



}  //Announcements Component.