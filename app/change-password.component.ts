import { Component, OnInit } from '@angular/core';
import {FormBuilder, ControlGroup, Validators, Control} from "@angular/common";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {AuthService} from "./shared/auth.service";

@Component({
    templateUrl: 'app/change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
    changePasswordForm: ControlGroup;
    constructor(private _fb: FormBuilder, private _authService: AuthService) { }

    ngOnInit() {
        this.changePasswordForm = this._fb.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])],
        });
    }

    isEqualPassword(control: Control): { [s: string]: boolean } {
        if (!this.changePasswordForm) {
            return { passwordsNotMatch: true };
        }
        if (control.value !== this.changePasswordForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
    }

    onSubmit() {  
        var newPassword: string = this.changePasswordForm.value["password"];
        this._authService.changePassword(newPassword);
    }

}