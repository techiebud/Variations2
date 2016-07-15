import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {
  FormGroup,
  FormControl,
  REACTIVE_FORM_DIRECTIVES,
  Validators,
  FormBuilder
} from "@angular/forms";


import {AuthService} from "./shared/auth.service";
import {CookieService} from 'angular2-cookie/core';
import {DataService}   from './shared/data.service';


@Component({
    templateUrl: "app/signin.component.html",
    directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]

})
export class SigninComponent implements OnInit {
    signinForm: FormGroup;
    rememberMeInfoTitle: string;
    rememberMe: boolean = false;


    constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _cookieService: CookieService, private _dataService: DataService) {

        this.rememberMeInfoTitle = 'If you check the "Remember me" box, you will be automatically signed in to variationscondos.com when you visit in the future.   Do not check this box if you area on a public computer.';
       
        this.signinForm = _formBuilder.group({
          'userSigninInfo':  _formBuilder.group({
            'email': ["", Validators.required],
            'password': ["", Validators.required]
          }),
          "rememberMe": [false]
         
        });
    }

    onSignin(): any { 
        this._authService.signinUser(this.signinForm.value.userSigninInfo, this.signinForm.value.rememberMe);
    }

    ngOnInit(): any {

   
     



    }

    onInfoClicked(): void {

        bootbox.alert("If checked, a persistent cookie will be saved to your computer/device to remember your login information and automatically sign you in on future visits.<br /><br ><em>Do not choose this option if you are on a public computer.</em>");

    }


}