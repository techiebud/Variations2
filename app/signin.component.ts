import {Component, OnInit} from "@angular/core";
import {FormBuilder, ControlGroup, Validators} from "@angular/common";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';


import {AuthService} from "./shared/auth.service";
declare var toastr: any;
declare var firebase: any;

@Component({
    templateUrl: "app/signin.component.html",
    directives: [ROUTER_DIRECTIVES]

})
export class SigninComponent implements OnInit {
    signinForm: ControlGroup;


    constructor(private _fb: FormBuilder, private _authService: AuthService) { }

    onSignin(): any {

        this._authService.signinUser(this.signinForm.value);

    }

    ngOnInit(): any {
        this.signinForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
      
    }
    
    onForgotPassword(): any {
        console.log(this.signinForm.value);
        if (!this.signinForm.value["email"])
        {
            toastr.error("Please specify your email address.");
            return;
        }
        
       this._authService.sendResetPasswordEmail(this.signinForm.value["email"]);
       return false;
        
        
    }
}