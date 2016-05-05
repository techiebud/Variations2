import {Component, OnInit} from "angular2/core";
import {FormBuilder, ControlGroup, Validators} from "angular2/common";
import {AuthService} from "../shared/auth.service";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from "angular2/router";
declare var toastr: any;

@Component({
    templateUrl: "app/unprotected/signin.component.html",
     directives: [ROUTER_DIRECTIVES]
})
export class SigninComponent implements OnInit {
    signinForm: ControlGroup;
    error = false;
    errorMessage = '';
    intervalId = 0;

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) { }

    onSignin() {
        if (this.intervalId > 0) {
            clearInterval(this.intervalId);
            this.intervalId = 0;
        }
   
        this._authService.signinUser(this.signinForm.value;
        this.intervalId = setInterval(() => {        
            if (this._authService.isAuthenticated()) {               
             
                toastr.success("Congratulations!   You have successfully signed in.");
                clearInterval(this.intervalId);
                this.intervalId = 0;
                this._router.navigate(['Home']);
            }
        }, 500);  //half seoond

    }

    ngOnInit(): any {
        this.signinForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
}