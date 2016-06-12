import {Component, OnInit} from "@angular/core";
import {Unit} from "./shared/unit.interface";
import {AppHelpers} from "./app.component";
import {DataService} from "./shared/data.service";


const DATA_TABLE: string = "UnitsForSale";


@Component({
    templateUrl: "app/forsale.component.html"
})

export class ForsaleComponent implements OnInit {
    unitsForSale: Array<Unit> = new Array<Unit>();
    unitsSold: Array<Unit> = new Array<Unit>();
    unitsPending: Array<Unit> = new Array<Unit>();
    isLoading: boolean = true;
    isError: boolean = false;

    constructor(private _dataService: DataService) { }

    ngOnInit() {
        if (!this.isDataReady()) {
            this._dataService.getUnitsForSale();
            //now watch the last firebase call to get when the data is ready.
            var refreshId = setInterval(() => {
                if (this.isDataReady() || this.isError) {
                    clearInterval(refreshId);
                    this.isLoading = false;
                }
            }, 500);  //check for data every 1/2 second
        }
        else {
            this.isLoading = false;
        }
    }  //ngOnInit


    isDataReady(): boolean {
        let cachedData: any = localStorage.getItem(DATA_TABLE);
        if (cachedData) {
            if (cachedData === "error") {
                this.isError = true;
                return;
            }
            this.prepData(JSON.parse(cachedData));
            return true;
        }
        return false;
    }  //isDataReady


    prepData(data: any): void {


        this.unitsForSale = [];
        this.unitsPending = [];
        this.unitsSold = [];
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
        }  //for loop
        if (this.unitsSold.length > 1) {
            this.unitsSold.sort((a: Unit, b: Unit): number => {
                return (a.SaleDate > b.SaleDate ? 0 : 1);

            })
        }

    }  //parseData

}    //ForSaleComponent  
