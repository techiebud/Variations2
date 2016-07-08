import {Component, OnInit} from "@angular/core";
import {Announcement} from "./shared/announcement.interface";
import {AuthService} from "./shared/auth.service";
import {AppHelpers} from "./shared/app.common";
import {DataService} from "./shared/data.service";

declare var twttr: any;
const DATA_TABLE: string = "Announcements";

@Component({
    templateUrl: "app/announcements.component.html"
})

export class AnnouncementsComponent implements OnInit {
    announcements: Array<Announcement> = new Array<Announcement>();
    isLoading: boolean = true;
    isError: boolean = false;

   constructor(private _dataService: DataService)  {
        //show Twitter message feeds
        //Due to some timing issues
        //wait about 1 and 1/2 seconds before showing.
        setTimeout(() => {
            twttr.widgets.load()
            this.isDataReady();
        }, 1500);

    }

    ngOnInit() {

    if (!this.isDataReady())
        {          
            this._dataService.getAnnouncements();
            //now watch the last firebase call to get when the data is ready.
            var refreshId = setInterval(() => {
                if (this.isDataReady() || this.isError) {
                    clearInterval(refreshId);
                    this.isLoading = false;                }
            }, 500);  //check for data every 1/2 second
        }
        else 
        {
            this.isLoading = false;
        }
    }  //ngOnInit

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
            let announcementRecord: Announcement = {
                Date: announcementDate,
                Title: announcements[announcementDates[i]].Title,
                URL: announcements[announcementDates[i]].URL
            }
            this.announcements.push(announcementRecord);
        }  //for loop

          //FYI: I"m sorting the data here because I cannot get the data to come back sorted from Firebase;
        this.announcements.sort((a: Announcement, b: Announcement) : number => {
             return (b.Date > a.Date) ? 1 : 0;       
        });

    }  //prepData


}  //Announcements Component.