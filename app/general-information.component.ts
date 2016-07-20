import { Component, OnInit } from '@angular/core';
import {DataService} from './shared/data.service';
import {Management} from "./shared/management.interface";


@Component({
   
    templateUrl: 'app/general-information.component.html'
})
export class GeneralInformationComponent implements OnInit {
    tennisCourtAccessCode: string;
    management: Management;

    constructor(private _dataService: DataService) {
   
        this.tennisCourtAccessCode = _dataService.generalInformation.TennisCourtAccessCode;
        this.management = _dataService.management;
     }

    ngOnInit() { }

    getTennisAccessCode() {
    

            bootbox.alert("The Access Code is: " + this.tennisCourtAccessCode);
    }
    




}