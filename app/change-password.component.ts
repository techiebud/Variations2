import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  REACTIVE_FORM_DIRECTIVES,
  Validators,
  FormBuilder
} from "@angular/forms";
import {AuthService} from "./shared/auth.service";

@Component({
    templateUrl: 'app/change-password.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class ChangePasswordComponent implements OnInit {
    changePasswordForm: FormGroup;
    constructor(private _formBuilder: FormBuilder, private _authService: AuthService) {

         this.changePasswordForm = _formBuilder.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])],
        });
     }

    ngOnInit() {
       
    }

    isEqualPassword(control: FormControl): { [s: string]: boolean } {
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