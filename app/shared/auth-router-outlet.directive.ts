import {RouterOutlet,  Router, ComponentInstruction} from "@angular/router-deprecated";
import {Directive, ViewContainerRef, ElementRef, DynamicComponentLoader, Attribute} from "@angular/core";
import {AuthService} from "./auth.service";

@Directive({
    selector: 'auth-router-outlet'
})
export class AuthRouterOutlet extends RouterOutlet {
    private _protectedRoutes = {    
        'board': true,
        'announcements': true,
        'accountProfile': true, 
        'pictures': true,
        "changePassword": true,
        "changeEmail": true
    };

    constructor(_viewContainerRef:ViewContainerRef, _loader:DynamicComponentLoader, private _router:Router, @Attribute('name') _nameAttr:string,
                private _authService: AuthService) {
        super(_viewContainerRef, _loader, _router, _nameAttr);
    }

    activate(nextInstruction: ComponentInstruction): Promise<any> {
        const url = nextInstruction.urlPath;
        if (this._protectedRoutes[url] && !this._authService.isAuthenticated()) {           
            this._router.navigate(['Signin']);
        }       
        return super.activate(nextInstruction);
    }

 }