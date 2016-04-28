import {Component, OnInit} from "angular2/core";
import {FormBuilder, ControlGroup, Validators} from "angular2/common";
import {AuthService} from "../shared/auth.service";

@Component({
       templateUrl: "app/unprotected/signin.component.html"
})
export class SigninComponent implements OnInit {
    myForm: ControlGroup;
    error = false;
    errorMessage = '';

    constructor(private _fb: FormBuilder, private _authService: AuthService) {}

    onSignin() {
        this._authService.signinUser(this.myForm.value);
    }

    ngOnInit():any {
        this.myForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
}