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
var SigninComponent = (function () {
    function SigninComponent(_fb, _authService) {
        this._fb = _fb;
        this._authService = _authService;
    }
    SigninComponent.prototype.onSignin = function () {
        this._authService.signinUser(this.signinForm.value);
    };
    SigninComponent.prototype.ngOnInit = function () {
        this.signinForm = this._fb.group({
            email: ['', common_1.Validators.required],
            password: ['', common_1.Validators.required],
        });
        debugger;
    };
    SigninComponent.prototype.onForgotPassword = function () {
        console.log(this.signinForm.value);
        if (!this.signinForm.value["email"]) {
            toastr.error("Please specify your email address.");
            return;
        }
        this._authService.sendResetPasswordEmail(this.signinForm.value["email"]);
    };
    SigninComponent = __decorate([
        core_1.Component({
            templateUrl: "app/signin.component.html",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, auth_service_1.AuthService])
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
//# sourceMappingURL=signin.component.js.map