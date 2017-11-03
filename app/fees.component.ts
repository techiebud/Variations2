import {Component, OnInit} from "@angular/core";

import {AuthService} from "./shared/auth.service";
import { DataService } from "./shared/data.service";

declare var $: any;
// tslint:disable-next-line:no-unused-variable
const LOAN_PAYOFF_HEADER: string = "Loan Payoff Countdown!";

@Component({
    templateUrl: "app/fees.component.html"
})

export class FeesComponent implements OnInit {
    reserveBalance: number;
    reserveBalanceAsOf: string;
    reserveNote: string;


    constructor(private _authService: AuthService, private _dataService: DataService) {
        this.reserveBalance = _dataService.generalInformation.ReserveBalance / 100;
        this.reserveBalanceAsOf = _dataService.generalInformation.ReserveBalanceAsOf;
        this.reserveNote = _dataService.generalInformation.ReserveNote;

     }


    isAuth() {
        return this._authService.isAuthenticated();
    }

    ngOnInit() {
       
    }

   
}