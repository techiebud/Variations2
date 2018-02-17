import { Component, OnInit } from '@angular/core';

import {DataService} from './shared/data.service';
import {Management} from "./shared/management.interface";

@Component({

    templateUrl: 'app/general-information.component.html'
})
export class GeneralInformationComponent implements OnInit {
    tennisCourtAccessCode: string;
    poolAccessCode:  string;
    management: Management;

    constructor(private _dataService: DataService) {

        this.tennisCourtAccessCode = _dataService.generalInformation.TennisCourtAccessCode;
        this.management = _dataService.management;
        this.poolAccessCode = _dataService.generalInformation.PoolAccessCode;
     }

    // tslint:disable-next-line:no-empty
    ngOnInit() { }

    getTennisAccessCode() {

            bootbox.alert("The Access Code for the tennnis court is: " + this.tennisCourtAccessCode);
    }
    getPoolAccessCode() {
        bootbox.alert("The Access Code for the pool area is: " + this.poolAccessCode);
    }
}


