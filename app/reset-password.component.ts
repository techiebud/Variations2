import { Component, OnInit } from '@angular/core';
import {RouteParams} from  "@angular/router-deprecated";
import {FormBuilder, ControlGroup, Validators, Control} from "@angular/common";
import {AuthService} from "./shared/auth.service";

declare var toastr: any;

@Component({
    templateUrl: 'app/reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

    resetPasswordForm: ControlGroup;
    constructor(private _fb: FormBuilder, private _params: RouteParams, private _authService: AuthService) {
      
    }

    ngOnInit() {
        this.resetPasswordForm = this._fb.group({        
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])]
        });
    }

    onResetPassword() {        
       var resetCode: string = this._params.get("oobCode");
       var newPassword: string = this.resetPasswordForm.value.password;
       console.debug("resetCode", resetCode);
       console.debug("newPassword", newPassword)
       this._authService.resetPassword(resetCode, newPassword);     
    }    
    
     isEqualPassword(control: Control): { [s: string]: boolean } {
        if (!this.resetPasswordForm) {
            return { passwordsNotMatch: true };

        }
        if (control.value !== this.resetPasswordForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
    }


}

// testing:

// resetPassword?mode=resetPassword&oobCode=Iv7BoxifagwBXbsrcWmBSd2rqk8&apiKey=AIzaSyBzLfPOqnW2ccBGIwprbfAQtat4aWiFakM