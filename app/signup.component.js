"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_deprecated_1 = require('@angular/router-deprecated');
var auth_service_1 = require("./shared/auth.service");
var SignupComponent = (function () {
    function SignupComponent(_fb, _authService) {
        this._fb = _fb;
        this._authService = _authService;
    }
    SignupComponent.prototype.onSignup = function () {
        console.debug("onSignup");
        var user = this.signUpForm.value;
        var allUnits = JSON.parse(localStorage.getItem("allUnits"));
        if (allUnits[user.unit].RegisteredUsers >= 2) {
            toastr.error("Maximum number of users have already signed up for this Unit #");
            return;
        }
        this._authService.signupUser(this.signUpForm.value);
    };
    SignupComponent.prototype.ngOnInit = function () {
        console.debug("onInit");
        localStorage.setItem("allUnits", "{}");
        firebase.database().ref('/Units').once('value').then(function (snapshot) {
            console.debug("snapshot");
            localStorage.setItem('allUnits', JSON.stringify(snapshot.val()));
        });
        console.debug("here");
        this.signUpForm = this._fb.group({
            email: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    this.isEmail
                ])],
            password: ['', common_1.Validators.required],
            confirmPassword: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    this.isEqualPassword.bind(this)
                ])],
            firstName: ['', common_1.Validators.required],
            lastName: ['', common_1.Validators.required],
            unit: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    this.isValidUnit
                ])]
        });
    };
    SignupComponent.prototype.isEmail = function (control) {
        if (!control.value.match(/^[a-z0-9_\+-]+(\.[a-z0-9_\+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,4})$/)) {
            return { noEmail: true };
        }
    };
    SignupComponent.prototype.isEqualPassword = function (control) {
        if (!this.signUpForm) {
            return { passwordsNotMatch: true };
        }
        if (control.value !== this.signUpForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
    };
    SignupComponent.prototype.isValidUnit = function (control) {
        var allUnits = JSON.parse(localStorage.getItem("allUnits"));
        var unit = parseInt(control.value);
        var min_unit = 1901;
        var max_unit = 2112;
        var validUnit = (!isNaN(unit)) && (unit >= min_unit && unit <= max_unit);
        if (validUnit) {
            validUnit = allUnits[unit.toString()];
        }
        if (!validUnit) {
            return { unitIsInvalid: true };
        }
    };
    SignupComponent = __decorate([
        core_1.Component({
            templateUrl: "app/signup.component.html",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, auth_service_1.AuthService])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map