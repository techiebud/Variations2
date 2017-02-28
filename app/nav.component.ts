import {AfterViewInit, Component, ElementRef, OnInit, Renderer, ViewChild} from "@angular/core";

import {AppHelpers} from "./shared/app.common";
import {AuthService} from "./shared/auth.service";

declare var MobileDetect: any;
@Component({
    selector: "var-nav",
    templateUrl: "app/nav.component.html"  
})

export class NavComponent implements OnInit, AfterViewInit {
    @ViewChild("discussionBoard") discussionBoard: ElementRef;
    isMobile: boolean = false;

    constructor(private _authService: AuthService, private _renderer: Renderer) {

        const md = new MobileDetect(window.navigator.userAgent);
        this.isMobile = md.mobile();

    }

    showDiscussionBoard() : boolean {
        let event = new MouseEvent("click", {bubbles: false});
        this._renderer.invokeElementMethod(
        this.discussionBoard.nativeElement, "dispatchEvent", [event]);
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

    // tslint:disable-next-line:no-empty
    ngOnInit() {


    }

    ngAfterViewInit() {


            AppHelpers.prepMenuElements();

            $(window).resize(() => {
                AppHelpers.prepMenuElements();
            });



    }
}