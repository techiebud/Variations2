import {Component, OnInit} from "@angular/core";
import {Unit} from "./shared/unit.interface";

declare var firebase: any;
declare var toastr: any;


@Component({
    templateUrl: "app/forsale.component.html"
})

export class ForsaleComponent implements OnInit {
    units: Array<Unit> = new Array<Unit>();
    isLoading: boolean = true;
    constructor() {

    }

    ngOnInit() {

        let cachedData: any = localStorage.getItem("unitsForSale");
        if (cachedData) {
            this.parseData(JSON.parse(cachedData));
            this.isLoading = false;

        }
        else {
            firebase.database().ref("/UnitsForSale").once('value').then((snapshot) => {
                //todo:  Need error handling here.

                let returnedData = snapshot.val();
                localStorage.setItem("unitsForSale", JSON.stringify(returnedData));
                this.parseData(returnedData);

                this.isLoading = false;

            });   //snaphot units for sale
        }

    }   //ngOnInit

    parseData(data: any): void {

        let unitsForSale: {} = data;
        let unitNumbers = Object.keys(unitsForSale);
        for (let i: number = 0; i < unitNumbers.length; i++) {

            let unitNumber: number = +(unitNumbers[i]);
            var listUnit: Unit = {
                UnitNumber: unitNumber,
                URL: unitsForSale[unitNumber].URL,
                Owner: "",
                Street: unitsForSale[unitNumber].Street,
                ImageURL: unitsForSale[unitNumber].imageURL
            }

            this.units.push(listUnit);

        }  //for loop


    }

}    //ForSaleComponent  
