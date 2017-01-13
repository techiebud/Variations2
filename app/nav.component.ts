import {Component, OnInit, AfterViewInit, Renderer, ViewChild, ElementRef} from "@angular/core";

import {AuthService} from "./shared/auth.service";
import {AppHelpers} from "./shared/app.common";

@Component({
    selector: "var-nav",
    templateUrl: "app/nav.component.html"  
})

export class NavComponent implements OnInit, AfterViewInit {
    @ViewChild('discussionBoard') discussionBoard:ElementRef;

    constructor(private _authService: AuthService, private _renderer: Renderer) {


    }

    showDiscussionBoard() : boolean {
        toastr.info("showDiscussiongBoard");
         let event = new MouseEvent('click', {bubbles: false});
        this._renderer.invokeElementMethod(
        this.discussionBoard.nativeElement, 'dispatchEvent', [event]);
        return false;

    }

    isAuth() {
        return this._authService.isAuthenticated();
    }

    logout() {
        console.log("nav: logout");
        this._authService.logout();
    }

    userGravatarURL(): string {
        // return "n/a";
        return this._authService.getUserGravatarURL();  
    }


    userForumToken() : string {
        return this._authService.getUserForumToken();
    
    }

    ngOnInit() {
             

    }

    ngAfterViewInit() {
       

            AppHelpers.prepMenuElements();

            $(window).resize(() => {               
                AppHelpers.prepMenuElements();
            });
            
     

    }
}