import {Component, OnInit} from "@angular/core";
import {Unit} from "./shared/unit.interface";

declare var firebase: any;


@Component({
    templateUrl: "app/forsale.component.html"
})

export class ForsaleComponent implements OnInit {
    units: Array<Unit> = new Array<Unit>();
    isLoading: boolean = true;
    constructor() {
        firebase.database().ref("/UnitsForSale").once('value').then((snapshot) => {
            //todo:  Need error handling here.
            let unitsForSale: {} = snapshot.val();
            console.log("ufs: ", unitsForSale);
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
            this.isLoading = false;
        });   //snaphot units for sale
    }

    ngOnInit() {
        this.isLoading = true;





    }   //ngOnItie

}    //ForSaleComponent  
