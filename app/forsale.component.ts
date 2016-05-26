import {Component, OnInit} from "@angular/core";
import {Unit} from "./shared/unit.interface";

declare var firebase: any;

@Component({
    templateUrl: "app/forsale.component.html"
})

export class ForsaleComponent implements OnInit {
    units: Array<Unit> = new Array<Unit>();
    constructor() { }

    ngOnInit() {

        firebase.database().ref("/UnitsForSale").once('value').then((snapshot) => {
            let unitsForSale: {} = snapshot.val();
            console.log("ufs: ", unitsForSale);
            let unitNumbers = Object.keys(unitsForSale);
            for (let i: number = 0; i < unitNumbers.length; i++) {

                let unitNumber: number = +(unitNumbers[i]);
                var listUnit: Unit = {
                    UnitNumber: unitNumber,
                    URL: unitsForSale[unitNumber].URL,
                    Owner: "",
                    Street: unitsForSale[unitNumber].Street
                }

                this.units.push(listUnit);





            }  //for loop
            // console.log("units: ", this.units);
        });   //snaphot units for sale



    }   //ngOnItie

}    //ForSaleComponent  
