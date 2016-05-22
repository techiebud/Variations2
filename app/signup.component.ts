import {Component, OnInit} from "angular2/core";
import {FormBuilder, ControlGroup, Validators, Control} from "angular2/common";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from "angular2/router";
import {AuthService} from "./shared/auth.service";
declare var toastr: any;
declare var $: any;  //jquery
declare var firebase: any;


@Component({
    templateUrl: "app/signup.component.html",
    directives: [ROUTER_DIRECTIVES],

})
export class SignupComponent implements OnInit {
    signUpForm: ControlGroup;

    private allUnits: any;

    private $pleaseWait: any;

    constructor(private _fb: FormBuilder, private _authService: AuthService) {

        this.$pleaseWait = $("#pleaseWaitDialog");
        firebase.database().ref('/Units').once('value').then((snapshot) => {
            debugger;
            //   localStorage.setItem('allUnits', JSON.stringify(snapshot.val()))
            this.allUnits = JSON.parse(localStorage.getItem("allUnits"));
            //  this.allUnits = snapshot.val();
            // console.log("units: ", this.ObjectLength(snapshot.val()));
        });
        //  this.showWait();      
    }

    onSignup() {

        this._authService.signupUser(this.signUpForm.value);

    }

    showWait(): any {
        this.$pleaseWait.modal();

    }
    hideWait(): any {
        this.$pleaseWait.modal('hide');
    }

    ngOnInit(): any {
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
        this.allUnits = JSON.parse(localStorage.getItem("allUnits"));
        debugger;
        let unit: number = parseInt(control.value);
        const min_unit: number = 1901;
        const max_unit: number = 2112;
        let validUnit: boolean = (!isNaN(unit)) && (unit >= min_unit && unit <= max_unit);
        if (validUnit) {
            debugger;
            validUnit = this.allUnits[unit.toString()];

        }


        if (!validUnit) {
            return { unitIsInvalid: true };
        }


    }




}