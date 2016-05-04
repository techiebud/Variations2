import {Component, OnInit} from "angular2/core";
import {FormBuilder, ControlGroup, Validators} from "angular2/common";
import {AuthService} from "../shared/auth.service";
import {Router} from "angular2/router";
declare var toastr: any;

@Component({
    templateUrl: "app/unprotected/signin.component.html"
})
export class SigninComponent implements OnInit {
    myForm: ControlGroup;
    error = false;
    errorMessage = '';
    intervalId = 0;

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) { }

    onSignin() {
        if (this.intervalId > 0) {
            clearInterval(this.intervalId);
            this.intervalId = 0;
        }
        localStorage.removeItem("token");
        this._authService.signinUser(this.myForm.value);
        this.intervalId = setInterval(() => {
            if (this._authService.isAuthenticated) {                
                toastr.success("Congratulations!   You have succesfully signed in.");
                clearInterval(this.intervalId);
                this.intervalId = 0;
                this._router.navigate(['Home']);
            }
        }, 500);  //half seoond

    }

    ngOnInit(): any {
        this.myForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
}