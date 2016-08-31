import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from "@angular/forms";
import {AuthService} from "./shared/auth.service";

@Component({
    templateUrl: "app/change-email.component.html",
})
export class ChangeEmailComponent implements OnInit {
    changeEmailForm: FormGroup;
    constructor(private _formBuilder: FormBuilder, private _authService: AuthService) {
        this.changeEmailForm = _formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])]
        });
    }

    ngOnInit() {

    }
    onSubmit(email: string) {
        var email: string = this.changeEmailForm.value["email"];
        this._authService.updateEmail(email);
    }
    isEmail(control: FormControl): { [s: string]: boolean } {

        if (!control.value.match(/^[a-z0-9_\+-]+(\.[a-z0-9_\+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,4})$/)) {
            return { noEmail: true };
        }
    }

}