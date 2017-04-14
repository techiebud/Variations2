import {AfterViewInit, Component, ElementRef, OnInit, Renderer, ViewChild} from "@angular/core";

import {AppHelpers} from "./shared/app.common";
import {AuthService} from "./shared/auth.service";
import { DataService } from "./shared/data.service";

declare var MobileDetect: any;
@Component({
    selector: "var-nav",
    templateUrl: "app/nav.component.html"  
})

export class NavComponent implements OnInit, AfterViewInit {
    @ViewChild("discussionBoard") discussionBoard: ElementRef;
    @ViewChild("monthlyCrimeMap") monthlyCrimeMap: ElementRef;
    isMobile: boolean = false;
    


    constructor(private _authService: AuthService, private _renderer: Renderer, private _dataService: DataService ) {

        const md = new MobileDetect(window.navigator.userAgent);
        this.isMobile = md.mobile();
     

    }

 
    // tslint:disable-next-line:member-ordering
    showDiscussionBoard() : boolean {
        // tslint:disable-next-line:typedef
        let event = new MouseEvent("click", {bubbles: false});
        this._renderer.invokeElementMethod(
        this.discussionBoard.nativeElement, "dispatchEvent", [event]);
        return false;

    }


    // tslint:disable-next-line:member-ordering
    showMonthlyCrimeMap() : boolean {
        // tslint:disable-next-line:typedef
        let event = new MouseEvent("click", {bubbles: false});
        this._renderer.invokeElementMethod(
        this.monthlyCrimeMap.nativeElement, "dispatchEvent", [event]);
        return false;

    }
    

    isAuth() {
        return this._authService.isAuthenticated();
    }

    logout() {
        console.log("nav: logout");
        this._authService.logout();
    }

    userGravatarURL(): string {
        // return "n/a";
        return this._authService.getUserGravatarURL();
    }


    userForumToken() : string {
        // tslint:disable-next-line:curly
       /* if (this._userForumToken)
            return;*/
       // console.log("userForumToken");
        return this._authService.getUserForumToken();    


    }


    crimeMapURL() :  string {

     /*   if (this._crimeMapURL)
            return;*/

      //  console.log("crimeMapURL");
     //   debugger;
        const today = new Date();
        const lastMonth = new Date();
      
        lastMonth.setMonth(lastMonth.getMonth() - 1);

       // get start date
        let day = lastMonth.getDate().toString();
        let month = (lastMonth.getMonth() + 1).toString();
        let year = lastMonth.getFullYear().toString();
        if (lastMonth.getDate() < 10)
        // tslint:disable-next-line:one-line
        {
            day = "0" + day;
        }
        if ((lastMonth.getMonth() + 1) < 10)
        {
            month = "0" + month;
        }
        const startDate = year + "-" + month + "-" + day;
       /// console.debug("start date: " + startDate);
        // get end date
        day = (today.getDate()).toString();
        month = (today.getMonth() + 1).toString();
        year = today.getFullYear().toString();
        if (today.getDate() < 10)
        {
            day = "0" + day;
        }
        if ((today.getMonth() + 1)  < 10)
        {
            month = "0" + month;
        }
        const endDate = year + "-" + month + "-" + day;
        const dgbInfo = this._dataService.generalInformation.CrimeMapURL.replace("{startDate}", startDate).replace("{endDate}", endDate);
      //  console.debug(dgbInfo);
      //  console.debug("end date: " + endDate);

        // tslint:disable-next-line:max-line-length
        return this._dataService.generalInformation.CrimeMapURL.replace("{startDate}", startDate).replace("{endDate}", endDate);

    }


    // tslint:disable-next-line:no-empty
    ngOnInit() {


    }

    ngAfterViewInit() {


            AppHelpers.prepMenuElements();

            $(window).resize(() => {
                AppHelpers.prepMenuElements();
            });



    }
}