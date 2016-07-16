import { Component, OnInit } from '@angular/core';
import {DataService} from './shared/data.service'

@Component({
   
    templateUrl: 'app/general-information.component.html'
})
export class GeneralInformationComponent implements OnInit {
    tennisCourtAccessCode: string;

    constructor(private _dataService: DataService) {
        this.tennisCourtAccessCode = _dataService.generalInformation.TennisCourtAccessCode;
     }

    ngOnInit() { }

    getTennisAccessCode() {
             
            //bootbox.alert("Testing");

            bootbox.alert("The Access Code is: " + this.tennisCourtAccessCode);
    }
    




}