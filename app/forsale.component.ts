import {Component, OnInit} from "@angular/core";
import {Unit} from "./shared/unit.interface";
import {AppHelpers} from "./app.component";
import {AuthService} from "./shared/auth.service";

declare var firebase: any;
declare var toastr: any;


@Component({
    templateUrl: "app/forsale.component.html"
})

export class ForsaleComponent implements OnInit {
    unitsForSale: Array<Unit> = new Array<Unit>();
    unitsSold: Array<Unit> = new Array<Unit>();
    unitsPending: Array<Unit> = new Array<Unit>();
    isLoading: boolean = true;

    constructor(private _authService: AuthService) { }

    isAuth() {
        return this._authService.isAuthenticated();
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
            let saleDate = AppHelpers.parseDate(unitsForSale[unitNumber].SaleDate);
            var listUnit: Unit = {
                UnitNumber: unitNumber,
                URL: unitsForSale[unitNumber].URL,
                Owner: "",
                Street: unitsForSale[unitNumber].Street,
                ImageURL: unitsForSale[unitNumber].imageURL,
                Status: unitsForSale[unitNumber].Status,
                SaleDate: saleDate,
                SalePrice: +(unitsForSale[unitNumber].SalePrice)

            }

            switch (listUnit.Status) {
                case "For Sale":
                    this.unitsForSale.push(listUnit);
                    break;
                case "Sold":
                    this.unitsSold.push(listUnit);
                    break;
                case "Pending":
                    this.unitsPending.push(listUnit);
                    break;
                default:
                    this.unitsForSale.push(listUnit);
                    break;
            }




        }

    }

}    //ForSaleComponent  
