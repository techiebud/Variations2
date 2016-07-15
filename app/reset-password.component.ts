import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from  "@angular/router";
import {
  FormGroup,
  FormControl,
  REACTIVE_FORM_DIRECTIVES,
  Validators,
  FormBuilder
} from "@angular/forms";
import {AuthService} from "./shared/auth.service";

@Component({
    templateUrl: 'app/reset-password.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class ResetPasswordComponent implements OnInit {

    resetPasswordForm: FormGroup;
    constructor(private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute, private _authService: AuthService) {
      
    }

    ngOnInit() {
        this.resetPasswordForm = this._formBuilder.group({        
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])]
        });
    }

    onResetPassword() {        
       var resetCode: string = this._activatedRoute.snapshot.params["oobCode"];
       var newPassword: string = this.resetPasswordForm.value.password;
       console.debug("resetCode", resetCode);
       console.debug("newPassword", newPassword)
       this._authService.resetPassword(resetCode, newPassword);     
    }    
    
     isEqualPassword(control: FormControl): { [s: string]: boolean } {
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