import {Component, OnInit} from "@angular/core";
import {FormBuilder, ControlGroup, Validators, Control} from "@angular/common";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {AuthService} from "./shared/auth.service";
import {User} from "./shared/user.interface";
import {AppHelpers} from "./app.component";


declare var $: any;  //jquery
declare var firebase: any;


@Component({
    templateUrl: "app/account-profile.component.html",
    directives: [ROUTER_DIRECTIVES],

})
export class AccountProfileComponent implements OnInit {
    accountProfileForm: ControlGroup;
    user: User;

    constructor(private _fb: FormBuilder, private _authService: AuthService) {

    }

    onUpdateProfile() {
        var userUpdate: User = this.accountProfileForm.value;
        if (userUpdate.unit != this.user.unit)
        {
            let allUnits = JSON.parse(localStorage.getItem("allUnits"));
            if (allUnits[this.user.unit].RegisteredUsers >= 2) {
                toastr.error("The maximum number of users have already signed up for this Unit #.")
                return;
            }       
         }
        this._authService.updateUserProfile(this.accountProfileForm.value);
    }
    ngOnInit(): any {
        debugger;
        this.user = JSON.parse(localStorage.getItem("userProfile"), this.reviver);
        localStorage.setItem("allUnits", "{}");
        firebase.database().ref('/Units').once('value').then((snapshot) => {
            localStorage.setItem('allUnits', JSON.stringify(snapshot.val()));
        });
        this.accountProfileForm = this._fb.group({
            firstName: [this.user.firstName, Validators.required],
            lastName: [this.user.lastName, Validators.required],
            unit: [this.user.unit, Validators.compose([
                Validators.required,
                this.isValidUnit
            ])]
        });
        //  this.accountProfileForm.value = this.user;
    }



    isValidUnit(control: Control): { [s: string]: boolean } {
        let allUnits = JSON.parse(localStorage.getItem("allUnits"));
        let unit: number = parseInt(control.value);
        const min_unit: number = 1901;
        const max_unit: number = 2112;
        let validUnit: boolean = (!isNaN(unit)) && (unit >= min_unit && unit <= max_unit);
        if (validUnit) {
            validUnit = allUnits[unit.toString()];
        }

        if (!validUnit) {
            return { unitIsInvalid: true };
        }


    }

    reviver(key, val): any {
        if (key)
            this[key.charAt(0).toLowerCase() + key.slice(1)] = val;
        else
            return val;
    }





}