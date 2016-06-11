import {Component, OnInit} from "@angular/core";
import {Announcement} from "./shared/announcement.interface";
import {AuthService} from "./shared/auth.service";
import {AppHelpers} from "./app.component";

declare var firebase: any;

declare var $: any;
declare var twttr: any;
const DATA_TABLE: string = "Announcements";


@Component({
    templateUrl: "app/announcements.component.html"
})

export class AnnouncementsComponent implements OnInit {
    announcements: Array<Announcement> = new Array<Announcement>();
    isLoading: boolean = true;
    isError: boolean = false;

    constructor() {
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
            let fbTable = "/" + DATA_TABLE;
            let sortedAnnouncementsRef = firebase.database().ref(fbTable).orderByKey();
            sortedAnnouncementsRef.once('value',
                (snapshot) => {
                    let returnedData = snapshot.val();
                    localStorage.setItem(DATA_TABLE, JSON.stringify(returnedData));
                },
                (error) => {
                    console.error(error);
                    this.isError = true;
                    toastr.error(error);
                });
            var refreshId = setInterval(() => {
                if (this.isDataReady()) {
                    clearInterval(refreshId);
                    this.isLoading = false;
                }
            }, 500);
        }  //isDateReady
        else{
            this.isLoading = false;
        }
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
            let announcementRecord: Announcement = {
                Date: announcementDate,
                Title: announcements[announcementDates[i]].Title,
                URL: announcements[announcementDates[i]].URL
            }
            this.announcements.push(announcementRecord);
        }  //for loop

    }  //prepData


}  //Announcements Component.