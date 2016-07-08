import {Component, OnInit} from "@angular/core"
import {AppSettings}  from "./shared/app.common";
import {Management} from "./shared/management.interface";

const DATA_TABLE: string = "Management";

@Component({  
    templateUrl: "app/about.component.html"
})

export class AboutComponent implements OnInit {
    aboutUsName: string;
    management: Management = {
        Company: "",
        CompanyURL: "",
        ContactName: "",
        ContactPhone: "",
        ContactEmail: ""  
    
    };
    isLoading: boolean = true;
    isError: boolean = false;

    constructor() {
        this.aboutUsName = AppSettings.VARIATIONS_NAME;
    }

    ngOnInit() {
    
        if (!this.isDataReady()) {
            let fbTable = "" + DATA_TABLE;
            var boardDataRef = firebase.database().ref(fbTable).orderByChild('Email');
            boardDataRef.once('value',
                (snapshot) => {
                    let returnedData = snapshot.val();
                    console.debug(returnedData);
                    localStorage.setItem(DATA_TABLE, JSON.stringify(returnedData));
                },
                (err) => {
                    this.isError = true;
                    console.error(err);
                    toastr.error(err);
                });
            //now watch the last firebase call to get when the data is ready.
            var refreshId = setInterval(() => {
                if (this.isDataReady() || this.isError) {
                    clearInterval(refreshId);
                    this.isLoading = false;
                }
            }, 500);  //check for data every 1/2 second
        }
        else {
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
    }  //isDataReady



    prepData(data: any): void {
        this.management = <Management>data;  //iniyisliyr




    }  //prepdadta

}