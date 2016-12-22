import { Component, OnInit } from "@angular/core";
import { Resident } from "./shared/resident.interface";
import { DataService } from "./shared/data.service";
declare var $: any;

@Component({
    templateUrl: "app/resident-search.component.html"
})

export class ResidentSearchComponent implements OnInit {

    residents: Resident;



    constructor(private _dataService: DataService) {
        this.residents = _dataService.residents;

    }

    ngOnInit() {
        var residentData = this.residents;
        $('#residentSearchTable').DataTable({
            data: residentData,
            lengthMenu: [ [10,25, 50, -1], [10, 25, 50, "All"] ],       
            columns: [
                { data: "LastName", title: "Last Name" },
                { data: "FirstName", title: "First Name" },
                { data: "Unit", title: "Unit", searchable: true },
                { data: "Street", title: "Street", searchable: false },
                { data: "Phone1", title: "Phone", searchable: false, orderable: false, className: "phone" },
                { data: "Phone2", title: "Phone 2", searchable: false, orderable: false, className: "phone" },
                { data: "Email", title: "Email" }
            ],
            drawCallback: function (settings, json) {
                $(".phone").text(function (i, text) {
                    text = text.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
                    return text;
                });
            }, 
            initComplete: function(settings, json) {
                $("input[type='search']").focus();

            }
        });



    }  //ngOnInit


}