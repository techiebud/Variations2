import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,    
    Validators,
    FormBuilder
} from "@angular/forms";
import {AuthService} from "./shared/auth.service";



@Component({
    templateUrl: 'app/forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

    forgotPasswordForm: FormGroup;

    constructor(private _formBuiilder: FormBuilder, private _authService: AuthService) {

    }

    ngOnInit() {

        this.forgotPasswordForm = this._formBuiilder.group({
            email: ['', Validators.required]
        });

    }

    onForgotPassword(): any {
        this._authService.sendResetPasswordEmail(this.forgotPasswordForm.value["email"]);


    }

}