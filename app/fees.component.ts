import {Component, OnInit} from "@angular/core";

declare var $: any;
const LOAN_PAYOFF_HEADER: string = "Loan Payoff Countdown!";

@Component({
    templateUrl: "app/fees.component.html"
})

export class FeesComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
        this.countDownTimerInit();
    }  

    countDownTimerInit() : void {
        var payOffDate: Date = new Date(2017, 0, 1);
        $('#loan-countdown').countdown({
            until: payOffDate,
            description:  LOAN_PAYOFF_HEADER
        });
    }
}