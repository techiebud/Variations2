import {Component, OnInit} from "angular2/core";
import {FormBuilder, ControlGroup, Validators, Control} from "angular2/common";
import {Router} from "angular2/router";
import {AuthService} from "../shared/auth.service";
declare var toastr: any;


@Component({
    templateUrl: "app/unprotected/signup.component.html"
})
export class SignupComponent implements OnInit {
    myForm:ControlGroup;
    error = false;
    errorMessage = '';
    intervalId = 0;

    constructor(private _fb:FormBuilder, private _authService: AuthService, private _router: Router) {
    }

    onSignup() {
        toastr.info("onSignUp");
        localStorage.removeItem("signedUp");
        if (this.intervalId > 0 )
        {
            clearInterval(this.intervalId);
        }
     
        this._authService.signupUser(this.myForm.value);
        
        this.intervalId = setInterval(() => {
            toastr.warning("signing up");
            console.log("signing up");
            if (localStorage.getItem("signedUp") != null) 
             {             
               if (localStorage.getItem("signedUp") == "true")
               {
                     toastr.warning("navigating to home...");
                     clearInterval(this.intervalId);
                     this._router.navigate(['Signin']);
                     
               }  
             };
            
          
        }, 500);  //half seoond
    }

    ngOnInit():any {
        this.myForm = this._fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])],
        });
    }

    isEmail(control:Control):{[s: string]: boolean} {
        if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            return {noEmail: true};
        }
    }

    isEqualPassword(control:Control):{[s: string]: boolean} {
        if (!this.myForm) {
            return {passwordsNotMatch: true};

        }
        if (control.value !== this.myForm.controls['password'].value) {
            return {passwordsNotMatch: true};
        }
    }
}