import {Component, OnInit} from "angular2/core";
import {FormBuilder, ControlGroup, Validators, Control} from "angular2/common";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from "angular2/router";
import {AuthService} from "../shared/auth.service";
declare var toastr: any;
declare var $: any;  //jquery


@Component({
    templateUrl: "app/unprotected/signup.component.html", 
    directives: [ROUTER_DIRECTIVES],
})
export class SignupComponent implements OnInit {
    signUpForm: ControlGroup;
    error = false;
    errorMessage = '';
    intervalId = 0;
    $pleaseWait: any;

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {
        
          this.$pleaseWait = $("#pleaseWaitDialog");
           //  this.showWait();      
    }

    onSignup() {
        this.showWait();       
        localStorage.removeItem("signedUp");
        if (this.intervalId > 0) {
            clearInterval(this.intervalId);
        }

        this._authService.signupUser(this.signUpForm.value);

        this.intervalId = setInterval(() => {
        
            if (localStorage.getItem("signedUp") != null) {
                if (localStorage.getItem("signedUp") == "error") {
                    clearInterval(this.intervalId);
                    this.hideWait();
                }
                else {
                    if (localStorage.getItem("signedUp") == "true") {                   
                        clearInterval(this.intervalId);
                        this.hideWait();
                        this._router.navigate(['Signin']);

                    }
                }
            };


        }, 500);  //half seoond
    }

    showWait() : any {
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
            unit: ['', Validators.required]
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
}