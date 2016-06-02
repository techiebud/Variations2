import {Component, OnInit} from "@angular/core";
import {Announcement} from "./shared/announcement.interface";
import {AuthService} from "./shared/auth.service";


declare var firebase: any;
declare var toastr: any;


@Component({
    templateUrl: "app/announcements.component.html"
})

export class AnnouncementsComponent implements OnInit {
    announcements: Array<Announcement> = new Array<Announcement>();
    isLoading: boolean = true;

    constructor() { }



    ngOnInit() {

        let cachedData: any = localStorage.getItem("announcements");
        if (cachedData) {
            this.parseAnnouncementData(JSON.parse(cachedData));         
            this.isLoading = false;
        }
        else {
            let sortedAnnouncementsRef = firebase.database().ref("/Announcements").orderByKey();
            sortedAnnouncementsRef.once('value').then((snapshot) => {
                //todo:  Need error handling here.     
             
                var jsonAnnouncements = JSON.stringify(snapshot.val());
                localStorage.setItem("announcements", jsonAnnouncements);
                // console.log("testing",);
                this.parseAnnouncementData(snapshot.val());

                this.isLoading = false;
            });   //snaphot units for sale   
        }



    }

    parseDate(inputDate: string): Date {

        var y: number = +(inputDate.substr(0, 4)),
            m: number = +(inputDate.substr(4, 2)) - 1,
            d: number = +(inputDate.substr(6, 2));
        return new Date(y, m, d);

    }

    parseAnnouncementData(data: any): void {

        let announcements: {} = data;
        let announcementDates = Object.keys(announcements);

        for (let i: number = announcementDates.length - 1; i >= 0; i--) {
            let announcementDate: Date = this.parseDate(announcementDates[i]);
            let announcementRecord: Announcement = {
                Date: announcementDate,
                Title: announcements[announcementDates[i]].Title,
                URL: announcements[announcementDates[i]].URL

            }
            this.announcements.push(announcementRecord);

        }  //for loop

    }
}