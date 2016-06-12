import {Component, OnInit} from "@angular/core";
import {FormBuilder, ControlGroup, Validators, Control} from "@angular/common";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {AuthService} from "./shared/auth.service";
import {DataService} from "./shared/data.service";
import {User} from "./shared/user.interface";
import  {AppHelpers} from "./app.component";


@Component({
    templateUrl: "app/signup.component.html",
    directives: [ROUTER_DIRECTIVES],

})
export class SignupComponent implements OnInit {
    signUpForm: ControlGroup;

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _dataService: DataService) {

    }
    onSignup() {        
        var user: User = this.signUpForm.value;   
        if (this._dataService.hasUnitMaximumNumberOfUsers(user.unit)) {
            toastr.error("The maximum number of users have already signed up for this Unit #.")
            return;
        }
        this._authService.signupUser(this.signUpForm.value);
    }
    ngOnInit(): any {
        this._dataService.cacheAllUnits();
        this.signUpForm = this._fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            unit: ['', Validators.compose([
                Validators.required,
                this.isValidUnit
            ])]
        });
    }

    isEmail(control: Control): { [s: string]: boolean } {
        if (!control.value.match(/^[a-z0-9_\+-]+(\.[a-z0-9_\+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,4})$/)) {
            return { noEmail: true };
        }
    }

    isEqualPassword(control: Control): { [s: string]: boolean } {
        if (!this.signUpForm) {
            return { passwordsNotMatch: true };

        }
        if (control.value !== this.signUpForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
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




}