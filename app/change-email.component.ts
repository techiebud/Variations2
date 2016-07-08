import { Component, OnInit } from '@angular/core';
import {FormBuilder, ControlGroup, Validators, Control} from "@angular/common";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {AuthService} from "./shared/auth.service";

@Component({
    templateUrl: "app/change-email.component.html",
    directives: [ROUTER_DIRECTIVES],

})
export class ChangeEmailComponent implements OnInit {
    changeEmailForm: ControlGroup;
    constructor(private _fb: FormBuilder, private _authService: AuthService) {

    }

    ngOnInit() {
        this.changeEmailForm = this._fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])]         
        });
    }
    onSubmit(email: string) {      
        var email: string = this.changeEmailForm.value["email"];
        this._authService.updateEmail(email);
    }
      isEmail(control: Control): { [s: string]: boolean } {

        if (!control.value.match(/^[a-z0-9_\+-]+(\.[a-z0-9_\+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,4})$/)) {
            return { noEmail: true };
        }
    }

}