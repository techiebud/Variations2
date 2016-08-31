import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from  "@angular/router";
import {
  FormGroup,
  FormControl, 
  Validators,
  FormBuilder
} from "@angular/forms";
import {AuthService} from "./shared/auth.service";

@Component({
    templateUrl: 'app/reset-password.component.html',
  
})
export class ResetPasswordComponent implements OnInit {

    resetPasswordForm: FormGroup;
    resetCode: string;
    constructor(private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute, private _router: Router, private _authService: AuthService) {
        
    }

    ngOnInit() {
        this.resetPasswordForm = this._formBuilder.group({        
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])]
        });
      this._router.routerState.queryParams.subscribe(data =>  this.resetCode = data['oobCode']);
     
    }

    onResetPassword() {       
       var newPassword: string = this.resetPasswordForm.value.password;           
       this._authService.resetPassword(this.resetCode, newPassword);     
    }    
    
     isEqualPassword(control: FormControl): { [s: string]: boolean } {
     /*    if (this.resetPasswordForm.controls['password'].pristine)     
         {
             return;
         } */
       
         if (!this.resetPasswordForm) {
            return { passwordsNotMatch: false };
        }
        if (control.value !== this.resetPasswordForm.controls['password'].value && this.resetPasswordForm.controls['password'] .value != "") {
            return { passwordsNotMatch: true };
        }
    }


}

// testing:

// resetPassword?mode=resetPassword&oobCode=Iv7BoxifagwBXbsrcWmBSd2rqk8&apiKey=AIzaSyBzLfPOqnW2ccBGIwprbfAQtat4aWiFakM