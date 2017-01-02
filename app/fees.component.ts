import {Component, OnInit} from "@angular/core";
import {AuthService} from "./shared/auth.service";

declare var $: any;
const LOAN_PAYOFF_HEADER: string = "Loan Payoff Countdown!";

@Component({
    templateUrl: "app/fees.component.html"
})

export class FeesComponent implements OnInit {

    constructor(private _authService: AuthService) { }
    isAuth() {
        return this._authService.isAuthenticated();
    }

    ngOnInit() {
       
    }

   
}