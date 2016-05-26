"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ForsaleComponent = (function () {
    function ForsaleComponent() {
        this.units = new Array();
    }
    ForsaleComponent.prototype.ngOnInit = function () {
        var _this = this;
        firebase.database().ref("/UnitsForSale").once('value').then(function (snapshot) {
            var unitsForSale = snapshot.val();
            console.log("ufs: ", unitsForSale);
            var unitNumbers = Object.keys(unitsForSale);
            for (var i = 0; i < unitNumbers.length; i++) {
                var unitNumber = +(unitNumbers[i]);
                var listUnit = {
                    UnitNumber: unitNumber,
                    URL: unitsForSale[unitNumber].URL,
                    Owner: "",
                    Street: unitsForSale[unitNumber].Street
                };
                _this.units.push(listUnit);
            } //for loop
            // console.log("units: ", this.units);
        }); //snaphot units for sale
    }; //ngOnItie
    ForsaleComponent = __decorate([
        core_1.Component({
            templateUrl: "app/forsale.component.html"
        }), 
        __metadata('design:paramtypes', [])
    ], ForsaleComponent);
    return ForsaleComponent;
}());
exports.ForsaleComponent = ForsaleComponent; //ForSaleComponent  
//# sourceMappingURL=forsale.component.js.map