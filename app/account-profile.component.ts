import {Component, OnInit} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
   REACTIVE_FORM_DIRECTIVES
} from "@angular/forms";

import {ROUTER_DIRECTIVES} from "@angular/router";
import {DataService} from "./shared/data.service";
import {AuthService} from "./shared/auth.service";
import {User} from "./shared/user.interface";
import {AppHelpers} from "./shared/app.common";


@Component({
    templateUrl: "app/account-profile.component.html",
    directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
})
export class AccountProfileComponent implements OnInit {
    accountProfileForm: FormGroup;
    user: User;

    constructor(private _formBuilder: FormBuilder, private _dataService: DataService, private _authService: AuthService) {

        this.user = JSON.parse(localStorage.getItem("userProfile"), this.reviver);
        if (!this.user.firstName)  //sometimes the reviver function returns just an object
        //i found out if I call it without the reviver (which is setting the correct camel casing)
        {                           //it comes back fine.
            this.user = JSON.parse(localStorage.getItem("userProfile"));
        }
        this._dataService.getAllUnits();
        this.accountProfileForm = _formBuilder.group({
            firstName: [this.user.firstName, Validators.required],
            lastName: [this.user.lastName, Validators.required],
            unit: [this.user.unit, Validators.compose([
                Validators.required,
                this.isValidUnit
            ])]
        });

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
    
        //  this.accountProfileForm.value = this.user;
    }
    isValidUnit(control: FormControl): { [s: string]: boolean } {
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
    onResetPassword() {
        this._authService.sendResetPasswordEmailAuthUser(); 
    }




}