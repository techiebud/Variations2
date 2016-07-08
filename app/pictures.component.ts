import {Component, OnInit} from "@angular/core";
import {Picture} from "./shared/picture.interface";
import {AuthService} from "./shared/auth.service";
import {AppHelpers} from "./shared/app.common";

declare var firebase: any;

const DATA_TABLE : string = "Pictures";


@Component({
    templateUrl: "app/pictures.component.html"
})

export class PicturesComponent implements OnInit {
    pictures: Array<Picture> = new Array<Picture>();
    isLoading: boolean = true;
    isError: boolean = false;

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
            let sortedPicturesRef = firebase.database().ref(fbTable).orderByKey();
               sortedPicturesRef.once('value',
              (snapshot) => {                    
                  let returnedData = snapshot.val();
                  localStorage.setItem(DATA_TABLE, JSON.stringify(returnedData));
               },
             (err) => {
                  console.error(err);          
                  this.isError = true;        
                  toastr.error("You must sign in to view this information!");           
             });         
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
        this.pictures = [];
        let pictures: {} = data;
        let pictureDates = Object.keys(pictures);

        for (let i: number = pictureDates.length - 1; i >= 0; i--) {
            let pictureDate: Date = AppHelpers.parseDate(pictureDates[i]);
            let pictureRecord: Picture = {
                Date: pictureDate,
                Title: pictures[pictureDates[i]].Title,
                URL: pictures[pictureDates[i]].URL
            }
            this.pictures.push(pictureRecord);
        }  //for loop

    }
}