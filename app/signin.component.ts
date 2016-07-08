import {Component, OnInit} from "@angular/core";
import {FormBuilder, ControlGroup, Validators} from "@angular/common";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {AuthService} from "./shared/auth.service";
import {CookieService} from 'angular2-cookie/core';
import {DataService}   from './shared/data.service';


@Component({
    templateUrl: "app/signin.component.html",
    directives: [ROUTER_DIRECTIVES],

})
export class SigninComponent implements OnInit {
    signinForm: ControlGroup;
    rememberMeInfoTitle: string;
    rememberMe: boolean = false;


    constructor(private _fb: FormBuilder, private _authService: AuthService, private _cookieService: CookieService, private _dataService: DataService) {

        this.rememberMeInfoTitle = 'If you check the "Remember me" box, you will be automatically signed in to variationscondos.com when you visit in the future.   Do not check this box if you area on a public computer.';
       
    }

    onSignin(): any {
        this._authService.signinUser(this.signinForm.value, this.rememberMe);
    }

    ngOnInit(): any {

   
        this.signinForm = this._fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
        });
     



    }

    onInfoClicked(): void {

        bootbox.alert("If checked, a persistent cookie will be saved to your computer/device to remember your login information and automatically sign you in on future visits.<br /><br ><em>Do not choose this option if you are on a public computer.</em>");

    }


}