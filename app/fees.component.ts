import {Component, OnInit, OnDestroy} from "@angular/core";
import {AppSettings}  from "./app.component";

declare var $: any;
declare var tc_widget_loader: any;
const LOAN_PAYOFF_HEADER: string = "Loan Payoff Countdown";

@Component({
    templateUrl: "app/fees.component.html"
})

export class FeesComponent implements OnInit, OnDestroy {

    constructor() {

    }

    ngOnInit() {
        this.countDownTimerInit();
    }

    ngOnDestroy() {
        var element = document.getElementById("countdown-script");
        element.parentElement.removeChild(element);

    }

    countDownTimerInit() {
        var s = document.createElement('script');
        s.id = "countdown-script";
        s.src = "http://www.tickcounter.com/loader.js";
        s.async = true;
        s.onload = () => {
            tc_widget_loader('tc_div_51480', 'Countdown', 650, ["1483264800000", "america-new_york", "dhms", "FFFFFF3B5998000000FF0000", "650", "C0C0C01", LOAN_PAYOFF_HEADER]);
        };
       // s.onreadystatechange = s.onload; 
        var head = document.getElementsByTagName('head')[0]; 
        head.appendChild(s);
    }
}