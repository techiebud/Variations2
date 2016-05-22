import {Component, OnInit} from "angular2/core";
import {FormBuilder, ControlGroup, Validators} from "angular2/common";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from "angular2/router";

import {AuthService} from "./shared/auth.service";
declare var toastr: any;

@Component({
    templateUrl: "app/signin.component.html",
    directives: [ROUTER_DIRECTIVES]

})
export class SigninComponent implements OnInit {
    signinForm: ControlGroup;


    constructor(private _fb: FormBuilder, private _authService: AuthService) { }

    onSignin() {

        this._authService.signinUser(this.signinForm.value);

    }

    ngOnInit(): any {
        this.signinForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
}