import {Component, OnInit} from "@angular/core";



declare var $: any;


@Component({
    selector: "var-home",
    templateUrl: "app/home.component.html"
})

export class HomeComponent implements OnInit {

    constructor() {

        //below is a code hack to fix the carousel not starting
        //automtacially when this page loads.  I found if you wait a second and a half
        //it will work fine.
        setTimeout(function () {
            $('.carousel').carousel({
                interval: 4000  //4 seconds.
            });      //start the caraousel
        }, 1500); //  1.5 second delay

    }

 

    ngOnInit() { }
}