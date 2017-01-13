import {Component, OnInit} from "@angular/core";


import {AuthService} from "./shared/auth.service";



@Component({
    templateUrl: "app/signout.component.html"  

})
export class SignoutComponent implements OnInit {
   
    


    constructor( private _authService: AuthService) {

       
    }

   

    ngOnInit(): any {

       this.logout();
     



    }

      logout() {
        console.log("nav: logout");
        this._authService.logout();
    }

    


}