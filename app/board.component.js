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
var BoardComponent = (function () {
    function BoardComponent() {
        var _this = this;
        this.boardMembers = new Array();
        this.isLoading = true;
        firebase.database().ref("/BoardMembers").once('value').then(function (snapshot) {
            //todo:  Need error handling here.
            var members = snapshot.val();
            console.log("members: ", members);
            var titles = Object.keys(members);
            console.log("titles", titles);
            for (var i = 0; i < titles.length; i++) {
                var title = titles[i];
                var boardMember = {
                    Title: title,
                    Name: members[title].Name,
                    Email: members[title].Email,
                    Address: members[title].Address,
                    Phone: members[title].Phone,
                    URL: members[title].URL,
                    URLCaption: members[title].URLCaption
                };
                _this.boardMembers.push(boardMember);
            } //for loop
            _this.isLoading = false;
        }); //snaphot units for sale 
    }
    BoardComponent.prototype.ngOnInit = function () {
    };
    BoardComponent = __decorate([
        core_1.Component({
            templateUrl: "app/board.component.html"
        }), 
        __metadata('design:paramtypes', [])
    ], BoardComponent);
    return BoardComponent;
}());
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board.component.js.map