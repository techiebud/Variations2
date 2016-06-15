import {Component, OnInit} from "@angular/core";
import {FormBuilder, ControlGroup, Validators, Control} from "@angular/common";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {DataService} from "./shared/data.service";
import {User} from "./shared/user.interface";
import {AppHelpers} from "./app.component";




@Component({
    templateUrl: "app/account-profile.component.html",
    directives: [ROUTER_DIRECTIVES],
})
export class AccountProfileComponent implements OnInit {
    accountProfileForm: ControlGroup;
    user: User;

    constructor(private _fb: FormBuilder, private _dataService: DataService) {

    }
    onUpdateProfile() {
        var userUpdate: User = this.accountProfileForm.value;
       if (userUpdate.unit != this.user.unit) {
            if (this._dataService.hasUnitMaximumNumberOfUsers(userUpdate.unit)) {
                toastr.error("The maximum number of users have already signed up for this Unit #.")
                return;
            }
        }
        this._dataService.updateUserProfile(this.accountProfileForm.value, this.user);
    }
    ngOnInit(): any {
        this.user = JSON.parse(localStorage.getItem("userProfile"), this.reviver);
        if (!this.user.firstName)  //sometimes the reviver function returns just an object
                                    //i found out if I call it without the reviver (which is setting the correct camel casing)
        {                           //it comes back fine.
            this.user = JSON.parse(localStorage.getItem("userProfile"));
        }
        this._dataService.getAllUnits();
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
        if (!allUnits)       //data has not loaded yet?
        {
            return;
        }
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