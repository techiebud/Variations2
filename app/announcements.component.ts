import {Component, OnInit} from "@angular/core";
import {Announcement} from "./shared/announcement.interface";
import {AuthService} from "./shared/auth.service";
import {AppHelpers} from "./app.component";


declare var firebase: any;
declare var toastr: any;
const DATA_TABLE : string = "Announcements";


@Component({
    templateUrl: "app/announcements.component.html"
})

export class AnnouncementsComponent implements OnInit {
    announcements: Array<Announcement> = new Array<Announcement>();
    isLoading: boolean = true;

    constructor() {
          if (!this.checkDataReady()) {
            var refreshId = setInterval(() => {
                if (this.checkDataReady()) {
                    clearInterval(refreshId);
                    this.isLoading = false;
                }
            }, 500);
        }
        else
           {
           this.isLoading = false;
        }
    }

    ngOnInit() {      
       if (!localStorage.getItem(DATA_TABLE)) {
            let fbTable = "/" + DATA_TABLE;
            let sortedAnnouncementsRef = firebase.database().ref(fbTable).orderByKey();
            sortedAnnouncementsRef.once('value').then((snapshot) => {
                //todo:  Need error handling here.               
                var jsonAnnouncements = JSON.stringify(snapshot.val());
                //cache the data here.
                localStorage.setItem(DATA_TABLE, jsonAnnouncements);
            });   //snaphot units for sale   
        }
    }
    
      checkDataReady(): boolean {

        let cachedData: any = localStorage.getItem(DATA_TABLE);
        if (cachedData) {
            this.parseData(JSON.parse(cachedData));          
            return true;
        }
        return false;
    }

    parseData(data: any): void {
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

    }
}