import { Component, OnInit } from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from "@angular/common";
import {AuthService} from "./shared/auth.service";

declare var toastr: any;

@Component({
    templateUrl: 'app/forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

    forgotPasswordForm: ControlGroup;

    constructor(private _fb: FormBuilder, private _authService: AuthService) {

    }

    ngOnInit() {

        this.forgotPasswordForm = this._fb.group({
            email: ['', Validators.required]
        });

    }

    onForgotPassword(): any {       
        this._authService.sendResetPasswordEmail(this.forgotPasswordForm.value["email"]);


    }

}