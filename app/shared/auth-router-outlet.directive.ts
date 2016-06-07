// import {RouterOutlet,  Router, ComponentInstruction} from "@angular/router-deprecated";
// import {Directive, ViewContainerRef, ElementRef, DynamicComponentLoader, Attribute} from "@angular/core";
// import {AuthService} from "./auth.service";

// @Directive({
//     selector: 'auth-router-outlet'
// })
// export class AuthRouterOutlet extends RouterOutlet {
//     private _protectedRoutes = {
//         'protected': true,
//     };

//     constructor(_elementRef:ViewContainerRef, _loader:DynamicComponentLoader, private _parentRouter2:Router, @Attribute('name') _nameAttr:string,
//                 private _authService: AuthService) {
//         super(_elementRef, _loader, _parentRouter2, _nameAttr);
//     }

//     activate(nextInstruction: ComponentInstruction): Promise<any> {
//         const url = nextInstruction.urlPath;
//         if (this._protectedRoutes[url] && !this._authService.isAuthenticated()) {
//             this._parentRouter2.navigate(['Signin']);
//         }
//         return super.activate(nextInstruction);
//     }

// // }